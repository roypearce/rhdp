describe('Close button control', () => {
  it('should close the datepicker when clicked', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-single').click();
    cy.getId('btn-close').should('be.visible').click();
    cy.getId('btn-close').should('not.exist');
  });

  it('should close the datepicker when Enter is pressed', () => {
    cy.visitStory('tests--input');
    cy.getId('btn-open-datepicker').click();
    cy.getId('btn-close').should('be.visible');
    cy.getId('btn-day-2022-02-02').should('have.attr', 'aria-pressed', 'true');
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-close').should('have.focus');
    cy.realPress('Enter');
    cy.getId('btn-close').should('not.exist');
  });

  it('should not change the value when closed with the Enter key', () => {
    cy.getId('btn-open-datepicker').click();
    cy.getId('btn-close').should('be.visible');
    cy.getId('btn-day-2022-02-02').should('have.attr', 'aria-pressed', 'true');
  });
});

describe('Previous year controls', () => {
  it('should go to the right month one year prior', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('div-month-year-title').contains('November 2021');
    cy.getId('btn-previous-year').click();
    cy.getId('div-month-year-title').contains('November 2020');
    cy.getId('btn-previous-year').click();
    cy.getId('div-month-year-title').contains('November 2019');
    cy.getId('btn-previous-year').click();
    cy.getId('div-month-year-title').contains('November 2018');
    cy.getId('btn-previous-year').click();
    cy.getId('div-month-year-title').contains('November 2017');
  });

  it('should have the correct date focused when tabbing into the calendar', () => {
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.getId('btn-day-2017-11-08').should('have.focus');
  });
});

describe('Next year controls', () => {
  it('should go to the right month one year forward', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('div-month-year-title').contains('November 2021');
    cy.getId('btn-next-year').click();
    cy.getId('div-month-year-title').contains('November 2022');
    cy.getId('btn-next-year').click();
    cy.getId('div-month-year-title').contains('November 2023');
    cy.getId('btn-next-year').click();
    cy.getId('div-month-year-title').contains('November 2024');
    cy.getId('btn-next-year').click();
    cy.getId('div-month-year-title').contains('November 2025');
  });

  it('should have the correct date focused when tabbing into the calendar', () => {
    cy.realPress('Tab');
    cy.getId('btn-day-2025-11-08').should('have.focus');
  });
});

describe('Previous month controls', () => {
  it('should go to the right month one month prior', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('div-month-year-title').contains('November 2021');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').contains('October 2021');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').contains('September 2021');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').contains('August 2021');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').contains('July 2021');
  });

  it('should have the correct date focused when tabbing into the calendar', () => {
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.getId('btn-day-2021-07-08').should('have.focus');
  });

  it('should have the previous month disabled when max mode is used and the 1st of the month is the first date selected', () => {
    cy.visitStory('tests--limited-multiple-date-preselected');
    cy.getId('btn-day-2021-11-01').should('have.attr', 'aria-pressed', 'true');
    cy.getId('btn-previous-month').should('be.disabled');
  });
});

describe('Next month controls', () => {
  it('should go to the right month one month forward', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('div-month-year-title').contains('November 2021');
    cy.getId('btn-next-month').click();
    cy.getId('div-month-year-title').contains('December 2021');
    cy.getId('btn-next-month').click();
    cy.getId('div-month-year-title').contains('January 2022');
    cy.getId('btn-next-month').click();
    cy.getId('div-month-year-title').contains('February 2022');
    cy.getId('btn-next-month').click();
    cy.getId('div-month-year-title').contains('March 2022');
  });

  it('should have the correct date focused when tabbing into the calendar', () => {
    cy.realPress('Tab');
    cy.realPress('Tab');
    cy.getId('btn-day-2022-03-08').should('have.focus');
  });

  it('should put focus at the end of the next month if the current focused date does not exist in the next month', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-next-month').click().click();
    cy.getId('btn-day-2022-01-31').click();
    cy.getId('btn-next-month').click();
    cy.getId('btn-focus-start').click();
    cy.realPress('Tab');
    cy.getId('btn-day-2022-02-28').should('have.focus');
  });

  it('should let arrow navigation work from the new focused date as expected', () => {
    cy.realPress('ArrowUp');
    cy.getId('btn-day-2022-02-21').should('have.focus');
  });

  it('should have the next month disabled when max mode is used and the 1st of the month is the first date selected', () => {
    cy.visitStory('tests--limited-multiple-date-preselected');
    cy.getId('btn-day-2021-11-01')
      .should('have.attr', 'aria-pressed', 'true')
      .click()
      .should('have.attr', 'aria-pressed', 'false');
    cy.getId('btn-day-2021-11-30').should('have.attr', 'aria-pressed', 'false');
    cy.getId('btn-day-2021-11-30').should('not.be.disabled').click().should('have.attr', 'aria-pressed', 'true');
    cy.getId('btn-next-month').should('be.disabled');
  });
});

describe('Controls when max multiple dates are all selected', () => {
  it('should disable all month and year controls when all dates are selected in the same month', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-previous-month').should('not.be.disabled');
    cy.getId('btn-previous-year').should('not.be.disabled');
    cy.getId('btn-next-month').should('not.be.disabled');
    cy.getId('btn-next-year').should('not.be.disabled');
    cy.getId('btn-set-mode-max-3').click();
    cy.getId('btn-set-select-dates-multiple').click();
    cy.getId('btn-day-2021-11-01').should('be.visible');
    cy.getId('btn-previous-month').should('be.disabled');
    cy.getId('btn-previous-year').should('be.disabled');
    cy.getId('btn-next-month').should('be.disabled');
    cy.getId('btn-next-year').should('be.disabled');
  });

  it('should enable all controls when max multiple is not maxed out', () => {
    cy.getId('btn-day-2021-11-30')
      .should('have.attr', 'aria-pressed', 'true')
      .click()
      .should('have.attr', 'aria-pressed', 'false');
    cy.getId('btn-previous-month').should('not.be.disabled');
    cy.getId('btn-previous-year').should('not.be.disabled');
    cy.getId('btn-next-month').should('not.be.disabled');
    cy.getId('btn-next-year').should('not.be.disabled');
  });

  it('should allow navigation between two consecutive months when selected dates are in both months', () => {
    cy.getId('btn-day-2021-12-01').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2021');
    cy.getId('btn-previous-month').should('not.be.disabled');
    cy.getId('btn-previous-year').should('be.disabled');
    cy.getId('btn-next-month').should('be.disabled');
    cy.getId('btn-next-year').should('be.disabled');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'November 2021');
    cy.getId('btn-previous-month').should('be.disabled');
    cy.getId('btn-previous-year').should('be.disabled');
    cy.getId('btn-next-month').should('not.be.disabled');
    cy.getId('btn-next-year').should('be.disabled');
    cy.getId('btn-next-month').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2021');
  });

  it('should allow navigation between two consecutive years when selected dates are in both years', () => {
    cy.getId('btn-day-2021-12-01').should('have.attr', 'aria-pressed', 'true').click();
    cy.getId('btn-next-year').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2022');
    cy.getId('btn-day-2022-12-01').click();
    cy.getId('btn-previous-month').should('not.be.disabled');
    cy.getId('btn-previous-year').should('not.be.disabled');
    cy.getId('btn-next-month').should('be.disabled');
    cy.getId('btn-next-year').should('be.disabled');
    cy.getId('btn-previous-year').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2021');
    cy.getId('btn-previous-month').should('not.be.disabled');
    cy.getId('btn-previous-year').should('be.disabled');
    cy.getId('btn-next-month').should('not.be.disabled');
    cy.getId('btn-next-year').should('not.be.disabled');
    cy.getId('btn-next-year').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2022');
  });

  it('should allow navigation between all months between the range of selected dates', () => {
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'November 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'October 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'September 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'August 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'July 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'June 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'May 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'April 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'March 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'February 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'January 2022');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2021');
    cy.getId('btn-previous-month').click();
    cy.getId('div-month-year-title').should('have.text', 'November 2021');
    cy.getId('btn-previous-month').should('be.disabled');
  });
});
