# RHDP - React Hook Datepicker

A React Hook based primitive to build simple, flexible datepicker components that are WAI-ARIA compliant, and support localization.

<img src="https://img.badgesize.io/roypearce/rhdp/main/dist/module.js.svg?compression=brotli&label=module size (brotli)"/>
<img src="https://img.badgesize.io/roypearce/rhdp/main/dist/module.js.svg?compression=gzip&label=module size (gzip)"/>
<img src="https://img.badgesize.io/roypearce/rhdp/main/dist/module.js.svg?label=module size (uncompressed)"/>

## The Problem

You need a datepicker that can be fully customized in appearance, but it needs to be accessible, and flexible enough to meet your needs. It should work with any design system, including one built in-house, and have zero dependencies (besides React of course). It should also meet accessibility specs for screenreaders, as well as keyboard accessibility. It should also only concern itself with dates, a datepicker should not concern itself with time, or timezones.

## The Solution

RHDP offers a single react hook called `useDatepicker`. It provides functions and properties to populate your own React based datepicker component. It is fully typed with Typescript and backed by interaction and unit tests. You can lift and shift any of the existing datepicker components built with RHDP in the examples and adapt them to your needs.

Use your own design system or one of the many publicly available design systems to easily match the datepicker with the look for your site. Just provide css classes for the applicable styles for them to be applied at the component level.

This React Hook Datepicker allows several modes of operation: single select, range select, multi-select, and max multi-select. Selectable dates can be limited by min and max dates as well as blocked dates. It also supports Sunday or Monday as the start of the week.

RHDP takes in the ISO 8601 extended date format, that's to say `YYYY-MM-DD` and outputs the same. This format allows for lexicographical sorting of dates, and removes any concerns or bugs that may arise from dealing with disparate local and server times.

Zero dependencies & purpose built.

## Props

All props are fully typed in Typescript. 

| property                     | type                                       | description                                                                |
| ---------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `blockedDates`               | `string[] \| string`                       | YYYY-MM-DD format, prevents selection of specified dates                   |
| `focusOnInit`                | `boolean`                                  | Will cause focus to be set to the first of an array of dates or today      |
| `hideDatepicker`             | `function()`                               | Function which is executed when date selection criteria is satisfied       |
| `labels`                     | `object`                                   | Button labels for accessibility, English defaults provided                 |
| `labels.closeButton`         | `string`                                   |                                                                            |
| `labels.dateSelected`        | `string`                                   |                                                                            |
| `labels.nextMonthButton`     | `string`                                   |                                                                            |
| `labels.nextYearButton`      | `string`                                   |                                                                            |
| `labels.previousMonthButton` | `string`                                   |                                                                            |
| `labels.previousYearButton`  | `string`                                   |                                                                            |
| `labels.today`               | `string`                                   |                                                                            |
| `locale`                     | `Intl.DateTimeFormat`                      | Defaults to en-US, see Localization section for more details               |
| `maxDate`                    | `string`                                   | YYYY-MM-DD format, if set prevents selection & navigation past that date   |
| `minDate`                    | `string`                                   | YYYY-MM-DD format, if set prevents selection & navigation before that date |
| `mode`                       | `'single' \| 'range' \| 'multiple' \| number` | Sets the selection mode for the datepicker, number is a max # of dates  |
| `selectDates`                | `string[] \| string`                       | YYYY-MM-DD format, pre-selects the supplied dates                          |
| `onChange`                   | `function(string[] \| string)`             | Function called whenever the selected dates change                         |
| `weekStart`                  | `0 \| 1`                                   | Changes the start day of the week from Sunday to Monday                    |

## Localization

[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) is used to automatically localize the days of the week and the months of the year for display if the `locale` prop is passed [with a valid locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_locales). There are labels that can be passed in for various elements which are used by screen readers, and by default English values are supplied, but for other languages, the labels will need to be supplied by your localization system.

## Installation

- `yarn add rhdp` or `npm install --save rhdp`

## Examples

- [All defaults, no date pre-selected](https://codesandbox.io/s/rhdp-r4p0p)
- [Single date pre-selected](https://codesandbox.io/s/rhdp-single-date-selected-kb24f)

## Storybook
### yarn
```
git clone git@github.com:roypearce/rhdp.git
cd rhdp
yarn install
yarn run storybook
```
### npm
```
git clone git@github.com:roypearce/rhdp.git
cd rhdp
npm install
npm run storybook
```
