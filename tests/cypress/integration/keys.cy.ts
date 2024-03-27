import ChainDate from '../../../src/chain-date';

const today = new ChainDate().format();

describe('Key based navigation', () => {
  describe('Path finding', () => {
    it('should not navigate beyond max search date (6 weeks) from current date if no dates are available', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-set-max-date-to-null').click();
      cy.getId('btn-set-forward-dates-full').click();
      cy.getId('btn-day-2021-11-09').click().should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-11-09').should('have.focus');

      // should allow navigation backwards beyond 6 weeks if there is a selected date before that
      cy.getId('btn-next-month').click();
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-12-09').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-22').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-09').should('have.focus');

      // should not allow navigation beyond 6 weeks if that date is no longer selected
      cy.getId('btn-next-month').click();
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-12-09').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-22').should('have.focus').click();
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-22').should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-12-22').should('have.focus');

      // should allow navigation forwards beyond 6 weeks if there is a selected date after that
      cy.getId('btn-previous-month').click();
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-22').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-22').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-22').should('have.focus');
    });

    it('should navigate to the next available day when max search date (6 weeks) minus one day is set from the current date', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-set-max-date-to-null').click();
      cy.getId('btn-set-forward-dates-full-minus-one').click();
      cy.getId('btn-day-2021-11-09').click().should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-21').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-12-21').should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-11-09').should('have.focus');
    });
  });

  describe('Home navigation', () => {
    it('should go to the start of the month when Home is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress('Home');
      cy.getId('btn-day-2021-11-01').should('have.focus');
    });

    it('should go to next best date if the start of the month is blocked', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('Home');
      cy.getId('btn-day-2021-11-03').should('have.focus');
    });
  });

  describe('End navigation', () => {
    it('should go to the end of the month when End is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress('End');
      cy.getId('btn-day-2021-11-30').should('have.focus');
    });

    it('should go to next best date if the end of the month is blocked', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('End');
      cy.getId('btn-day-2021-11-20').should('have.focus');
    });
  });

  describe('PageUp navigation', () => {
    it('should go to the same date in the previous month when PageUp is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress('PageUp');
      cy.getId('btn-day-2021-10-08').should('have.focus');
    });

    it('should go to the same date in the previous year when Ctrl+PageUp is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress(['Control', 'PageUp']);
      cy.getId('btn-day-2020-11-08').should('have.focus');
    });

    it('should focus on the disabled date in the previous month when PageUp is pressed, arrow keys in any direction should focus the closest available date', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('PageUp');
      cy.getId('btn-day-2021-10-09').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-07').should('have.focus');
    });

    it('should focus on the disabled date in the previous year when Ctrl+PageUp is pressed, arrow keys in any direction should focus the closest available date', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress(['Control', 'PageUp']);
      cy.getId('btn-day-2020-11-09').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2020-11-02').should('have.focus');
    });
  });

  describe('PageDown navigation', () => {
    it('should go to the same date in the next month when PageDown is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress('PageDown');
      cy.getId('btn-day-2021-12-08').should('have.focus');
    });

    it('should go to the same date in the next year when Ctrl+PageDown is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress(['Control', 'PageDown']);
      cy.getId('btn-day-2022-11-08').should('have.focus');
    });

    it('should focus on the disabled date in the next month is blocked when PageDown is pressed, should go to next best date when arrow keys are used', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-focus-start').should('have.focus');
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.getId('btn-next-month').click().click();
      cy.realPress('Tab');
      cy.getId('btn-day-2022-01-09').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2022-01-12').should('have.focus');
      cy.realPress('PageDown');
      cy.getId('btn-day-2022-02-12').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2022-02-05').should('have.focus');
    });

    it('should focus on the disabled date in the next year is blocked when Ctrl+PageDown is pressed, should go to next best date when arrow keys are used', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-previous-year').click();
      cy.getId('btn-day-2020-11-01').click();
      cy.getId('btn-next-year').click();
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-01').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-03').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-31').should('have.focus');
      cy.realPress(['PageDown']);
      cy.getId('btn-day-2021-11-30').should('have.focus').should('have.attr', 'aria-disabled', 'true');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-12').should('have.focus');
    });
  });

  describe('Escape key', () => {
    it('should close an open datepicker when Esc is pressed', () => {
      cy.visitStory('tests--show-hide');
      cy.getId('btn-show-hide-single').should('exist').should('be.visible');
      cy.getId('div-datepicker').should('not.exist');
      cy.getId('btn-show-hide-single').click();
      cy.getId('div-datepicker').should('exist').should('be.visible');
      cy.getId(`btn-day-${today}`).should('have.focus');
      cy.realPress('Escape');
      cy.getId('div-datepicker').should('not.exist');
    });
  });

  describe('Arrow navigation', () => {
    it('should allow full traversal of all eligible dates in the blocked story starting from the 1st date with the right arrow', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-previous-month').click();
      cy.getId('div-month-year-title').should('have.text', 'October 2021');
      cy.getId('btn-day-2021-10-01').click().should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-03').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-04').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-05').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-06').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-07').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-10').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-11').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-12').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-13').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-16').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-17').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-18').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-19').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-22').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-23').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-24').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-25').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-28').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-29').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-30').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-10-31').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-03').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-04').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-05').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-06').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-10').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-11').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-12').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-13').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-14').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-15').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-16').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-17').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-18').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-19').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-20').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('div-month-year-title').should('have.text', 'December 2021');
      cy.getId('btn-day-2021-12-12').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-13').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-14').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-15').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-16').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-17').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-18').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-19').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-27').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('div-month-year-title').should('have.text', 'January 2022');
      cy.getId('btn-day-2022-01-04').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2022-01-12').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2022-01-20').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2022-01-28').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('div-month-year-title').should('have.text', 'February 2022');
      cy.getId('btn-day-2022-02-05').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2022-02-13').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2022-02-13').should('have.focus');
    });

    it('should allow full traversal of all eligible dates in the blocked story starting from the last date with the left arrow', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-next-month').click().click().click();
      cy.getId('div-month-year-title').should('have.text', 'February 2022');
      cy.getId('btn-day-2022-02-13').click().should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2022-02-05').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('div-month-year-title').should('have.text', 'January 2022');
      cy.getId('btn-day-2022-01-28').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2022-01-20').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2022-01-12').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2022-01-04').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('div-month-year-title').should('have.text', 'December 2021');
      cy.getId('btn-day-2021-12-27').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-19').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-18').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-17').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-16').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-15').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-14').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-13').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-12-12').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-20').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-19').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-18').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-17').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-16').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-15').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-14').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-13').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-12').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-11').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-10').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-09').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-06').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-05').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-04').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-03').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('div-month-year-title').should('have.text', 'October 2021');
      cy.getId('btn-day-2021-10-31').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-30').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-29').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-28').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-25').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-24').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-23').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-22').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-19').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-18').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-17').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-16').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-13').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-12').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-11').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-10').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-07').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-06').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-05').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-04').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-03').should('have.focus');
    });

    it('should allow full traversal of all eligible dates in the blocked story starting from the 1st date with the down arrow', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-previous-month').click();
      cy.getId('div-month-year-title').should('have.text', 'October 2021');
      cy.getId('btn-day-2021-10-01').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-10-07').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-10-13').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-10-19').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-10-25').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-10-31').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.getId('btn-day-2021-11-09').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-11-16').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('div-month-year-title').should('have.text', 'December 2021');
      cy.getId('btn-day-2021-12-14').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-12-19').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-12-27').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('div-month-year-title').should('have.text', 'January 2022');
      cy.getId('btn-day-2022-01-04').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2022-01-12').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2022-01-20').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2022-01-28').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('div-month-year-title').should('have.text', 'February 2022');
      cy.getId('btn-day-2022-02-05').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2022-02-13').click().should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2022-02-13').click().should('have.focus');
      cy.realPress('ArrowDown');
    });

    it('should allow full traversal of all eligible dates in the blocked story starting from the last date with the up arrow', () => {
      cy.visitStory('tests--blocked-dates');
      cy.getId('btn-next-month').click().click().click();
      cy.getId('div-month-year-title').should('have.text', 'February 2022');
      cy.getId('btn-day-2022-02-13').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2022-02-05').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('div-month-year-title').should('have.text', 'January 2022');
      cy.getId('btn-day-2022-01-28').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2022-01-20').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2022-01-12').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2022-01-04').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('div-month-year-title').should('have.text', 'December 2021');
      cy.getId('btn-day-2021-12-27').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-12-19').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-12-12').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('div-month-year-title').should('have.text', 'November 2021');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-11-14').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-11-09').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-11-03').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('div-month-year-title').should('have.text', 'October 2021');
      cy.getId('btn-day-2021-10-28').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-10-28').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-10-22').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-10-16').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-10-07').click().should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('div-month-year-title').should('have.text', 'September 2021');
      cy.getId('btn-day-2021-09-30').click().should('have.focus');
    });

    it('should go to the right dates with up/down/left/right', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('btn-focus-start').focus();
      cy.realPress('Tab');
      cy.getId('btn-day-2021-11-08').should('have.focus');
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-11-07').should('have.focus');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-11-14').should('have.focus');
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-11-15').should('have.focus');
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-11-08').should('have.focus');
    });

    it('should go to the previous month when the first day of the month is selected and the left arrow is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').contains('November 2021');
      cy.getId('btn-day-2021-11-01').click();
      cy.realPress('ArrowLeft');
      cy.getId('btn-day-2021-10-31').should('have.focus');
      cy.getId('div-month-year-title').contains('October 2021');
    });

    it('should go to the previous month when the first day of the month is selected and the up arrow is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').contains('November 2021');
      cy.getId('btn-day-2021-11-01').click();
      cy.realPress('ArrowUp');
      cy.getId('btn-day-2021-10-25').should('have.focus');
      cy.getId('div-month-year-title').contains('October 2021');
    });

    it('should go to the next month when the last day of the month is selected and the right arrow is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').contains('November 2021');
      cy.getId('btn-day-2021-11-30').click();
      cy.realPress('ArrowRight');
      cy.getId('btn-day-2021-12-01').should('have.focus');
      cy.getId('div-month-year-title').contains('December 2021');
    });

    it('should go to the next month when the last day of the month is selected and the down arrow is pressed', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').contains('November 2021');
      cy.getId('btn-day-2021-11-30').click();
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2021-12-07').should('have.focus');
      cy.getId('div-month-year-title').contains('December 2021');
    });

    it('should go to the next year when the down arrow is pressed consecutively', () => {
      cy.visitStory('tests--single-date-preselected');
      cy.getId('div-month-year-title').contains('November 2021');
      cy.getId('btn-day-2021-11-08').click();
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.getId('btn-day-2022-01-03').should('have.focus');
      cy.getId('div-month-year-title').contains('January 2022');
    });
  });
});
