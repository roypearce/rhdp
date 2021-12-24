import React, { useState } from 'react';
import './components/datepicker.css';
import Datepicker from './components/Datepicker';
import { isDateValid } from '../src/util';

export default {
  title: 'RHDP Examples',
  component: Datepicker,
};

const labels = {
  closeButton: 'Close',
  dateSelected: 'Date selected',
  disabled: 'Disabled',
  nextMonth: 'Next month',
  nextYear: 'Next year',
  previousMonth: 'Previous month',
  previousYear: 'Previous year',
  today: 'Today',
};

export const AllOptions = () => {
  return (
    <>
      <p style={{ marginBottom: '20px' }}>
        Combines blocked dates, a non-English locale, min date, max date, max 3 dates selectable, pre-selecting a date
        and starting the week on Monday.
      </p>
      <Datepicker
        blockedDates={['2021-10-06', '2021-10-10']}
        labels={labels}
        locale="fr-FR"
        maxDate="2021-10-28"
        minDate="2021-10-04"
        mode={3}
        onChange={(newDate) => {
          console.log('Got a new date', newDate);
        }}
        selectDates="2021-10-08"
        weekStart={1}
      />
    </>
  );
};

export const SingleDateSet = () => {
  return (
    <Datepicker
      labels={labels}
      mode="single"
      onChange={(newDate) => {
        console.log('Got a new date', newDate);
      }}
      selectDates="2021-11-08"
    />
  );
};

export const SingleDateUnset = () => {
  return (
    <Datepicker
      labels={labels}
      mode="single"
      onChange={(newDate) => {
        console.log('Got a new date', newDate);
      }}
    />
  );
};

export const RangePreSelected = () => {
  return (
    <Datepicker
      labels={labels}
      mode="range"
      onChange={(newDates) => {
        console.log('Got a new range', newDates);
      }}
      selectDates={['2021-10-08', '2021-11-08']}
    />
  );
};

export const MultiplePreSelected = () => {
  return (
    <Datepicker
      labels={labels}
      mode="multiple"
      onChange={(newDates) => {
        console.log('Got a new multiple selection', newDates);
      }}
      selectDates={['2021-10-08', '2021-10-10', '2021-10-11', '2021-11-03', '2021-11-08', '2021-12-01', '2022-01-03']}
    />
  );
};

export const MultipleLimitedPreSelected = () => {
  return (
    <Datepicker
      labels={labels}
      mode={4}
      onChange={(newDates) => {
        console.log('Got a new multiple (limited) selection', newDates);
      }}
      selectDates={[
        '2021-10-08',
        '2021-10-10',
        '2021-10-11',
        '2021-10-12',
        '2021-10-13',
        '2021-11-03',
        '2021-11-08',
        '2021-12-01',
        '2022-01-03',
      ]}
    />
  );
};

export const ShowHide = () => {
  const [isDatepickerVisible, setDatepickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2021-11-08');
  return (
    <div>
      <button
        autoFocus={true}
        onClick={() => {
          setDatepickerVisible(!isDatepickerVisible);
        }}
        style={{ marginBottom: '8px' }}
        type="button"
      >
        {isDatepickerVisible ? 'Hide' : 'Show'} datepicker
      </button>
      <p style={{ marginBottom: '28px' }}>Currently selected date: {selectedDate}</p>

      {isDatepickerVisible && (
        <Datepicker
          focusOnInit={true}
          onClose={() => setDatepickerVisible(false)}
          labels={labels}
          mode="single"
          onChange={(newDate) => {
            console.log('Got a new date', newDate);
            setSelectedDate(newDate as string);
          }}
          selectDates={selectedDate}
        />
      )}
    </div>
  );
};

export const EditableInput = () => {
  const [selectedDate, setSelectedDate] = useState('2021-11-08');
  const [typedDate, setTypedDate] = useState('2021-11-08');
  const [isTypedDateValid, setIsTypedDateValid] = useState(true);
  return (
    <div>
      <label htmlFor="date-input" style={{ display: 'block', fontWeight: 'bold' }}>
        Enter a valid date in YYYY-MM-DD format
      </label>
      <input
        autoComplete="false"
        className="date-input"
        id="date-input"
        onChange={(evt) => {
          setTypedDate(evt.target.value);
          if (isDateValid(evt.target.value)) {
            console.log('Setting selected date to ', evt.target.value);
            setSelectedDate(evt.target.value);
            setIsTypedDateValid(true);
          } else {
            setIsTypedDateValid(false);
          }
        }}
        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
        type="text"
        value={typedDate}
      />
      {!isTypedDateValid && <div>The typed date is not valid</div>}
      <div style={{ marginTop: '20px' }}>
        <Datepicker
          labels={labels}
          mode="single"
          onChange={(newDate) => {
            console.log('Got a new date', newDate);
            setSelectedDate(newDate as string);
            setTypedDate(newDate as string);
          }}
          selectDates={selectedDate}
        />
      </div>
    </div>
  );
};
