import { ReactNode, useEffect, useRef, useState } from 'react';
import { DateSelectionMode, SelectedDates, WeekStart } from '../../src/types';
import { isDateValid } from '../../src/util';
import Datepicker from '../components/Datepicker';
import BrokenDatepicker from '../components/BrokenDatepicker';
import ChainDate, { TimePeriod } from '../../src/chain-date';
import React from 'react';

export default {
  title: 'Tests',
  component: Datepicker,
};

const labels = {
  closeButton: 'Close',
  dateSelected: 'Date selected',
  nextMonthButton: 'Next month',
  nextYearButton: 'Next year',
  previoumButton: 'Previous month',
  previoysYearButton: 'Previous year',
  today: 'Today',
};

const BaseTestingComponent = ({
  additionalControls,
  datepicker,
  datesSelected,
}: {
  additionalControls?: ReactNode;
  datepicker: ReactNode;
  datesSelected: SelectedDates | undefined;
}) => {
  return (
    <div>
      <button
        autoFocus={true}
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-focus-start"
        onClick={console.clear}
        style={{ marginBottom: '20px' }}
        type="button"
      >
        Focus Point
      </button>
      {datepicker}
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-focus-end"
        style={{ marginTop: '20px' }}
        type="button"
      >
        Focus Point
      </button>
      <div style={{ marginTop: '20px' }}>
        <b>Dates Selected</b>: <span data-testid="div-dates-selected">{`${datesSelected || ''}`}</span>
      </div>
      <div style={{ marginTop: '20px' }}>{additionalControls}</div>
    </div>
  );
};

export const BlockedDates = () => {
  const [blockedDates, setBlockedDates] = useState([
    '2020-11-09',
    '2021-10-02',
    '2021-10-08',
    '2021-10-09',
    '2021-10-14',
    '2021-10-15',
    '2021-10-20',
    '2021-10-21',
    '2021-10-26',
    '2021-10-27',
    '2021-11-01',
    '2021-11-02',
    '2021-11-07',
    '2021-11-08',
    '2021-11-21',
    '2021-11-22',
    '2021-11-23',
    '2021-11-24',
    '2021-11-25',
    '2021-11-26',
    '2021-11-27',
    '2021-11-28',
    '2021-11-29',
    '2021-11-30',
    '2021-12-01',
    '2021-12-02',
    '2021-12-03',
    '2021-12-04',
    '2021-12-05',
    '2021-12-06',
    '2021-12-07',
    '2021-12-08',
    '2021-12-09',
    '2021-12-10',
    '2021-12-11',
    '2021-12-20',
    '2021-12-21',
    '2021-12-22',
    '2021-12-23',
    '2021-12-24',
    '2021-12-25',
    '2021-12-26',
    '2021-12-28',
    '2021-12-29',
    '2021-12-30',
    '2021-12-31',
    '2022-01-01',
    '2022-01-02',
    '2022-01-03',
    '2022-01-05',
    '2022-01-06',
    '2022-01-07',
    '2022-01-08',
    '2022-01-09',
    '2022-01-10',
    '2022-01-11',
    '2022-01-13',
    '2022-01-14',
    '2022-01-15',
    '2022-01-16',
    '2022-01-17',
    '2022-01-18',
    '2022-01-19',
    '2022-01-21',
    '2022-01-22',
    '2022-01-23',
    '2022-01-24',
    '2022-01-25',
    '2022-01-26',
    '2022-01-27',
    '2022-01-29',
    '2022-01-30',
    '2022-01-31',
    '2022-02-01',
    '2022-02-02',
    '2022-02-03',
    '2022-02-04',
    '2022-02-06',
    '2022-02-07',
    '2022-02-08',
    '2022-02-09',
    '2022-02-10',
    '2022-02-11',
    '2022-02-12',
  ]);
  const initialDate = new ChainDate('2021-11-09');
  const sixWeeks = 42;
  const forwardDates = useRef<string[]>([]);
  const backDates = useRef<string[]>([]);

  useEffect(() => {
    for (let i = 1; i <= sixWeeks; i += 1) {
      console.log(i, initialDate.clone().add(i, TimePeriod.Day).format());
      forwardDates.current.push(initialDate.clone().add(i, TimePeriod.Day).format());
      backDates.current.push(
        initialDate
          .clone()
          .add(i * -1, TimePeriod.Day)
          .format(),
      );
    }
  }, []);

  const [selectDates, setSelectDates] = useState<SelectedDates>(initialDate.format());
  const [maxDate, setMaxDate] = useState<null | string>('2022-02-13');
  const [minDate, setMinDate] = useState<null | string>(null);
  const [mode, setMode] = useState<DateSelectionMode>('single');

  const additionalControls = (
    <>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-blocked-dates"
        onClick={() => setBlockedDates(['2021-11-10'])}
      >
        Set blockedDates to ['2021-11-10']
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-mode-multiple"
        onClick={() => {
          setMode('multiple');
        }}
      >
        Set mode to multiple
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-multiple-dates"
        onClick={() => {
          setSelectDates(['2020-11-12', '2021-11-13', '2022-11-11']);
        }}
      >
        Set selectedDates to ['2020-11-10','2021-11-10','2022-11-10'] Bug with this where it doesn't focus the first
        date when it sets the dates like this
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-max-date-to-null"
        onClick={() => {
          setMaxDate(null);
        }}
      >
        Set maxDate to null
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-min-date-to-date"
        onClick={() => {
          setMinDate('2021-09-01');
        }}
      >
        Set minDate to 2021-09-01
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-forward-dates-full"
        onClick={() => {
          console.log(forwardDates.current);
          setBlockedDates(forwardDates.current);
        }}
      >
        Set forward blocked dates to full 6 weeks
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-forward-dates-full-minus-one"
        onClick={() => {
          const blockedDates = [...forwardDates.current];
          blockedDates.length = sixWeeks - 1;
          setBlockedDates(blockedDates);
        }}
      >
        Set forward blocked dates to 5 weeks 6 days
      </button>
    </>
  );

  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          blockedDates={blockedDates}
          labels={labels}
          maxDate={maxDate}
          minDate={minDate}
          mode={mode}
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const LimitedMultipleDatePreselected = () => {
  const selectDates = ['2021-11-01', '2021-11-10', '2021-11-15'];
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      datepicker={
        <Datepicker
          labels={labels}
          mode={3}
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const LocalePreselected = () => {
  const [locale, setLocale] = useState('en-US');

  const additionalControls = (
    <>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-locale-fr-fr"
        onClick={() => setLocale('fr-FR')}
      >
        Switch to French
      </button>
    </>
  );

  const selectDates = '2021-11-08';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          locale={locale}
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const MaxDate = () => {
  const [maxDate, setMaxDate] = useState('2021-11-28');

  const additionalControls = (
    <>
    <button
      className="btn btn-primary mr-1 my-1"
      data-testid="btn-set-max-date-2021-12-01"
      onClick={() => setMaxDate('2021-12-01')}
    >
      Set maxDate to 2021-12-01
    </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-max-date-2022-01-08"
        onClick={() => setMaxDate('2022-01-08')}
      >
        Set maxDate to 2022-01-08
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-max-date-2024-01-08"
        onClick={() => setMaxDate('2024-01-08')}
      >
        Set maxDate to 2024-01-08
      </button>
    </>
  );

  const selectDates = '2021-11-08';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          maxDate={maxDate}
          labels={labels}
          mode="single"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const MinDate = () => {
  const [minDate, setMinDate] = useState('2021-11-07');

  const additionalControls = (
    <>
    <button
      className="btn btn-primary mr-1 my-1"
      data-testid="btn-set-min-date-2021-11-01"
      onClick={() => setMinDate('2021-11-01')}
    >
      Set minDate to 2021-11-01
    </button>
    <button
      className="btn btn-primary mr-1 my-1"
      data-testid="btn-set-min-date-2021-11-30"
      onClick={() => setMinDate('2021-11-30')}
    >
      Set minDate to 2021-11-30
    </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-min-date-2021-08-08"
        onClick={() => setMinDate('2021-08-08')}
      >
        Set minDate to 2021-08-08
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-min-date-2019-08-08"
        onClick={() => setMinDate('2019-08-08')}
      >
        Set minDate to 2019-08-08
      </button>
    </>
  );

  const selectDates = '2021-11-08';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          minDate={minDate}
          labels={labels}
          mode="single"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const MinMaxDate = () => {
  const selectDates = '2021-11-08';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      datepicker={
        <Datepicker
          maxDate="2021-11-28"
          minDate="2021-11-07"
          labels={labels}
          mode="single"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const MultipleDatePreselected = () => {
  const selectDates = ['2021-11-01', '2021-11-10', '2021-11-15', '2021-11-25'];
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      datepicker={
        <Datepicker
          labels={labels}
          mode="multiple"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const NoDateSelected = () => {
  const [mode, setMode] = useState<DateSelectionMode>('single');
  const [selectDates, setSelectDates] = useState<SelectedDates>(null);

  const additionalControls = (
    <>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-mode-single" onClick={() => setMode('single')}>
        Set mode to single
      </button>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-mode-range" onClick={() => setMode('range')}>
        Set mode to range
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-mode-multiple"
        onClick={() => setMode('multiple')}
      >
        Set mode to multiple
      </button>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-mode-max-3" onClick={() => setMode(3)}>
        Set mode to multiple, max of 3
      </button>
      <br />
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-null"
        onClick={() => setSelectDates(null)}
      >
        Set selectDates to null
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-string"
        onClick={() => setSelectDates('2021-11-29')}
      >
        Set selectDates to '2021-11-29'
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-range"
        onClick={() => setSelectDates(['2021-11-20', '2021-11-26'])}
      >
        Set selectDates to ['2021-11-20', '2021-11-26']
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-multiple"
        onClick={() => setSelectDates(['2021-11-10', '2021-11-20', '2021-11-30'])}
      >
        Set selectDates to ['2021-11-10', '2021-11-20', '2021-11-30']
      </button>
    </>
  );

  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          labels={labels}
          mode={mode}
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const RangeDatePreselected = () => {
  const selectDates = ['2021-11-01', '2021-11-10'];
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      datepicker={
        <Datepicker
          labels={labels}
          mode="range"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const SingleDatePreselected = () => {
  const [mode, setMode] = useState<DateSelectionMode>('single');
  const [selectDates, setSelectDates] = useState<SelectedDates>('2021-11-08');
  const datepickerMethods = useRef<{ setMonth(month: number): void; setYear(year: number): void }>();
  const additionalControls = (
    <>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-mode-single" onClick={() => setMode('single')}>
        Set mode to single
      </button>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-mode-range" onClick={() => setMode('range')}>
        Set mode to range
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-mode-multiple"
        onClick={() => setMode('multiple')}
      >
        Set mode to multiple
      </button>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-mode-max-3" onClick={() => setMode(3)}>
        Set mode to multiple, max of 3
      </button>
      <br />
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-null"
        onClick={() => setSelectDates(null)}
      >
        Set selectDates to null
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-string"
        onClick={() => setSelectDates('2021-11-29')}
      >
        Set selectDates to '2021-11-29'
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-range"
        onClick={() => setSelectDates(['2021-11-20', '2021-11-26'])}
      >
        Set selectDates to ['2021-11-20', '2021-11-26']
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-multiple"
        onClick={() => setSelectDates(['2021-11-10', '2021-11-20', '2021-11-30'])}
      >
        Set selectDates to ['2021-11-10', '2021-11-20', '2021-11-30']
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-many-multiple"
        onClick={() =>
          setSelectDates([
            '2021-11-10',
            '2021-11-11',
            '2021-11-12',
            '2021-11-13',
            '2021-11-14',
            '2021-11-15',
            '2021-11-16',
            '2021-11-17',
            '2021-11-18',
            '2021-11-19',
          ])
        }
      >
        Set selectDates to ['2021-11-10', '2021-11-11', '2021-11-12', '2021-11-13', '2021-11-14', '2021-11-15',
        '2021-11-16', '2021-11-17', '2021-11-18', '2021-11-19']
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-invalid"
        onClick={() => setSelectDates('2o2l-ll-lo')}
      >
        Set selectDates to 2o2l-ll-lo
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-select-dates-multiple-with-invalid"
        onClick={() => setSelectDates(['2o2l-ll-lo', '2021-11-10', '2021-11-11', '2021-11-12'])}
      >
        Set selectDates to ['2o2l-ll-lo','2021-11-10', '2021-11-11', '2021-11-12']
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-month-february"
        onClick={() => datepickerMethods.current?.setMonth(2)}
      >
        Set Month to February
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-year-2024"
        onClick={() => datepickerMethods.current?.setYear(2024)}
      >
        Set Year to 2024
      </button>
    </>
  );

  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          datepickerMethods={datepickerMethods}
          labels={labels}
          mode={mode}
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const WeekStartOne = () => {
  const selectDates = '2021-11-08';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      datepicker={
        <Datepicker
          labels={labels}
          mode="single"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
          weekStart={1}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const WeekStartPreselected = () => {
  const [weekStart, setWeekStart] = useState<WeekStart>(0);

  const additionalControls = (
    <>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-week-start-0" onClick={() => setWeekStart(0)}>
        Switch to Sunday
      </button>
      <button className="btn btn-primary mr-1 my-1" data-testid="btn-set-week-start-1" onClick={() => setWeekStart(1)}>
        Switch to Monday
      </button>
    </>
  );

  const selectDates = '2021-11-08';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          labels={labels}
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
          weekStart={weekStart}
        />
      }
      datesSelected={datesSelected}
    />
  );
};

export const ShowHide = () => {
  const [isSingleDatepickerVisible, setSingleDatepickerVisible] = useState(false);
  const [isRangeDatepickerVisible, setRangeDatepickerVisible] = useState(false);
  const [isMultipleDatepickerVisible, setMultipleDatepickerVisible] = useState(false);
  const [isMultipleMaxDatepickerVisible, setMultipleMaxDatepickerVisible] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button
          autoFocus={true}
          className="btn btn-primary mr-1 my-1"
          data-testid="btn-show-hide-single"
          onClick={() => {
            setSingleDatepickerVisible(!isSingleDatepickerVisible);
          }}
          type="button"
        >
          {isSingleDatepickerVisible ? 'Hide' : 'Show'} single datepicker
        </button>

        {isSingleDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            hasFocusTrap={true}
            onClose={() => setSingleDatepickerVisible(false)}
            labels={labels}
            mode="single"
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
          />
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button
          className="btn btn-primary mr-1 my-1"
          data-testid="btn-show-hide-range"
          onClick={() => {
            setRangeDatepickerVisible(!isRangeDatepickerVisible);
          }}
          type="button"
        >
          {isRangeDatepickerVisible ? 'Hide' : 'Show'} range datepicker
        </button>

        {isRangeDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            hasFocusTrap={true}
            onClose={() => setRangeDatepickerVisible(false)}
            labels={labels}
            mode="range"
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
          />
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button
          className="btn btn-primary mr-1 my-1"
          data-testid="btn-show-hide-multiple"
          onClick={() => {
            setMultipleDatepickerVisible(!isMultipleDatepickerVisible);
          }}
          type="button"
        >
          {isMultipleDatepickerVisible ? 'Hide' : 'Show'} multiple datepicker
        </button>

        {isMultipleDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            hasFocusTrap={true}
            onClose={() => setMultipleDatepickerVisible(false)}
            labels={labels}
            mode="multiple"
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
          />
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button
          className="btn btn-primary mr-1 my-1"
          data-testid="btn-show-hide-multiple-max"
          onClick={() => {
            setMultipleMaxDatepickerVisible(!isMultipleMaxDatepickerVisible);
          }}
          type="button"
        >
          {isMultipleMaxDatepickerVisible ? 'Hide' : 'Show'} multiple max datepicker
        </button>

        {isMultipleMaxDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            hasFocusTrap={true}
            onClose={() => setMultipleMaxDatepickerVisible(false)}
            labels={labels}
            mode={4}
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
          />
        )}
      </div>
    </div>
  );
};

const convertUSDateToISO = (date) => {
  const [month, day, year] = date?.split('/');
  if (year && month && day) {
    return `${year}-${month}-${day}`;
  }
  return null;
};

export const Input = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDates>();
  const [displayDate, setDisplayDate] = useState<string>('');
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);
  const [invalid, setInvalid] = useState(true);

  useEffect(() => {
    const isoDate = convertUSDateToISO(displayDate);
    const target = document.getElementById('datepicker-input');
    const isValid = isDateValid(isoDate);
    setInvalid(!isValid);
    if (isValid) {
      setSelectedDate(isoDate);
      (target as HTMLInputElement)?.setCustomValidity('');
    } else {
      (target as HTMLInputElement)?.setCustomValidity('error');
    }
    (target as HTMLInputElement)?.checkValidity();
  }, [displayDate]);

  useEffect(() => {
    setDisplayDate('02/02/2022');
  }, []);

  return (
    <div className="App m-4">
      <div className="form-group position-relative" style={{ maxWidth: '220px' }}>
        <label htmlFor="datepicker-input">Select a date (mm/dd/yyyy format)</label>
        <div className="input-group was-validated">
          <input
            {...(invalid && { 'aria-describedby': 'invalid-date-format' })}
            aria-invalid={invalid}
            className="form-control"
            id="datepicker-input"
            onChange={(evt) => {
              setDisplayDate(evt.target.value);
            }}
            placeholder="mm/dd/yyyy"
            type="text"
            value={displayDate}
          />
          <div className="input-group-append">
            <button
              aria-describedby="datepicker-input"
              aria-haspopup={true}
              aria-label="Open datepicker"
              className="btn btn-primary input-group-text"
              data-testid="btn-open-datepicker"
              onClick={() => setIsDatepickerOpen(!isDatepickerOpen)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-calendar3"
                viewBox="0 0 16 16"
              >
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>
          </div>
        </div>
        {invalid && (
          <div id="invalid-date-format" role="alert">
            Date should be in mm/dd/yyyy format
          </div>
        )}

        {isDatepickerOpen && (
          <Datepicker
            focusOnInit={true}
            hasFocusTrap={true}
            onChange={(newDate) => {
              const [year, month, day] = (newDate as string).match(/\d+/g) || ['', '', ''];
              setDisplayDate(`${month}/${day}/${year}`);
              setSelectedDate(newDate);
            }}
            onClose={() => setIsDatepickerOpen(false)}
            selectDates={selectedDate as SelectedDates}
          />
        )}
      </div>
    </div>
  );
};

export const BrokenMinMaxDate = () => {
  const [selectDates, setSelectDates] = useState('2021-11-08');
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  const additionalControls = (
    <>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-date-before-min"
        onClick={() => setSelectDates('2021-11-01')}
      >
        Set date to 2021-11-01
      </button>
      <button
        className="btn btn-primary mr-1 my-1"
        data-testid="btn-set-date-after-max"
        onClick={() => setSelectDates('2021-11-30')}
      >
        Set date to 2021-11-30
      </button>
    </>
  );

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <BrokenDatepicker
          maxDate="2021-11-28"
          minDate="2021-11-07"
          labels={labels}
          mode="single"
          onChange={(newDates) => {
            console.log('Got new dates', newDates);
            setDatesSelected(newDates);
          }}
          selectDates={selectDates}
        />
      }
      datesSelected={datesSelected}
    />
  );
};
