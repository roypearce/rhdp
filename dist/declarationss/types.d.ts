import { MutableRefObject } from 'react';
import { ChainDateType } from './chain-date';
export interface CalendarDay {
    blocked: boolean;
    disabled: boolean;
    displayText: string;
    formatted: string;
    hovered: boolean;
    index: number;
    inMonth: boolean;
    inRange: boolean;
    rangeEnd: boolean;
    rangeStart: boolean;
    selected: boolean;
    today: boolean;
}
export declare type DatesMap = {
    [key: string]: null;
};
export declare type DatepickerMethodsRef = MutableRefObject<{
    setMonth(month: number): void;
    setYear(year: number): void;
}>;
export declare type DateSelectionMode = 'single' | 'range' | 'multiple' | number;
export declare enum SearchDirection {
    Down = 0,
    Left = 1,
    Right = 2,
    Up = 3
}
export declare type DisplayDaysOfTheWeek = {
    long: string;
    narrow: string;
    short: string;
}[];
export interface DayOfTheWeek {
    long: string;
    narrow: string;
    short: string;
}
export interface InternalRef {
    blockedDatesMap: DatesMap;
    calendarDisplayMonth: ChainDateType;
    calendarMonthEndDate: string;
    calendarMonthStartDate: string;
    dateClicked: string;
    displayDaysOfTheWeek: DisplayDaysOfTheWeek;
    focusedDate: string;
    id: string;
    isInitialRender: boolean;
    lastActiveElement: Element | null;
    lastFocusedDate: string;
    locale: string;
    newSelectedDate: string;
    newRemovedDate: string;
    newTimePeriod: string;
    now: ChainDateType;
    oneYearAfterMinDate: string;
    oneYearAfterStartOfMonth: string;
    oneYearBeforeEndOfMonth: string;
    oneYearBeforeMaxDate: string;
    selectDates: SelectedDates | undefined;
    selectedDates: string[];
    selectedDatesMap: DatesMap;
    today: string;
    weekStart: number;
}
export declare type OnChangeResponse = SelectedDates | null;
export declare enum RenderType {
    Initial = 0,
    Programmatic = 1,
    User = 2
}
export declare type SelectedDates = string | string[];
export interface UseDatepickerProps {
    blockedDates?: SelectedDates;
    focusOnInit?: boolean;
    hideDatepicker?(): void;
    labels?: {
        closeButton?: string;
        dateSelected?: string;
        nextMonthButton?: string;
        nextYearButton?: string;
        previousMonthButton?: string;
        previousYearButton?: string;
        today?: string;
    };
    locale?: string;
    maxDate?: string;
    minDate?: string;
    mode?: DateSelectionMode;
    onChange?(newDates: OnChangeResponse): void;
    selectDates?: SelectedDates;
    weekStart?: WeekStart;
}
export interface UseDatepicker {
    calendar: CalendarDay[][];
    displayDaysOfTheWeek: DisplayDaysOfTheWeek;
    displayMonth: string;
    displayYear: number;
    focusedDate: string;
    hoveredDate: string;
    getCalendarContainerProps(): {
        onBlur(evt: any): void;
        onFocus(): void;
    };
    getCalendarWeekContainerProps(): {
        [key: string]: string;
    };
    getDayOfTheWeekProps(index: number): {
        abbr: string;
        id: string;
        scope: string;
    };
    getDaysOfTheWeekContainerProps(): {
        role: string;
    };
    getHideDatepickerButtonProps(): {
        'aria-label': string;
        onClick(): void;
    };
    getControlsContainerProps(): {
        onBlur(evt: any): void;
        onFocus(): void;
    };
    getDatepickerContainerProps(): {
        'aria-activedescendant': string;
        onBlur(evt: any): void;
        onFocus(): void;
        onKeyDown(evt: any): void;
    };
    getDayButtonProps(day: CalendarDay): {
        id: string;
        onClick(): void;
        tabIndex: number;
    };
    getMonthYearContainerProps(): {
        [key: string]: string;
    };
    getNextMonthButtonProps(): {
        onClick(): void;
        tabIndex: number;
    };
    getPreviousMonthButtonProps(): {
        onClick(): void;
        tabIndex: number;
    };
    getNextYearButtonProps(): {
        onClick(): void;
        tabIndex: number;
    };
    getPreviousYearButtonProps(): {
        onClick(): void;
        tabIndex: number;
    };
    selectedDates: SelectedDates;
    setMonth(month: number): void;
    setYear(year: number): void;
    today: string;
}
export declare type WeekStart = 0 | 1;
