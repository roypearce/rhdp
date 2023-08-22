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

export type DatesMap = { [key: string]: null };

export type DatepickerMethodsRef = MutableRefObject<
  { setMonth(month: number): void; setYear(year: number): void } | undefined
>;

export type DateSelectionMode = 'single' | 'range' | 'multiple' | number;

export enum SearchDirection {
  Down,
  Left,
  Right,
  Up,
}

export type DisplayDaysOfTheWeek = { long: string; narrow: string; short: string }[];

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

export enum RenderType {
  Initial,
  Programmatic,
  User,
}

export type SelectedDates = string | string[] | undefined | null;

export interface UseDatepickerProps {
  blockedDates?: SelectedDates;
  focusOnInit?: boolean;
  hasFocusTrap?: boolean;
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
  maxDate?: string | null | undefined;
  minDate?: string | null | undefined;
  mode?: DateSelectionMode;
  onChange?(newDates: SelectedDates): void;
  onClose?(): void;
  selectDates?: SelectedDates;
  weekStart?: WeekStart;
}

export interface UseDatepicker {
  calendar: CalendarDay[][];
  displayDaysOfTheWeek: DisplayDaysOfTheWeek;
  displayMonth: string;
  displayYear: number;
  focusedDate: string;
  getCalendarContainerProps(): {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBlur(evt: any): void;
    onFocus(): void;
  };
  getCalendarDayContainerProps(): {
    [key: string]: string;
  };
  getCalendarWeekContainerProps(): {
    [key: string]: string;
  };
  getControlsContainerProps(): {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBlur(evt: any): void;
    onFocus(): void;
  };
  getDatepickerContainerProps(): {
    'aria-activedescendant': string;
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBlur(evt: any): void;
    onFocus(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onKeyDown(evt: any): void;
  };
  getDayButtonProps(day: CalendarDay): {
    id: string;
    onClick(): void;
    tabIndex: number;
  };
  getDayOfTheWeekProps(index: number): {
    abbr: string;
    id: string;
    scope: string;
  };
  getDaysOfTheWeekContainerProps(): {
    role: string;
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
  getOnCloseButtonProps(): {
    'aria-label': string;
    onClick(): void;
  };
  getPreviousYearButtonProps(): {
    onClick(): void;
    tabIndex: number;
  };
  hoveredDate: string;
  id: string;
  selectedDates: SelectedDates;
  setMonth(month: number): void;
  setYear(year: number): void;
  today: string;
}

export type WeekStart = 0 | 1;
