import { useEffect, useRef, useState } from 'react';
import ChainDate, { TimePeriod } from './chain-date';
import { dotwSearchPaths } from './enums';
import { SearchDirection } from './types';
import { convertToStringArray, getDaysOfTheWeek, getDisplayMonth, getDisplayYear, getNewDisplayTimePeriods, getUniqueId, isDateValid, } from './util';
const now = new ChainDate();
export const useDatepicker = ({ blockedDates = [], focusOnInit = false, onClose, labels, locale = 'en-US', maxDate, minDate, mode = 'single', onChange, selectDates, weekStart = 0, }) => {
    const [calendar, setCalendar] = useState([[]]);
    const [calendarFocused, setCalendarFocused] = useState(false);
    const [controlsFocused, setControlsFocused] = useState(false);
    const [datepickerFocused, setDatepickerFocused] = useState(false);
    const [hoveredDate, setHoveredDate] = useState('');
    const internalLabels = useRef({
        closeButton: 'close',
        dateSelected: 'date selected',
        disabled: 'disabled',
        nextMonth: 'next month',
        nextYear: 'next year',
        previousMonth: 'previous month',
        previousYear: 'previous year',
        today: 'today',
        ...labels,
    });
    // internalRef holds the data while we build up all information to render the calendar at once to minimize renders and assign focus properly
    const internalRef = useRef({
        blockedDatesMap: {},
        calendarDisplayMonth: now,
        calendarMonthEndDate: now.clone().endOfMonth().format(),
        calendarMonthStartDate: now.clone().startOfMonth().format(),
        dateClicked: '',
        displayDaysOfTheWeek: getDaysOfTheWeek(locale, weekStart),
        focusedDate: '',
        id: '',
        isInitialRender: true,
        lastActiveElement: document.activeElement,
        lastFocusedDate: '',
        locale,
        newSelectedDate: '',
        newRemovedDate: '',
        newTimePeriod: '',
        now,
        oneYearAfterMinDate: '',
        oneYearAfterStartOfMonth: '',
        oneYearBeforeEndOfMonth: '',
        oneYearBeforeMaxDate: '',
        selectDates: [],
        selectedDates: [],
        selectedDatesMap: {},
        today: new ChainDate().format(),
        weekStart,
    });
    if (!internalRef.current.id) {
        // if getUniqueId() is in the useRef assignment the function is executed with each render
        // despite the actual value in the ref remaining constant
        internalRef.current.id = getUniqueId();
    }
    // internalState is what gets written right before the data is flushed out for the render of the calendar
    const [internalState, setInternalState] = useState({
        displayMonth: getDisplayMonth(now, locale),
        displayYear: getDisplayYear(now),
        selectedDates: [''],
    });
    const setOneYearBeforeStartOfMonth = () => {
        internalRef.current.oneYearBeforeEndOfMonth = new ChainDate(internalRef.current.calendarMonthEndDate)
            .add(-1, TimePeriod.Year)
            .format();
    };
    const setOneYearAfterCalendarEndOfMonth = () => {
        internalRef.current.oneYearAfterStartOfMonth = new ChainDate(internalRef.current.calendarMonthStartDate)
            .add(1, TimePeriod.Year)
            .format();
    };
    const updateInternalState = () => {
        let { blockedDatesMap, calendarDisplayMonth, calendarMonthEndDate, calendarMonthStartDate, dateClicked, displayDaysOfTheWeek, focusedDate, isInitialRender, lastFocusedDate, newSelectedDate, newRemovedDate, newTimePeriod, selectedDates, selectedDatesMap, today, } = internalRef.current;
        let callOnChange = false;
        let isDateSelectionCriteriaSatisfied = false;
        let newDates = [];
        let datesToAdd = [...(newSelectedDate && [newSelectedDate]), ...selectedDates];
        let resetDisplayMonth = false;
        let validateAllDates = false;
        if (`${selectDates}` !== `${internalRef.current.selectDates}`) {
            if (selectDates?.length) {
                resetDisplayMonth = true;
                validateAllDates = true;
                datesToAdd = convertToStringArray(selectDates);
            }
            else {
                datesToAdd = [];
            }
        }
        if (locale !== internalRef.current.locale || weekStart !== internalRef.current.weekStart) {
            displayDaysOfTheWeek = getDaysOfTheWeek(locale, weekStart);
        }
        blockedDatesMap = {};
        if (blockedDates) {
            convertToStringArray(blockedDates).forEach((blockedDate) => {
                blockedDatesMap[blockedDate] = null;
            });
        }
        if (blockedDates || minDate || maxDate || newRemovedDate || validateAllDates) {
            datesToAdd = datesToAdd.filter((date) => {
                if (!isDateValid(date)) {
                    return false;
                }
                if (minDate && date < minDate) {
                    return false;
                }
                if (maxDate && date > maxDate) {
                    return false;
                }
                if (date === newRemovedDate) {
                    return false;
                }
                return !(date in blockedDatesMap);
            });
        }
        switch (mode) {
            case 'single':
                if (datesToAdd.length > 1) {
                    datesToAdd.length = 1;
                }
                if (datesToAdd.length === 1) {
                    newDates = [datesToAdd[0]];
                    isDateSelectionCriteriaSatisfied = true;
                }
                break;
            case 'range':
                // if 3+ are in datesToAdd it means the original range of 2 is being deleted in favor of a new range
                if (datesToAdd.length > 2 && newSelectedDate) {
                    datesToAdd = [newSelectedDate];
                }
                newDates = [...datesToAdd];
                if (newDates.length >= 2) {
                    newDates.length = 2;
                    isDateSelectionCriteriaSatisfied = true;
                }
                break;
            case 'multiple':
                newDates.push(...datesToAdd);
                break;
            default:
                if (typeof mode === 'number') {
                    // add to array up to numeric limit
                    newDates.push(...datesToAdd);
                    if (newDates.length >= mode) {
                        newDates.length = mode;
                        isDateSelectionCriteriaSatisfied = true;
                    }
                }
        }
        selectedDatesMap = {};
        if (newDates) {
            newDates.forEach((newDate) => {
                selectedDatesMap[newDate] = null;
            });
        }
        if ((isInitialRender && newDates.length) || resetDisplayMonth || newTimePeriod) {
            ({ calendarDisplayMonth, calendarMonthEndDate, calendarMonthStartDate } = getNewDisplayTimePeriods(newTimePeriod ? newTimePeriod : newDates[0]));
        }
        if (isInitialRender) {
            if (newDates.length) {
                lastFocusedDate = newDates[0];
            }
            else {
                lastFocusedDate = today;
            }
            if (`${newDates}` !== `${selectDates}`) {
                callOnChange = true;
            }
            if (focusOnInit) {
                setTimeout(() => {
                    document.getElementById(lastFocusedDate)?.focus();
                }, 0);
            }
        }
        newDates.sort();
        if (!isInitialRender) {
            if (`${internalRef.current.selectedDates}` !== `${newDates}`) {
                callOnChange = true;
            }
        }
        if (newSelectedDate || newRemovedDate || callOnChange) {
            handleOnChange(newDates);
        }
        if (focusedDate && newSelectedDate && newTimePeriod) {
            setTimeout(() => {
                document.getElementById(focusedDate)?.focus();
            }, 0);
        }
        if (onClose && dateClicked && isDateSelectionCriteriaSatisfied) {
            onClose();
        }
        setInternalState({
            displayMonth: getDisplayMonth(calendarDisplayMonth, locale),
            displayYear: getDisplayYear(calendarDisplayMonth),
            selectedDates: newDates,
        });
        internalRef.current = {
            ...internalRef.current,
            blockedDatesMap,
            calendarDisplayMonth,
            calendarMonthEndDate,
            calendarMonthStartDate,
            dateClicked: '',
            displayDaysOfTheWeek,
            isInitialRender: false,
            ...(isInitialRender && { lastFocusedDate }),
            newSelectedDate: '',
            newRemovedDate: '',
            newTimePeriod: '',
            selectDates,
            selectedDates: newDates,
            selectedDatesMap,
        };
    };
    useEffect(() => {
        const { focusedDate, lastFocusedDate } = internalRef.current;
        if (calendarFocused) {
            if (lastFocusedDate) {
                internalRef.current.focusedDate = lastFocusedDate;
            }
        }
        else {
            internalRef.current.lastFocusedDate = focusedDate;
            internalRef.current.focusedDate = '';
        }
    }, [calendarFocused]);
    useEffect(() => {
        document.getElementById(internalRef.current.focusedDate)?.focus();
    }, [internalRef.current.focusedDate]);
    useEffect(() => {
        setOneYearBeforeStartOfMonth();
        setOneYearAfterCalendarEndOfMonth();
        updateInternalState();
        return () => {
            internalRef.current.lastActiveElement.focus?.();
        };
    }, []);
    useEffect(() => {
        updateInternalState();
    }, [`${blockedDates}`, labels, locale, maxDate, minDate, mode, `${selectDates}`, weekStart]);
    useEffect(() => {
        if (maxDate) {
            internalRef.current.oneYearBeforeMaxDate = new ChainDate(maxDate).add(-1, TimePeriod.Year).format();
        }
        else {
            internalRef.current.oneYearBeforeMaxDate = '';
        }
    }, [maxDate]);
    useEffect(() => {
        if (minDate) {
            internalRef.current.oneYearAfterMinDate = new ChainDate(minDate).add(1, TimePeriod.Year).format();
        }
        else {
            internalRef.current.oneYearAfterMinDate = '';
        }
    }, [minDate]);
    useEffect(setOneYearBeforeStartOfMonth, [internalRef.current.calendarMonthStartDate]);
    useEffect(setOneYearAfterCalendarEndOfMonth, [internalRef.current.calendarMonthEndDate]);
    useEffect(() => {
        renderCalendar();
    }, [internalState]);
    const changeCalendarDisplayPeriod = (timePeriod, direction) => {
        handleKeydown(new KeyboardEvent('keydown', {
            ctrlKey: timePeriod === TimePeriod.Year,
            key: direction === 1 ? 'PageDown' : 'PageUp',
        }));
    };
    const dateIsInSelectedDates = (currentDate) => {
        const formattedDate = currentDate.format();
        return formattedDate in internalRef.current.selectedDatesMap;
    };
    const findBestDateToFocus = (startDate, searchDirection, testStartDate = false) => {
        let maxSearchDate = maxDate
            ? new ChainDate(maxDate).add(1, TimePeriod.Week).format()
            : new ChainDate(startDate).add(6, TimePeriod.Week).format();
        let minSearchDate = minDate
            ? new ChainDate(minDate).add(-1, TimePeriod.Week).format()
            : new ChainDate(startDate).add(-6, TimePeriod.Week).format();
        let bestDateToFocus = '';
        let possibleDateToFocus = new ChainDate(startDate);
        internalRef.current.selectedDates.forEach((date) => {
            if (date < minSearchDate) {
                minSearchDate = date;
            }
            else if (date > maxSearchDate) {
                maxSearchDate = date;
            }
        });
        if (testStartDate) {
            if (isDateSelectable(startDate, minSearchDate, maxSearchDate)) {
                return startDate;
            }
        }
        let dayDirection = 1;
        let weekDirection = 1;
        let dotwNum;
        let currentDateToTest;
        let searchPath;
        let dotwIndexToFocus;
        switch (searchDirection) {
            case SearchDirection.Left:
                dayDirection = -1;
            case SearchDirection.Right:
                currentDateToTest = possibleDateToFocus.add(dayDirection, TimePeriod.Day).format();
                while (currentDateToTest > minSearchDate &&
                    currentDateToTest < maxSearchDate &&
                    (getIsBlocked(currentDateToTest) || getIsDisabled(currentDateToTest))) {
                    currentDateToTest = possibleDateToFocus.add(dayDirection, TimePeriod.Day).format();
                }
                if (isDateSelectable(currentDateToTest, minSearchDate, maxSearchDate)) {
                    bestDateToFocus = currentDateToTest;
                }
                break;
            case SearchDirection.Up:
                weekDirection = -1;
            case SearchDirection.Down:
                possibleDateToFocus.add(weekDirection, TimePeriod.Week);
                dotwNum = possibleDateToFocus.getDay();
                searchPath = dotwSearchPaths[dotwNum];
                currentDateToTest = possibleDateToFocus.format();
                while (!bestDateToFocus && currentDateToTest > minSearchDate && currentDateToTest < maxSearchDate) {
                    dotwIndexToFocus = searchPath.find((dayModifier) => {
                        return isDateSelectable(possibleDateToFocus.clone().add(dayModifier, TimePeriod.Day).format(), minSearchDate, maxSearchDate);
                    });
                    if (typeof dotwIndexToFocus === 'number') {
                        bestDateToFocus = possibleDateToFocus.clone().add(dotwIndexToFocus, TimePeriod.Day).format();
                    }
                    possibleDateToFocus.add(weekDirection, TimePeriod.Week);
                    currentDateToTest = possibleDateToFocus.format();
                }
                break;
        }
        return bestDateToFocus;
    };
    const focusNewTimePeriod = (tempDate) => {
        const tempDateFormatted = tempDate.format();
        if (controlsFocused || !datepickerFocused) {
            internalRef.current.focusedDate = '';
            internalRef.current.lastFocusedDate = tempDateFormatted;
        }
        else {
            internalRef.current.focusedDate = tempDateFormatted;
        }
        internalRef.current.newTimePeriod = tempDateFormatted;
        updateInternalState();
    };
    const getCalendarContainerProps = () => {
        return {
            'aria-labelledby': `${internalRef.current.id}-month-year-label`,
            onBlur: (evt) => {
                if (!evt.currentTarget?.contains(evt.relatedTarget)) {
                    setCalendarFocused(false);
                }
            },
            onFocus: () => {
                setCalendarFocused(true);
                // if the month/year buttons become disabled while using and the calendar is clicked,
                // the onBlur event for the controls does not fire
                setControlsFocused(false);
            },
            role: 'grid',
        };
    };
    const getCalendarWeekContainerProps = () => {
        return {
            role: 'row',
        };
    };
    const getCalendarForTimePeriod = (displayMonth) => {
        const activeMonth = displayMonth.getMonth();
        const weeks = [];
        const calendarMonthStartDate = displayMonth.clone().startOfMonth();
        const currentDateInCalendar = calendarMonthStartDate.add((calendarMonthStartDate.getDay() - weekStart) * -1, TimePeriod.Day);
        let w = 0;
        while (!(w >= 4 && currentDateInCalendar.getMonth() !== activeMonth)) {
            weeks.push([]);
            for (let d = 0; d <= 6; d += 1) {
                const formatted = currentDateInCalendar.format();
                weeks[w].push({
                    blocked: getIsBlocked(formatted),
                    disabled: getIsDisabled(formatted),
                    displayText: String(currentDateInCalendar.getDate()),
                    formatted,
                    hovered: getIsHovered(formatted),
                    index: d,
                    inMonth: currentDateInCalendar.getMonth() === activeMonth,
                    inRange: mode === 'range' &&
                        formatted >= internalState.selectedDates[0] &&
                        formatted <= internalState.selectedDates[1],
                    rangeEnd: mode === 'range' && formatted === internalState.selectedDates[1],
                    rangeStart: mode === 'range' && formatted === internalState.selectedDates[0],
                    selected: dateIsInSelectedDates(currentDateInCalendar),
                    today: internalRef.current.today === formatted,
                });
                currentDateInCalendar.add(1, TimePeriod.Day);
            }
            w += 1;
        }
        return weeks;
    };
    const getControlsContainerProps = () => {
        return {
            onBlur: (evt) => {
                if (!evt.currentTarget?.contains(evt.relatedTarget)) {
                    setControlsFocused(false);
                }
            },
            onFocus: () => {
                setControlsFocused(true);
            },
        };
    };
    const getDatepickerContainerProps = () => {
        return {
            'aria-activedescendant': internalRef.current.focusedDate,
            onBlur: (evt) => {
                if (!evt.currentTarget?.contains(evt.relatedTarget)) {
                    setDatepickerFocused(false);
                }
            },
            onFocus: () => setDatepickerFocused(true),
            onKeyDown: handleKeydown,
        };
    };
    const getDayButtonProps = (day) => {
        const { focusedDate, id, lastFocusedDate } = internalRef.current;
        const isDisabled = day.blocked || day.disabled;
        return {
            ...(isDisabled && { 'aria-disabled': true }),
            'aria-label': `${day.displayText} ${isDisabled ? internalLabels.current.disabled : ''} ${day.today ? internalLabels.current.today : ''} ${isDaySelected(day) ? internalLabels.current.dateSelected : ''}`,
            'aria-describedby': `${id}-month-year-label`,
            ...(isDaySelected(day) && { 'aria-selected': true }),
            ...(!(day.formatted === focusedDate || day.formatted === lastFocusedDate) && isDisabled && { disabled: true }),
            id: day.formatted,
            key: day.formatted,
            onClick: () => {
                if (!day.blocked && !day.disabled) {
                    if (day.selected && (mode === 'multiple' || typeof mode == 'number')) {
                        internalRef.current.newRemovedDate = day.formatted;
                    }
                    else if (!day.selected) {
                        internalRef.current.newSelectedDate = day.formatted;
                    }
                    internalRef.current.dateClicked = day.formatted;
                    focusNewTimePeriod(new ChainDate(day.formatted));
                }
            },
            onMouseOut: () => {
                setHoveredDate('');
            },
            onMouseOver: () => {
                setHoveredDate(day.formatted);
            },
            role: 'gridcell',
            tabIndex: getTabIndexForDay(day),
            type: 'button',
        };
    };
    const getDayOfTheWeekProps = (index) => {
        const dayOfTheWeek = internalRef.current.displayDaysOfTheWeek[index];
        return {
            abbr: dayOfTheWeek.long,
            'aria-label': dayOfTheWeek.long,
            id: `day-of-the-week-${index}`,
            role: 'columnheader',
            scope: 'col',
        };
    };
    const getDaysOfTheWeekContainerProps = () => {
        return {
            role: 'row',
        };
    };
    const getOnCloseButtonProps = () => {
        return {
            'aria-label': internalLabels.current.closeButton,
            onClick: () => {
                if (onClose) {
                    setCalendarFocused(false);
                    setControlsFocused(false);
                    setDatepickerFocused(false);
                    onClose();
                }
            },
            tabIndex: datepickerFocused ? 0 : -1,
            title: internalLabels.current.closeButton,
            type: 'button',
        };
    };
    const getMonthYearContainerProps = () => {
        return {
            'aria-atomic': 'true',
            'aria-live': 'assertive',
            id: `${internalRef.current.id}-month-year-label`,
        };
    };
    const getNextMonthButtonProps = () => {
        const { calendarMonthEndDate, selectedDates } = internalRef.current;
        const { nextMonth } = internalLabels.current;
        return {
            'aria-label': nextMonth,
            disabled: (maxDate && calendarMonthEndDate > maxDate) ||
                (isMaxModeReached() && selectedDates[selectedDates.length - 1] <= calendarMonthEndDate),
            onClick: () => {
                changeCalendarDisplayPeriod(TimePeriod.Month, 1);
            },
            tabIndex: datepickerFocused ? 0 : -1,
            title: nextMonth,
            type: 'button',
        };
    };
    const getNextYearButtonProps = () => {
        const { calendarMonthEndDate, oneYearBeforeMaxDate, oneYearAfterStartOfMonth, selectedDates } = internalRef.current;
        const { nextYear } = internalLabels.current;
        return {
            'aria-label': nextYear,
            disabled: (maxDate && calendarMonthEndDate > oneYearBeforeMaxDate) ||
                (isMaxModeReached() && selectedDates[selectedDates.length - 1] < oneYearAfterStartOfMonth),
            onClick: () => {
                changeCalendarDisplayPeriod(TimePeriod.Year, 1);
            },
            tabIndex: datepickerFocused ? 0 : -1,
            title: nextYear,
            type: 'button',
        };
    };
    const getPreviousMonthButtonProps = () => {
        const { calendarMonthStartDate, selectedDates } = internalRef.current;
        const { previousMonth } = internalLabels.current;
        return {
            'aria-label': previousMonth,
            disabled: (minDate && calendarMonthStartDate < minDate) ||
                (isMaxModeReached() && selectedDates[0] > calendarMonthStartDate),
            onClick: () => {
                changeCalendarDisplayPeriod(TimePeriod.Month, -1);
            },
            tabIndex: datepickerFocused ? 0 : -1,
            title: previousMonth,
            type: 'button',
        };
    };
    const getPreviousYearButtonProps = () => {
        const { calendarMonthStartDate, oneYearAfterMinDate, oneYearBeforeEndOfMonth, selectedDates } = internalRef.current;
        const { previousYear } = internalLabels.current;
        return {
            'aria-label': previousYear,
            disabled: (minDate && calendarMonthStartDate < oneYearAfterMinDate) ||
                (isMaxModeReached() && selectedDates[0] > oneYearBeforeEndOfMonth),
            onClick: () => {
                changeCalendarDisplayPeriod(TimePeriod.Year, -1);
            },
            tabIndex: datepickerFocused ? 0 : -1,
            title: previousYear,
            type: 'button',
        };
    };
    const getTabIndexForDay = (day) => {
        if (internalRef.current.focusedDate) {
            return day.formatted === internalRef.current.focusedDate ? 0 : -1;
        }
        else if (internalRef.current.lastFocusedDate) {
            return day.formatted === internalRef.current.lastFocusedDate ? 0 : -1;
        }
        else {
            return day.formatted === internalRef.current.today ? 0 : -1;
        }
    };
    const getIsBlocked = (currentDate) => {
        return currentDate in internalRef.current.blockedDatesMap;
    };
    const getIsDisabled = (currentDate) => {
        if (minDate && currentDate < minDate) {
            return true;
        }
        if (maxDate && currentDate > maxDate) {
            return true;
        }
        if (isMaxModeReached() && !(currentDate in internalRef.current.selectedDatesMap)) {
            return true;
        }
        return false;
    };
    const getIsHovered = (currentDate) => {
        return currentDate === hoveredDate;
    };
    const handleKeydown = (evt) => {
        if (evt.key === 'Tab' || (controlsFocused && evt.key !== 'PageDown' && evt.key !== 'PageUp')) {
            return;
        }
        const { calendarMonthEndDate, calendarMonthStartDate, focusedDate, lastFocusedDate } = internalRef.current;
        let dateToFocus = controlsFocused ? lastFocusedDate : focusedDate;
        if (dateToFocus < calendarMonthStartDate || dateToFocus > calendarMonthEndDate) {
            if (minDate && minDate >= calendarMonthStartDate && minDate <= calendarMonthEndDate) {
                dateToFocus = minDate;
            }
            else {
                dateToFocus = calendarMonthStartDate;
            }
        }
        let newFocusedDate = '';
        switch (evt.key) {
            case 'ArrowLeft':
                newFocusedDate = findBestDateToFocus(dateToFocus, SearchDirection.Left);
                break;
            case 'ArrowRight':
                newFocusedDate = findBestDateToFocus(dateToFocus, SearchDirection.Right);
                break;
            case 'ArrowUp':
                newFocusedDate = findBestDateToFocus(dateToFocus, SearchDirection.Up);
                break;
            case 'ArrowDown':
                newFocusedDate = findBestDateToFocus(dateToFocus, SearchDirection.Down);
                break;
            case 'Home':
                // first day of the current month
                newFocusedDate = findBestDateToFocus(new ChainDate(dateToFocus).startOfMonth().format(), SearchDirection.Right, true);
                break;
            case 'End':
                // last day of the current month
                newFocusedDate = findBestDateToFocus(new ChainDate(dateToFocus).endOfMonth().format(), SearchDirection.Left, true);
                break;
            case 'PageUp':
                if (evt.ctrlKey) {
                    // same date in the previous year
                    newFocusedDate = new ChainDate(dateToFocus).add(-1, TimePeriod.Year, true).format();
                }
                else {
                    // same date in the previous month
                    newFocusedDate = new ChainDate(dateToFocus).add(-1, TimePeriod.Month, true).format();
                }
                break;
            case 'PageDown':
                if (evt.ctrlKey) {
                    // same date in the next year
                    newFocusedDate = new ChainDate(dateToFocus).add(1, TimePeriod.Year, true).format();
                }
                else {
                    // same date in the next month
                    newFocusedDate = new ChainDate(dateToFocus).add(1, TimePeriod.Month, true).format();
                }
                break;
            case ' ':
            case 'Enter':
                evt.preventDefault();
                document.getElementById(dateToFocus)?.click();
                return;
            case 'Esc':
            case 'Escape':
                if (onClose) {
                    onClose();
                }
                evt.preventDefault();
                return;
        }
        if (newFocusedDate) {
            evt.preventDefault();
            if ((minDate && newFocusedDate < minDate) || (maxDate && newFocusedDate > maxDate)) {
                newFocusedDate = '';
            }
            else if (newFocusedDate > calendarMonthEndDate || newFocusedDate < calendarMonthStartDate) {
                internalRef.current.newTimePeriod = newFocusedDate;
                updateInternalState();
            }
        }
        if (newFocusedDate) {
            if (controlsFocused) {
                internalRef.current.lastFocusedDate = newFocusedDate;
            }
            else {
                internalRef.current.focusedDate = newFocusedDate;
            }
            renderCalendar();
        }
        return false;
    };
    const handleOnChange = (newDates) => {
        if (onChange) {
            let returnValue = newDates;
            if (mode === 'single') {
                returnValue = newDates.length ? newDates[0] : '';
            }
            onChange(returnValue);
        }
    };
    const isDateSelectable = (testDate, minSearchDate, maxSearchDate) => {
        return (testDate >= minSearchDate && testDate <= maxSearchDate && !getIsBlocked(testDate) && !getIsDisabled(testDate));
    };
    const isDaySelected = (day) => {
        return day.inRange || day.rangeStart || day.rangeEnd || day.selected;
    };
    const isMaxModeReached = () => {
        return typeof mode === 'number' && internalState.selectedDates.length >= mode;
    };
    const renderCalendar = () => {
        const { calendarDisplayMonth } = internalRef.current;
        const weeks = getCalendarForTimePeriod(calendarDisplayMonth);
        setCalendar(weeks);
    };
    const setMonth = (month) => {
        const tempDate = new ChainDate(internalRef.current.focusedDate || internalRef.current.lastFocusedDate).setMonth(month, true);
        focusNewTimePeriod(tempDate);
    };
    const setYear = (year) => {
        const tempDate = new ChainDate(internalRef.current.focusedDate || internalRef.current.lastFocusedDate).setYear(year);
        focusNewTimePeriod(tempDate);
    };
    return {
        calendar,
        displayDaysOfTheWeek: internalRef.current.displayDaysOfTheWeek,
        displayMonth: internalState.displayMonth,
        displayYear: internalState.displayYear,
        focusedDate: internalRef.current.focusedDate,
        getCalendarContainerProps,
        getCalendarWeekContainerProps,
        getDayOfTheWeekProps,
        getDaysOfTheWeekContainerProps,
        getOnCloseButtonProps,
        getControlsContainerProps,
        getDatepickerContainerProps,
        getDayButtonProps,
        getMonthYearContainerProps,
        getNextMonthButtonProps,
        getNextYearButtonProps,
        getPreviousMonthButtonProps,
        getPreviousYearButtonProps,
        hoveredDate,
        selectedDates: internalState.selectedDates,
        setMonth,
        setYear,
        today: internalRef.current.today,
    };
};
//# sourceMappingURL=use-datepicker.js.map