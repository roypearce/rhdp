import { DisplayDaysOfTheWeek, SelectedDates, WeekStart } from './types';
import ChainDate, { ChainDateType, TimePeriod } from './chain-date';

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const convertToStringArray = (maybeArray: SelectedDates): string[] => {
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  }
  if (maybeArray) {
    return [maybeArray];
  }
  return [];
};

export const formatDayOfTheWeek = (locale: string, date: Date, format: 'long' | 'short' | 'narrow' | undefined) => {
  return capitalize(new Intl.DateTimeFormat(locale, { weekday: format }).format(date));
};

export const getDaysOfTheWeek = (locale: string, weekStart: WeekStart): DisplayDaysOfTheWeek => {
  const date = new ChainDate();
  const dayOfWeek = date.getDay();
  const firstDayOfWeek = date.add((dayOfWeek - weekStart) * -1, TimePeriod.Day);
  return [
    getDayOfTheWeekObject(locale, firstDayOfWeek.date),
    getDayOfTheWeekObject(locale, firstDayOfWeek.add(1, TimePeriod.Day).date),
    getDayOfTheWeekObject(locale, firstDayOfWeek.add(1, TimePeriod.Day).date),
    getDayOfTheWeekObject(locale, firstDayOfWeek.add(1, TimePeriod.Day).date),
    getDayOfTheWeekObject(locale, firstDayOfWeek.add(1, TimePeriod.Day).date),
    getDayOfTheWeekObject(locale, firstDayOfWeek.add(1, TimePeriod.Day).date),
    getDayOfTheWeekObject(locale, firstDayOfWeek.add(1, TimePeriod.Day).date),
  ];
};

const getDayOfTheWeekObject = (locale: string, date: Date) => {
  return {
    long: formatDayOfTheWeek(locale, date, 'long'),
    narrow: formatDayOfTheWeek(locale, date, 'narrow'),
    short: formatDayOfTheWeek(locale, date, 'short'),
  };
};

export const getDisplayMonth = (calendarDisplayMonth: ChainDateType, locale: string) => {
  return capitalize(new Intl.DateTimeFormat(locale, { month: 'long' }).format(calendarDisplayMonth.date));
};

export const getDisplayYear = (calendarDisplayMonth: ChainDateType) => calendarDisplayMonth.getFullYear();

export const getNewDisplayTimePeriods = (newTimePeriod: string) => {
  const newCalendarDisplayMonth = new ChainDate(newTimePeriod).startOfMonth();
  return {
    calendarDisplayMonth: newCalendarDisplayMonth,
    calendarMonthEndDate: newCalendarDisplayMonth.clone().endOfMonth().format(),
    calendarMonthStartDate: newCalendarDisplayMonth.format(),
  };
};

export const getFocusableElements = (currentQuerySelector: HTMLElement | null) => {
  return [
    ...(currentQuerySelector?.querySelectorAll(
      'a:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])',
    ) || []),
  ];
};

let uniqueId = 0;
export function getUniqueId(prefix = 'rhdp-id-') {
  return `${prefix}${(uniqueId += 1)}`;
}

export const isDateValid = (date?: string | null): boolean => {
  try {
    if (!date) {
      return false;
    }
    const [year, month, day] = date.match(/\d+/g) || ['', '', ''];
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/u;
    const jsDate = new Date(`${prependZeroes(month, 2)}/${prependZeroes(day, 2)}/${year}`);
    return (
      !isNaN(jsDate.getTime()) &&
      dateRegex.test(date) &&
      +month === jsDate.getMonth() + 1 &&
      +day === jsDate.getDate() &&
      +year === jsDate.getFullYear()
    );
  } catch (e) {
    return false;
  }
};

export const prependZeroes = (value: string, length: number): string => {
  const zeroesRequired = length - value.length;
  if (zeroesRequired < 1) {
    return value;
  }
  for (let i = 1; i <= zeroesRequired; i += 1) {
    value = `0${value}`;
  }
  return value;
};
