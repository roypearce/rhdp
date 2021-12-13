import ChainDate from '../../src/chain-date';
import {
  convertToStringArray,
  formatDayOfTheWeek,
  getDaysOfTheWeek,
  getDisplayMonth,
  getDisplayYear,
  getNewDisplayTimePeriods,
  getUniqueId,
  isDateValid,
  prependZeroes,
} from '../../src/util';

test('convertToStringArray', () => {
  expect(convertToStringArray('a')).toEqual(['a']);
  expect(convertToStringArray(['a'])).toEqual(['a']);
});

test('formatDayOfTheWeek', () => {
  const date = new Date();
  date.setFullYear(2021);
  date.setMonth(1);
  date.setDate(1);
  expect(formatDayOfTheWeek('en-US', date, 'long')).toEqual('Monday');
  expect(formatDayOfTheWeek('en-US', date, 'narrow')).toEqual('M');
  expect(formatDayOfTheWeek('en-US', date, 'short')).toEqual('Mon');
  expect(formatDayOfTheWeek('fr-FR', date, 'long')).toEqual('Lundi');
  expect(formatDayOfTheWeek('fr-FR', date, 'narrow')).toEqual('L');
  expect(formatDayOfTheWeek('fr-FR', date, 'short')).toEqual('Lun.');
});

test('getDaysOfTheWeek', () => {
  expect(getDaysOfTheWeek('en-US', 0)).toEqual([
    {
      long: 'Sunday',
      narrow: 'S',
      short: 'Sun',
    },
    {
      long: 'Monday',
      narrow: 'M',
      short: 'Mon',
    },
    {
      long: 'Tuesday',
      narrow: 'T',
      short: 'Tue',
    },
    {
      long: 'Wednesday',
      narrow: 'W',
      short: 'Wed',
    },
    {
      long: 'Thursday',
      narrow: 'T',
      short: 'Thu',
    },
    {
      long: 'Friday',
      narrow: 'F',
      short: 'Fri',
    },
    {
      long: 'Saturday',
      narrow: 'S',
      short: 'Sat',
    },
  ]);
  expect(getDaysOfTheWeek('en-US', 1)).toEqual([
    {
      long: 'Monday',
      narrow: 'M',
      short: 'Mon',
    },
    {
      long: 'Tuesday',
      narrow: 'T',
      short: 'Tue',
    },
    {
      long: 'Wednesday',
      narrow: 'W',
      short: 'Wed',
    },
    {
      long: 'Thursday',
      narrow: 'T',
      short: 'Thu',
    },
    {
      long: 'Friday',
      narrow: 'F',
      short: 'Fri',
    },
    {
      long: 'Saturday',
      narrow: 'S',
      short: 'Sat',
    },
    {
      long: 'Sunday',
      narrow: 'S',
      short: 'Sun',
    },
  ]);
  expect(getDaysOfTheWeek('fr-FR', 0)).toEqual([
    {
      long: 'Dimanche',
      narrow: 'D',
      short: 'Dim.',
    },
    {
      long: 'Lundi',
      narrow: 'L',
      short: 'Lun.',
    },
    {
      long: 'Mardi',
      narrow: 'M',
      short: 'Mar.',
    },
    {
      long: 'Mercredi',
      narrow: 'M',
      short: 'Mer.',
    },
    {
      long: 'Jeudi',
      narrow: 'J',
      short: 'Jeu.',
    },
    {
      long: 'Vendredi',
      narrow: 'V',
      short: 'Ven.',
    },
    {
      long: 'Samedi',
      narrow: 'S',
      short: 'Sam.',
    },
  ]);
  expect(getDaysOfTheWeek('fr-FR', 1)).toEqual([
    {
      long: 'Lundi',
      narrow: 'L',
      short: 'Lun.',
    },
    {
      long: 'Mardi',
      narrow: 'M',
      short: 'Mar.',
    },
    {
      long: 'Mercredi',
      narrow: 'M',
      short: 'Mer.',
    },
    {
      long: 'Jeudi',
      narrow: 'J',
      short: 'Jeu.',
    },
    {
      long: 'Vendredi',
      narrow: 'V',
      short: 'Ven.',
    },
    {
      long: 'Samedi',
      narrow: 'S',
      short: 'Sam.',
    },
    {
      long: 'Dimanche',
      narrow: 'D',
      short: 'Dim.',
    },
  ]);
});

test('getDisplayMonth', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(getDisplayMonth(chainDate, 'en-US')).toEqual('January');
  expect(getDisplayMonth(chainDate, 'fr-FR')).toEqual('Janvier');
});

test('getDisplayYear', () => {
  const chainDate = new ChainDate('2021-01-01');
  expect(getDisplayYear(chainDate)).toEqual(2021);
});

test('getNewDisplayTimePeriods', () => {
  const newTimePeriod = getNewDisplayTimePeriods('2021-01-19');
  expect(newTimePeriod.calendarMonthEndDate).toEqual('2021-01-31');
  expect(newTimePeriod.calendarMonthStartDate).toEqual('2021-01-01');
});

test('getUniqueId', () => {
  expect(getUniqueId()).toEqual('rdhp-id-1');
  expect(getUniqueId('test')).toEqual('test2');
});

test('isDateValid', () => {
  expect(isDateValid('2021-10-11')).toEqual(true);
  expect(isDateValid('2021-13-11')).toEqual(false);
  expect(isDateValid('2021-10-41')).toEqual(false);
  expect(isDateValid('2021/10/11')).toEqual(false);
  expect(isDateValid('11/10/2021')).toEqual(false);
  expect(isDateValid('0')).toEqual(false);
  expect(isDateValid('')).toEqual(false);
});

test('prependZeroes', () => {
  expect(prependZeroes('1', 1)).toEqual('1');
  expect(prependZeroes('1', 2)).toEqual('01');
  expect(prependZeroes('1', 3)).toEqual('001');
  expect(prependZeroes('11', 2)).toEqual('11');
  expect(prependZeroes('111', 2)).toEqual('111');
});
