import React from 'react';
import { DatepickerMethodsRef, UseDatepickerProps } from '../../src/types';
import { useDatepicker } from '../../src/use-datepicker';

export interface DatepickerProps extends UseDatepickerProps {
  datepickerMethods?: DatepickerMethodsRef;
}

const Datepicker = ({
  blockedDates,
  datepickerMethods,
  focusOnInit,
  hasFocusTrap,
  labels,
  locale,
  maxDate,
  minDate,
  mode,
  onChange,
  onClose,
  selectDates,
  weekStart,
}: DatepickerProps) => {
  const {
    calendar,
    displayDaysOfTheWeek,
    displayMonth,
    displayYear,
    focusedDate,
    getCalendarContainerProps,
    getCalendarDayContainerProps,
    getCalendarWeekContainerProps,
    getDayOfTheWeekProps,
    getDaysOfTheWeekContainerProps,
    getControlsContainerProps,
    getDatepickerContainerProps,
    getDayButtonProps,
    getMonthYearContainerProps,
    getNextMonthButtonProps,
    getOnCloseButtonProps,
    getPreviousMonthButtonProps,
    getNextYearButtonProps,
    getPreviousYearButtonProps,
    hoveredDate,
    id,
    selectedDates,
    setMonth,
    setYear,
    today,
  } = useDatepicker({
    blockedDates,
    focusOnInit,
    hasFocusTrap,
    labels,
    locale,
    maxDate,
    minDate,
    mode,
    onClose,
    selectDates,
    onChange,
    weekStart,
  });

  if (datepickerMethods) {
    datepickerMethods.current = { setMonth, setYear };
  }

  if (calendar.length <= 1) {
    return null;
  }

  const renderedControls = () => {
    return (
      <div className="controls-container" data-testid="div-controls" {...getControlsContainerProps()}>
        <div className="control-group">
          <button
            className="button-reset control-button control-button-rotate-180"
            data-testid="btn-previous-year"
            {...getPreviousYearButtonProps()}
          >
            <img
              aria-hidden={true}
              className="control-button-svg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJtMTAzLjY5NiAxOTUuMDU1IDk1LjM0Ni05NS05NS4zNDYtOTUtMjcuMDQ4IDI2Ljk1MSA2OC4yOTcgNjguMDQ5LTY4LjI5NyA2OC4wNDl6Ii8+PHBhdGggZD0ibTI4LjA5IDE5NS4wNTUgOTUuMzQ1LTk1LTk1LjM0NS05NUwxLjA0MiAzMi4wMDZsNjguMjk2IDY4LjA0OS02OC4yOTYgNjguMDQ5eiIvPjwvc3ZnPg=="
            />
          </button>
          <button
            className="button-reset control-button control-button-rotate-180"
            data-testid="btn-previous-month"
            {...getPreviousMonthButtonProps()}
          >
            <img
              aria-hidden={true}
              className="control-button-svg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJtMTY1LjA0MiAxMDAuMDU1LTk1LjM0Ni05NS0yNy4wNDggMjYuOTUxIDY4LjI5NyA2OC4wNDktNjguMjk3IDY4LjA0OSAyNy4wNDggMjYuOTUxeiIvPjwvc3ZnPg=="
            />
          </button>
        </div>
        <div className="month-year-title" data-testid="div-month-year-title" {...getMonthYearContainerProps()}>
          {`${displayMonth} ${displayYear}`}
        </div>
        <div className="control-group">
          <button className="button-reset control-button" data-testid="btn-next-month" {...getNextMonthButtonProps()}>
            <img
              aria-hidden="true"
              className="control-button-svg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJtMTY1LjA0MiAxMDAuMDU1LTk1LjM0Ni05NS0yNy4wNDggMjYuOTUxIDY4LjI5NyA2OC4wNDktNjguMjk3IDY4LjA0OSAyNy4wNDggMjYuOTUxeiIvPjwvc3ZnPg=="
            />
          </button>
          <button className="button-reset control-button" data-testid="btn-next-year" {...getNextYearButtonProps()}>
            <img
              aria-hidden={true}
              className="control-button-svg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJtMTAzLjY5NiAxOTUuMDU1IDk1LjM0Ni05NS05NS4zNDYtOTUtMjcuMDQ4IDI2Ljk1MSA2OC4yOTcgNjguMDQ5LTY4LjI5NyA2OC4wNDl6Ii8+PHBhdGggZD0ibTI4LjA5IDE5NS4wNTUgOTUuMzQ1LTk1LTk1LjM0NS05NUwxLjA0MiAzMi4wMDZsNjguMjk2IDY4LjA0OS02OC4yOTYgNjguMDQ5eiIvPjwvc3ZnPg=="
            />
          </button>
        </div>
      </div>
    );
  };

  const renderedCalendar = () => {
    return (
      <div data-testid="div-calendar" {...getCalendarContainerProps()}>
        {renderedDaysOfTheWeek()}
        <div className="month-container" data-testid="div-calendar-dates">
          {calendar.map((week, weekIndex) => {
            return (
              <div
                className="week-container"
                data-testid={`div-week-${weekIndex}`}
                key={`week-${weekIndex}`}
                {...getCalendarWeekContainerProps()}
              >
                {week.map((day, index) => {
                  return (
                    <div key={`day-cell-${index}`} {...getCalendarDayContainerProps()}>
                      <button
                        className={`button-reset day-container 
                        ${today === day.formatted ? 'day-today' || '' : ''}
                        ${day.inMonth ? 'day-in-month' : 'day-out-of-month' || ''}
                        ${day.blocked ? 'day-blocked' || '' : ''} 
                        ${day.disabled ? 'day-disabled' || '' : ''}  
                        ${day.selected ? 'day-selected' || '' : ''}
                        ${day.inRange ? 'day-in-range' || '' : ''} 
                        ${day.rangeEnd ? 'day-in-range-end' || '' : ''}   
                        ${day.rangeStart ? 'day-in-range-start' || '' : ''}   
                      `}
                        data-testid={`btn-day-${day.formatted}`}
                        type="button"
                        {...getDayButtonProps(day)}
                      >
                        <div className="day-content">{day.displayText}</div>
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderedDaysOfTheWeek = () => {
    return (
      <div
        className="days-of-the-week-container"
        data-testid="div-days-of-the-week"
        {...getDaysOfTheWeekContainerProps()}
      >
        {displayDaysOfTheWeek.map((dayOfTheWeek, index) => {
          return (
            <div
              className="days-of-the-week-day"
              data-testid={`btn-day-of-the-week-${index}`}
              key={`dotw-${index}`}
              {...getDayOfTheWeekProps(index)}
            >
              {dayOfTheWeek.short}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`datepicker-container ${onClose ? 'datepicker-popover' : ''}`}
      data-testid="div-datepicker"
      {...getDatepickerContainerProps()}
    >
      {onClose && (
        <div className="close-container">
          <button
            className="button-reset control-button close-button"
            data-testid="btn-close"
            type="button"
            {...getOnCloseButtonProps()}
          >
            <img
              aria-hidden={true}
              className="control-button-svg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTAgNDkwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNMzg2LjgxMyAwIDI0NSAxNDEuODEyIDEwMy4xODggMCAwIDEwMy4xODggMTQxLjgxMyAyNDUgMCAzODYuODEybDEwMy4xODcgMTAzLjE4N0wyNDUgMzQ4LjE4NyAzODYuODEzIDQ5MCA0OTAgMzg2LjgxMiAzNDguMTg3IDI0NC45OTkgNDkwIDEwMy4xODd6Ii8+PC9zdmc+"
            />
          </button>
        </div>
      )}
      {renderedControls()}
      {renderedCalendar()}
    </div>
  );
};

export default Datepicker;
