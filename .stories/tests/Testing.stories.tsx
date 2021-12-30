import { ReactNode, useRef, useState } from 'react';
import { DateSelectionMode, SelectedDates, WeekStart } from '../../src/types';
import Datepicker from '../components/Datepicker';

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
        data-testid="btn-focus-start"
        onClick={console.clear}
        style={{ marginBottom: '20px' }}
        type="button"
      >
        Focus Point
      </button>
      {datepicker}
      <button data-testid="btn-focus-end" style={{ marginTop: '20px' }} type="button">
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

  const additionalControls = (
    <>
      <button data-testid="btn-set-blocked-dates" onClick={() => setBlockedDates(['2021-11-10'])}>
        Set blockedDates to ['2021-11-10']
      </button>
    </>
  );

  const selectDates = '2021-11-09';
  const [datesSelected, setDatesSelected] = useState<SelectedDates>(selectDates);

  return (
    <BaseTestingComponent
      additionalControls={additionalControls}
      datepicker={
        <Datepicker
          blockedDates={blockedDates}
          labels={labels}
          maxDate="2022-02-13"
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
      <button data-testid="btn-set-locale-fr-fr" onClick={() => setLocale('fr-FR')}>
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
      <button data-testid="btn-set-max-date-2022-01-08" onClick={() => setMaxDate('2022-01-08')}>
        Set maxDate to 2022-01-08
      </button>
      <button data-testid="btn-set-max-date-2024-01-08" onClick={() => setMaxDate('2024-01-08')}>
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
      <button data-testid="btn-set-min-date-2021-08-08" onClick={() => setMinDate('2021-08-08')}>
        Set minDate to 2021-08-08
      </button>
      <button data-testid="btn-set-min-date-2019-08-08" onClick={() => setMinDate('2019-08-08')}>
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
  const selectDates = ['2021-11-01', '2021-11-10', '2021-11-15', , '2021-11-25'];
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
      <button data-testid="btn-set-mode-single" onClick={() => setMode('single')}>
        Set mode to single
      </button>
      <button data-testid="btn-set-mode-range" onClick={() => setMode('range')}>
        Set mode to range
      </button>
      <button data-testid="btn-set-mode-multiple" onClick={() => setMode('multiple')}>
        Set mode to multiple
      </button>
      <button data-testid="btn-set-mode-max-3" onClick={() => setMode(3)}>
        Set mode to multiple, max of 3
      </button>
      <br />
      <button data-testid="btn-set-select-dates-null" onClick={() => setSelectDates(null)}>
        Set selectDates to null
      </button>
      <button data-testid="btn-set-select-dates-string" onClick={() => setSelectDates('2021-11-29')}>
        Set selectDates to '2021-11-29'
      </button>
      <button data-testid="btn-set-select-dates-range" onClick={() => setSelectDates(['2021-11-20', '2021-11-26'])}>
        Set selectDates to ['2021-11-20', '2021-11-26']
      </button>
      <button
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
      <button data-testid="btn-set-mode-single" onClick={() => setMode('single')}>
        Set mode to single
      </button>
      <button data-testid="btn-set-mode-range" onClick={() => setMode('range')}>
        Set mode to range
      </button>
      <button data-testid="btn-set-mode-multiple" onClick={() => setMode('multiple')}>
        Set mode to multiple
      </button>
      <button data-testid="btn-set-mode-max-3" onClick={() => setMode(3)}>
        Set mode to multiple, max of 3
      </button>
      <br />
      <button data-testid="btn-set-select-dates-null" onClick={() => setSelectDates(null)}>
        Set selectDates to null
      </button>
      <button data-testid="btn-set-select-dates-string" onClick={() => setSelectDates('2021-11-29')}>
        Set selectDates to '2021-11-29'
      </button>
      <button data-testid="btn-set-select-dates-range" onClick={() => setSelectDates(['2021-11-20', '2021-11-26'])}>
        Set selectDates to ['2021-11-20', '2021-11-26']
      </button>
      <button
        data-testid="btn-set-select-dates-multiple"
        onClick={() => setSelectDates(['2021-11-10', '2021-11-20', '2021-11-30'])}
      >
        Set selectDates to ['2021-11-10', '2021-11-20', '2021-11-30']
      </button>
      <button
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
      <button data-testid="btn-set-select-dates-invalid" onClick={() => setSelectDates('2o2l-ll-lo')}>
        Set selectDates to 2o2l-ll-lo
      </button>
      <button
        data-testid="btn-set-select-dates-multiple-with-invalid"
        onClick={() => setSelectDates(['2o2l-ll-lo', '2021-11-10', '2021-11-11', '2021-11-12'])}
      >
        Set selectDates to ['2o2l-ll-lo','2021-11-10', '2021-11-11', '2021-11-12']
      </button>
      <button data-testid="btn-set-month-february" onClick={() => datepickerMethods.current.setMonth(2)}>
        Set Month to February
      </button>
      <button data-testid="btn-set-year-2024" onClick={() => datepickerMethods.current.setYear(2024)}>
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
      <button data-testid="btn-set-week-start-0" onClick={() => setWeekStart(0)}>
        Switch to Sunday
      </button>
      <button data-testid="btn-set-week-start-1" onClick={() => setWeekStart(1)}>
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
      <div>
        <button
          autoFocus={true}
          data-testid="btn-show-hide-single"
          onClick={() => {
            setSingleDatepickerVisible(!isSingleDatepickerVisible);
          }}
          style={{ marginBottom: '20px' }}
          type="button"
        >
          {isSingleDatepickerVisible ? 'Hide' : 'Show'} single datepicker
        </button>

        {isSingleDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            onClose={() => setSingleDatepickerVisible(false)}
            labels={labels}
            mode="single"
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
            selectDates="2021-11-08"
          />
        )}
      </div>
      <div>
        <button
          data-testid="btn-show-hide-range"
          onClick={() => {
            setRangeDatepickerVisible(!isRangeDatepickerVisible);
          }}
          style={{ marginBottom: '20px' }}
          type="button"
        >
          {isRangeDatepickerVisible ? 'Hide' : 'Show'} range datepicker
        </button>

        {isRangeDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            onClose={() => setRangeDatepickerVisible(false)}
            labels={labels}
            mode="range"
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
          />
        )}
      </div>
      <div>
        <button
          data-testid="btn-show-hide-multiple"
          onClick={() => {
            setMultipleDatepickerVisible(!isMultipleDatepickerVisible);
          }}
          style={{ marginBottom: '20px' }}
          type="button"
        >
          {isMultipleDatepickerVisible ? 'Hide' : 'Show'} multiple datepicker
        </button>

        {isMultipleDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
            onClose={() => setMultipleDatepickerVisible(false)}
            labels={labels}
            mode="multiple"
            onChange={(newDate) => {
              console.log('Got a new date', newDate);
            }}
          />
        )}
      </div>
      <div>
        <button
          data-testid="btn-show-hide-multiple-max"
          onClick={() => {
            setMultipleMaxDatepickerVisible(!isMultipleMaxDatepickerVisible);
          }}
          style={{ marginBottom: '20px' }}
          type="button"
        >
          {isMultipleMaxDatepickerVisible ? 'Hide' : 'Show'} multiple max datepicker
        </button>

        {isMultipleMaxDatepickerVisible && (
          <Datepicker
            focusOnInit={true}
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

export const Input = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDates>('2021-11-08');
  const [displayDate, setDisplayDate] = useState<string>();
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  return (
    <div>
      <label htmlFor="datepicker-input">Select a date</label>
      <br />
      <input
        defaultValue={displayDate}
        id="datepicker-input"
        onChange={(evt) => {
          const [month, day, year] = evt.target.value.match(/\d+/g) || ['', '', ''];
          setDisplayDate(evt.target.value);
          setSelectedDate(`${year}-${month}-${day}`);
        }}
        placeholder="mm/dd/yyyy"
        type="text"
      />

      <button data-testid="btn-datepicker-icon" onClick={() => setIsDatepickerOpen(!isDatepickerOpen)} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-calendar"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
        </svg>
      </button>

      {isDatepickerOpen && (
        <Datepicker
          focusOnInit={true}
          onChange={(newDate) => {
            const [year, month, day] = (newDate as string).match(/\d+/g) || ['', '', ''];
            if (year && month && day) {
              setDisplayDate(`${month}/${day}/${year}`);
            }
            setSelectedDate(newDate);
          }}
          onClose={() => setIsDatepickerOpen(false)}
          selectDates={selectedDate as SelectedDates}
        />
      )}
    </div>
  );
};
