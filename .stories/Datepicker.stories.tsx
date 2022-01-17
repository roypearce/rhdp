import React, { useEffect, useState } from 'react';
import './components/datepicker.css';
import Datepicker from './components/Datepicker';
import { isDateValid } from '../src/util';
import { SelectedDates } from '../src/types';

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
        className="btn btn-primary"
        onClick={() => {
          setDatepickerVisible(!isDatepickerVisible);
        }}
        type="button"
      >
        {isDatepickerVisible ? 'Hide' : 'Show'} datepicker
      </button>

      {isDatepickerVisible && (
        <Datepicker
          focusOnInit={true}
          hasFocusTrap={true}
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

      <p className="mt-4">Currently selected date: {selectedDate}</p>
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

export const EditableInput = () => {
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
