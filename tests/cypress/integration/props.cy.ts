describe('selectDates prop values', () => {
  it('should only allow the first date to be added to mode single', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-select-dates-multiple').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10');
  });

  it('should only allow a valid date to be added to mode single', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-select-dates-invalid').click();
    cy.getId('div-dates-selected').should('have.text', '');
  });

  it('should only allow valid dates to be added to mode multiple', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-mode-multiple').click();
    cy.getId('btn-set-select-dates-multiple-with-invalid').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10,2021-11-11,2021-11-12');
  });

  it('should only allow the first two dates to be added to mode range', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-mode-range').click();
    cy.getId('btn-set-select-dates-many-multiple').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10,2021-11-11');
  });

  it('should only allow the first three dates to be added to mode max multiple, set to 3', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-mode-max-3').click();
    cy.getId('btn-set-select-dates-many-multiple').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10,2021-11-11,2021-11-12');
  });

  it('should support adding only one date to a range if only one date is supplied', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-mode-range').click();
    cy.getId('btn-set-select-dates-string').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-29');
  });

  it('should only keep last selection permitted from selectDates if mode is changed', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-set-select-dates-multiple').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10');
    cy.getId('btn-set-mode-range').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10');
    cy.getId('btn-set-mode-max-3').click();
    cy.getId('div-dates-selected').should('have.text', '2021-11-10');
  });

  it('should not change the month/year if selectDates is changed and all dates are invalid because they are before minDate', () => {
    cy.visitStory('tests--broken-min-max-date');
    cy.getId('div-month-year-title').should('contain', 'November 2021');
    cy.getId('btn-day-2021-11-08').should('have.attr', 'aria-pressed', 'true');
    cy.getId('btn-set-date-before-min').click();
    cy.getId('div-month-year-title').should('contain', 'November 2021');
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-day-2021-11-08').should('have.focus').should('have.attr', 'aria-pressed', 'false');
  });

  it('should not change the month/year if selectDates is changed and all dates are invalid because they are after maxDate', () => {
    cy.visitStory('tests--broken-min-max-date');
    cy.getId('div-month-year-title').should('contain', 'November 2021');
    cy.getId('btn-day-2021-11-08').should('have.attr', 'aria-pressed', 'true');
    cy.getId('btn-set-date-after-max').click();
    cy.getId('div-month-year-title').should('contain', 'November 2021');
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-day-2021-11-08').should('have.focus').should('have.attr', 'aria-pressed', 'false');
  });
});

describe('selectDates prop modified after initial render', () => {
  describe('selectDates modifed to string', () => {
    it('should allow the select dates to be modified to a string', () => {
      cy.visitStory('tests--no-date-selected');
      cy.getId('div-dates-selected').should('have.text', '');
      cy.getId('btn-set-select-dates-string').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-29');

      // should allow the select dates to be modified back to null
      cy.getId('btn-set-select-dates-null').click();
      cy.getId('div-dates-selected').should('have.text', '');
    });
  });

  describe('selectDates modifed to range', () => {
    it('should allow the select dates to be modified to a range', () => {
      cy.visitStory('tests--no-date-selected');
      cy.getId('div-dates-selected').should('have.text', '');
      cy.getId('btn-set-mode-range').click();
      cy.getId('btn-set-select-dates-range').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-20,2021-11-26');

      // should let a new range of dates be selected when a current range already exists
      cy.getId('btn-day-2021-11-10').click();
      cy.getId('btn-day-2021-11-11').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-10,2021-11-11');

      // should allow the select dates to be modified back to null
      cy.getId('btn-set-select-dates-null').click();
      cy.getId('div-dates-selected').should('have.text', '');
    });
  });

  describe('selectDates modifed to multiple', () => {
    it('should allow the select dates to be modified to a multiple', () => {
      cy.visitStory('tests--no-date-selected');
      cy.getId('div-dates-selected').should('have.text', '');
      cy.getId('btn-set-mode-multiple').click();
      cy.getId('btn-set-select-dates-multiple').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-10,2021-11-20,2021-11-30');

      // should allow the select dates to be modified back to null
      cy.getId('btn-set-select-dates-null').click();
      cy.getId('div-dates-selected').should('have.text', '');
    });
  });

  describe('selectDates modifed to max multiple', () => {
    it('should allow the select dates to be modified to a max multiple', () => {
      cy.visitStory('tests--no-date-selected');
      cy.getId('div-dates-selected').should('have.text', '');
      cy.getId('btn-set-mode-max-3').click();
      cy.getId('btn-set-select-dates-multiple').click();
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('div-dates-selected').should('have.text', '2021-11-10,2021-11-20,2021-11-30');

      // should allow the select dates to be modified back to null
      cy.getId('btn-set-select-dates-null').click();
      cy.getId('div-dates-selected').should('have.text', '');
    });
  });
});

describe('blockedDates prop modified after initial render', () => {
  it('should allow the blocked dates to be modified', () => {
    cy.visitStory('tests--blocked-dates');
    cy.getId('btn-day-2021-11-01').should('be.disabled');
    cy.getId('btn-day-2021-11-02').should('be.disabled');
    cy.getId('btn-day-2021-11-07').should('be.disabled');
    cy.getId('btn-day-2021-11-08').should('be.disabled');
    cy.getId('btn-day-2021-11-21').should('be.disabled');
    cy.getId('btn-day-2021-11-22').should('be.disabled');
    cy.getId('btn-day-2021-11-23').should('be.disabled');
    cy.getId('btn-day-2021-11-24').should('be.disabled');
    cy.getId('btn-day-2021-11-25').should('be.disabled');
    cy.getId('btn-day-2021-11-26').should('be.disabled');
    cy.getId('btn-day-2021-11-27').should('be.disabled');
    cy.getId('btn-day-2021-11-28').should('be.disabled');
    cy.getId('btn-day-2021-11-29').should('be.disabled');
    cy.getId('btn-day-2021-11-30').should('be.disabled');
    cy.getId('btn-day-2021-12-01').should('be.disabled');
    cy.getId('btn-day-2021-12-02').should('be.disabled');
    cy.getId('btn-day-2021-12-03').should('be.disabled');
    cy.getId('btn-day-2021-12-04').should('be.disabled');

    cy.getId('btn-set-blocked-dates').click();

    cy.getId('btn-day-2021-11-01').should('not.be.disabled');
    cy.getId('btn-day-2021-11-02').should('not.be.disabled');
    cy.getId('btn-day-2021-11-07').should('not.be.disabled');
    cy.getId('btn-day-2021-11-08').should('not.be.disabled');
    cy.getId('btn-day-2021-11-10').should('be.disabled');
    cy.getId('btn-day-2021-11-21').should('not.be.disabled');
    cy.getId('btn-day-2021-11-22').should('not.be.disabled');
    cy.getId('btn-day-2021-11-23').should('not.be.disabled');
    cy.getId('btn-day-2021-11-24').should('not.be.disabled');
    cy.getId('btn-day-2021-11-25').should('not.be.disabled');
    cy.getId('btn-day-2021-11-26').should('not.be.disabled');
    cy.getId('btn-day-2021-11-27').should('not.be.disabled');
    cy.getId('btn-day-2021-11-28').should('not.be.disabled');
    cy.getId('btn-day-2021-11-29').should('not.be.disabled');
    cy.getId('btn-day-2021-11-30').should('not.be.disabled');
    cy.getId('btn-day-2021-12-01').should('not.be.disabled');
    cy.getId('btn-day-2021-12-02').should('not.be.disabled');
    cy.getId('btn-day-2021-12-03').should('not.be.disabled');
    cy.getId('btn-day-2021-12-04').should('not.be.disabled');
  });
});

describe('weekStart prop changing after initial render', () => {
  it('should allow the week start day to be modified', () => {
    cy.visitStory('tests--week-start-preselected');
    cy.getId('btn-day-of-the-week-0').should('have.text', 'Sun');
    cy.getId('btn-day-of-the-week-1').should('have.text', 'Mon');
    cy.getId('btn-day-of-the-week-2').should('have.text', 'Tue');
    cy.getId('btn-day-of-the-week-3').should('have.text', 'Wed');
    cy.getId('btn-day-of-the-week-4').should('have.text', 'Thu');
    cy.getId('btn-day-of-the-week-5').should('have.text', 'Fri');
    cy.getId('btn-day-of-the-week-6').should('have.text', 'Sat');

    cy.getId('btn-set-week-start-1').click();

    cy.getId('btn-day-of-the-week-0').should('have.text', 'Mon');
    cy.getId('btn-day-of-the-week-1').should('have.text', 'Tue');
    cy.getId('btn-day-of-the-week-2').should('have.text', 'Wed');
    cy.getId('btn-day-of-the-week-3').should('have.text', 'Thu');
    cy.getId('btn-day-of-the-week-4').should('have.text', 'Fri');
    cy.getId('btn-day-of-the-week-5').should('have.text', 'Sat');
    cy.getId('btn-day-of-the-week-6').should('have.text', 'Sun');
  });
});

describe('locale prop changing after initial render', () => {
  it('should allow language to be modified', () => {
    cy.visitStory('tests--locale-preselected');
    cy.getId('div-month-year-title').should('have.text', 'November 2021');
    cy.getId('btn-day-of-the-week-0').should('have.text', 'Sun');
    cy.getId('btn-day-of-the-week-1').should('have.text', 'Mon');
    cy.getId('btn-day-of-the-week-2').should('have.text', 'Tue');
    cy.getId('btn-day-of-the-week-3').should('have.text', 'Wed');
    cy.getId('btn-day-of-the-week-4').should('have.text', 'Thu');
    cy.getId('btn-day-of-the-week-5').should('have.text', 'Fri');
    cy.getId('btn-day-of-the-week-6').should('have.text', 'Sat');

    cy.getId('btn-set-locale-fr-fr').click();

    cy.getId('div-month-year-title').should('have.text', 'Novembre 2021');
    cy.getId('btn-day-of-the-week-0').should('have.text', 'Dim.');
    cy.getId('btn-day-of-the-week-1').should('have.text', 'Lun.');
    cy.getId('btn-day-of-the-week-2').should('have.text', 'Mar.');
    cy.getId('btn-day-of-the-week-3').should('have.text', 'Mer.');
    cy.getId('btn-day-of-the-week-4').should('have.text', 'Jeu.');
    cy.getId('btn-day-of-the-week-5').should('have.text', 'Ven.');
    cy.getId('btn-day-of-the-week-6').should('have.text', 'Sam.');
  });
});

describe('mode prop changing after initial render', () => {
  describe('Switching to mode range', () => {
    it('should switch from single to range and allow a range to be set', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08');
      cy.getId('btn-set-mode-range').click();
      cy.getId('btn-day-2021-11-11').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-08,2021-11-11');

      // should drop the second selection if mode is switched back to single from range
      cy.getId('btn-set-mode-single').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-08');
    });
  });

  describe('Switching to mode multiple', () => {
    it('should switch from single to multiple and allow multiple dates to be set', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-set-mode-multiple').click();
      cy.getId('btn-focus-start').click();
      cy.realPress('Tab');
      cy.realPress('ArrowRight');
      cy.realPress('Enter');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08,2021-11-09');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowRight');
      cy.realPress('Enter');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08,2021-11-09,2021-11-11');

      // should drop the other selections if mode is switched to range from multiple
      cy.getId('btn-set-mode-range').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-08,2021-11-09');
    });
  });

  describe('Switching to mode max multiple', () => {
    it('should switch from single to multiple and allow multiple dates to be set', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-set-mode-max-3').click();
      cy.getId('btn-focus-start').click();
      cy.realPress('Tab');
      cy.realPress('ArrowRight');
      cy.realPress('Enter');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08,2021-11-09');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowRight');
      cy.realPress('Enter');
      cy.getId('div-dates-selected').should('have.text', '2021-11-08,2021-11-09,2021-11-11');
      // all other dates should now be disabled because it is a max 3 selection
      cy.getId('btn-day-2021-11-01').should('be.disabled');

      // should drop the other selections if mode is switched back to single from max multiple
      cy.getId('btn-set-mode-single').click();
      cy.getId('div-dates-selected').should('have.text', '2021-11-08');
      cy.getId('btn-day-2021-11-01').should('not.be.disabled');
    });
  });
});

describe('minDate prop changing after initial render', () => {
  it('should modify disabled dates when the minDate changes', () => {
    cy.visitStory('tests--min-date');
    cy.getId('btn-day-2021-11-06').should('be.disabled');
    cy.getId('btn-day-2021-11-07').should('not.be.disabled');
    cy.getId('btn-set-min-date-2021-08-08').click();
    cy.getId('btn-day-2021-11-06').should('not.be.disabled');
    cy.getId('btn-previous-month').realClick();
    cy.getId('btn-day-2021-10-01').should('not.be.disabled');
    cy.getId('btn-previous-month').realClick();
    cy.getId('btn-day-2021-09-01').should('not.be.disabled');
    cy.getId('btn-previous-month').realClick();
    cy.getId('btn-day-2021-08-07').should('be.disabled');
    cy.getId('btn-day-2021-08-08').should('not.be.disabled');
    cy.getId('btn-set-min-date-2019-08-08').click();
    cy.getId('btn-day-2021-08-07').should('not.be.disabled');
  });
});

describe('maxDate prop changing after initial render', () => {
  it('should modify disabled dates when the maxDate changes', () => {
    cy.visitStory('tests--max-date');
    cy.getId('btn-day-2021-11-28').should('not.be.disabled');
    cy.getId('btn-day-2021-11-29').should('be.disabled');
    cy.getId('btn-set-max-date-2022-01-08').click();
    cy.getId('btn-day-2021-11-30').should('not.be.disabled');
    cy.getId('btn-next-month').realClick();
    cy.getId('btn-day-2021-12-01').should('not.be.disabled');
    cy.getId('btn-next-month').realClick();
    cy.getId('btn-day-2022-01-08').should('not.be.disabled');
    cy.getId('btn-day-2022-01-09').should('be.disabled');
    cy.getId('btn-set-max-date-2024-01-08').click();
    cy.getId('btn-day-2022-01-09').should('not.be.disabled');
  });
});
