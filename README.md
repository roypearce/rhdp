<img src="https://raw.githubusercontent.com/roypearce/rhdp/main/.storybook/rhdp-logo.svg" alt="RHDP - React Hook Datepicker" width="200" />

# RHDP - React Hook Datepicker

A React Hook based primitive to build simple, flexible datepicker components that are WAI-ARIA compliant, and support localization.

<img src="https://img.shields.io/npm/v/rhdp?color=brightgreen" alt="rhdp npm version" />
<img src="https://img.shields.io/nycrc/roypearce/rhdp?config=nyc-total.json&label=code%20coverage&preferredThreshold=lines" alt="code coverage" />
<img src="https://img.shields.io/bundlephobia/minzip/rhdp" alt="rhdp minified size" />

## The Problem

You need a datepicker that can be fully customized in appearance, but it needs to be accessible, and flexible enough to meet your needs. It should work with any design system, including one built in-house, and have zero dependencies (besides React of course). It should also meet accessibility specs for screenreaders, as well as keyboard accessibility. It should also only concern itself with dates, a datepicker should not concern itself with time, or timezones.

## The Solution

RHDP offers a single react hook called `useDatepicker`. It provides functions and properties to populate your own React based datepicker component. It is fully typed with Typescript and backed by interaction and unit tests. You can lift and shift any of the existing datepicker components built with RHDP in the examples and adapt them to your needs.

Use your own design system or one of the many publicly available design systems to easily match the datepicker with the look for your site. Just provide css classes for the applicable styles for them to be applied at the component level.

This React Hook Datepicker allows several modes of operation: single select, range select, multi-select, and max multi-select. Selectable dates can be limited by min and max dates as well as blocked dates. It also supports Sunday or Monday as the start of the week.

RHDP takes in the ISO 8601 extended date format, that's to say `YYYY-MM-DD` and outputs the same. This format allows for lexicographical sorting of dates, and removes any concerns or bugs that may arise from dealing with disparate local and server times.

Zero dependencies & purpose built.

## Props

All props are fully typed in Typescript. This small subset is provided here for quick reference. [View the full types](https://github.com/roypearce/rhdp/tree/main/dist/declarations).

| Property                     | Type                                          | Description                                                                                                 |
| ---------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `blockedDates`               | `string[] \| string`                          | YYYY-MM-DD format, prevents selection of specified dates                                                    |
| `focusOnInit`                | `boolean`                                     | Will cause focus to be set to the first of an array of dates or today                                       |
| `hasFocusTrap`               | `boolean`                                     | Will cause focus to be constrained to the datepicker and controls while the datepicker is open as a popover |
| `labels`                     | `object`                                      | Button labels for accessibility, English defaults provided                                                  |
| `labels.closeButton`         | `string`                                      |                                                                                                             |
| `labels.dateSelected`        | `string`                                      |                                                                                                             |
| `labels.nextMonthButton`     | `string`                                      |                                                                                                             |
| `labels.nextYearButton`      | `string`                                      |                                                                                                             |
| `labels.previousMonthButton` | `string`                                      |                                                                                                             |
| `labels.previousYearButton`  | `string`                                      |                                                                                                             |
| `labels.today`               | `string`                                      |                                                                                                             |
| `locale`                     | `Intl.DateTimeFormat`                         | Defaults to en-US, see Localization section for more details                                                |
| `maxDate`                    | `string`                                      | YYYY-MM-DD format, if set prevents selection & navigation past that date                                    |
| `minDate`                    | `string`                                      | YYYY-MM-DD format, if set prevents selection & navigation before that date                                  |
| `mode`                       | `'single' \| 'range' \| 'multiple' \| number` | Sets the selection mode for the datepicker, number is a max # of dates                                      |
| `onChange`                   | `function(string[] \| string)`                | Function called whenever the selected dates change (string in single mode, otherwise an array)              |
| `onClose`                    | `function()`                                  | Function which is executed when date selection criteria is satisfied                                        |
| `selectDates`                | `string[] \| string`                          | YYYY-MM-DD format, pre-selects the supplied dates                                                           |
| `weekStart`                  | `0 \| 1`                                      | Changes the start day of the week from Sunday to Monday                                                     |

## Returned props

All returned props are fully typed in Typescript. This small subset is provided here for quick reference. [View the full types](https://github.com/roypearce/rhdp/tree/main/dist/declarations).

| Property                         | Type                     | Description                                                                                  |
| -------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| `calendar`                       | `CalendarDay[][]`        | Represents the current month's calendar, see `CalendarDay` type for more details             |
| `displayDaysOfTheWeek`           | `DisplayDaysOfTheWeek[]` | Each day of the week, localized, available in full, short and narrow formats                 |
| `displayMonth`                   | `string`                 | Full month name, localized, of the displayed calendar month                                  |
| `displayYear`                    | `string`                 | 4 digit year of the displayed calendar month                                                 |
| `focusedDate`                    | `string`                 | The date which currently has focus                                                           |
| `getCalendarContainerProps`      | `function()`             | Getter to apply attributes, methods & props to the calendar container                        |
| `getCalendarDayContainerProps`   | `function()`             | Getter to apply attributes, methods & props to the calendar day container                    |
| `getCalendarWeekContainerProps`  | `function()`             | Getter to apply attributes, methods & props to the calendar week container                   |
| `getDayOfTheWeekProps`           | `function()`             | Getter to apply attributes, methods & props to the each day of the week                      |
| `getDaysOfTheWeekContainerProps` | `function()`             | Getter to apply attributes, methods & props to the days of the week container                |
| `getControlsContainerProps`      | `function()`             | Getter to apply attributes, methods & props to the controls container (prev/next month/year) |
| `getDatepickerContainerProps`    | `function()`             | Getter to apply attributes, methods & props to the datepicker container                      |
| `getDayButtonProps`              | `function()`             | Getter to apply attributes, methods & props to the buttons of each day in the calendar       |
| `getMonthYearContainerProps`     | `function()`             | Getter to apply attributes, methods & props to the month/year container                      |
| `getNextMonthButtonProps`        | `function()`             | Getter to apply attributes, methods & props to the next month button                         |
| `getNextYearButtonProps`         | `function()`             | Getter to apply attributes, methods & props to the next year button                          |
| `getOnCloseButtonProps`          | `function()`             | Getter to apply attributes, methods & props to the hide datepicker button                    |
| `getPreviousMonthButtonProps`    | `function()`             | Getter to apply attributes, methods & props to the previous month button                     |
| `getPreviousYearButtonProps`     | `function()`             | Getter to apply attributes, methods & props to the previous year button                      |
| `hoveredDate`                    | `string`                 | The date which is currently hovered                                                          |
| `id`                             | `string`                 | The id of the datepicker ]                                                                   |
| `setMonth`                       | `function(number)`       | Set the month of the year for the calendar in the datepicker, 1 based (1-12)                 |
| `setYear`                        | `function(number)`       | Set the 4 digit year for the calendar in the datepicker                                      |
| `today`                          | `string`                 | Today's date in YYYY-MM-DD format                                                            |

### CalendarDay type

| Property      | Type      | Description                                                        |
| ------------- | --------- | ------------------------------------------------------------------ |
| `blocked`     | `boolean` | Whether the day is blocked and should not be selectable            |
| `disabled`    | `boolean` | Whether the day is disabled and should not be selectable           |
| `displayText` | `string`  | The number displayed in each cell of the calendar grid             |
| `formatted`   | `string`  | The YYYY-MM-DD formatted string of the day                         |
| `hovered`     | `boolean` | Whether the day is hovered                                         |
| `index`       | `number`  | The day of the week index for this particular day (0-6)            |
| `inMonth`     | `boolean` | Whether the day is in the visible month                            |
| `inRange`     | `boolean` | Whether the day is in a selected range (mode: 'range')             |
| `rangeEnd`    | `boolean` | Whether the day is the end of the selected range (mode: 'range')   |
| `rangeStart`  | `boolean` | Whether the day is the start of the selected range (mode: 'range') |
| `selected`    | `boolean` | Whether the day is selected                                        |
| `today`       | `boolean` | Whether the day is today                                           |

## Popover

If the datepicker is going to be contained in a popover, `focusOnInit`, `hasFocusTrap` and `onClose` should be set in `useDatepicker` for proper operation. The button which shows/hides the datepicker should have `aria-haspopup={true}`. If an icon is used in the button instead of descriptive text, it should also have the `aria-label` attribute with an appropriate label. `aria-describedby` should contain the id of the element which contains the updated selected date if the value of the date needs to be announced when focus is on the open datepicker button.

## Localization

[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) is used to automatically localize the days of the week and the months of the year for display if the `locale` prop is passed [with a valid locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_locales). There are labels that can be passed in for various elements which are used by screen readers, and by default English values are supplied, but for other languages, the labels will need to be supplied by your localization system.

## Bundling

If your target project is bundled with Webpack, it should use Webpack 5 for proper support of modern `Class` syntax.

## Installation

- `yarn add rhdp` or `npm install --save rhdp`

## Examples

- [All defaults, no date pre-selected](https://codesandbox.io/s/rhdp-r4p0p)
- [Single date pre-selected](https://codesandbox.io/s/rhdp-single-date-selected-kb24f)
- [Range date pre-selected](https://codesandbox.io/s/rhdp-rang-date-selected-45vpz)
- [Multiple dates pre-selected](https://codesandbox.io/s/rhdp-multiple-dates-pre-selected-2dy4x)
- [Max multiple dates pre-selected](https://codesandbox.io/s/rhdp-max-multiple-dates-pre-selected-hkg8c)
- [Min date and max date set with single date pre-selected](https://codesandbox.io/s/rhdp-max-multiple-dates-pre-selected-forked-mep22)
- [Blocked dates with single date pre-selected](https://codesandbox.io/s/rhdp-blocked-dates-nv1ol)
- [Datepicker with button launcher](https://codesandbox.io/s/rhdp-datepicker-with-button-launcher-hojov)
- [Datepicker with editable input](https://codesandbox.io/s/rhdp-datepicker-with-editable-input-jwel6)

## Storybook

### yarn

```
git clone git@github.com:roypearce/rhdp.git
cd rhdp
yarn
yarn storybook
```

### npm

```
git clone git@github.com:roypearce/rhdp.git
cd rhdp
npm install
npm run storybook
```
