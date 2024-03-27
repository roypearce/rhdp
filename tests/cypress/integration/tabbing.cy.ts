import ChainDate from '../../../src/chain-date';

describe('Tabbing', () => {
  it('should create a focus trap if hasFocusTrap is set', () => {
    cy.visitStory('tests--input');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-open-datepicker').click();
    cy.getId('div-datepicker').should('be.visible');
    cy.getId('btn-day-2022-02-02').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-next-year').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-next-month').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-previous-month').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-previous-year').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-close').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-day-2022-02-02').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-close').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-previous-year').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-previous-month').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-next-month').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-next-year').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-day-2022-02-02').should('have.focus');
  });

  it('should tab from first button to the calendar and then to the last button', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-focus-start').focus();
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-08').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-focus-end').should('have.focus');
  });

  it('should access the next/previous month/year buttons by shift+tabbing once a day in the calendar is focused', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-focus-start').focus();
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-08').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-next-year').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-next-month').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-previous-month').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-previous-year').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-focus-start').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-08').should('have.focus');
    cy.realPress(['Shift', 'Tab']);
    cy.getId('btn-next-year').should('have.focus');
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-08').should('have.focus');
  });

  it('should tab to the focused date today even though it is not selected', () => {
    cy.visitStory('tests--no-date-selected');
    cy.getId('btn-focus-start').focus();
    cy.realPress('Tab');
    cy.getId(`btn-day-${new ChainDate().format()}`).should('have.focus');
  });

  it('should tab to the first selected date in a range', () => {
    cy.visitStory('tests--range-date-preselected');
    cy.getId('btn-focus-start').focus();
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-01').should('have.focus');
  });

  it('should tab to the first selected date in a multiple', () => {
    cy.visitStory('tests--multiple-date-preselected');
    cy.getId('btn-focus-start').focus();
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-01').should('have.focus');
  });

  it('should tab to the first selected date in a limited multiple', () => {
    cy.visitStory('tests--limited-multiple-date-preselected');
    cy.getId('btn-focus-start').focus();
    cy.realPress('Tab');
    cy.getId('btn-day-2021-11-01').should('have.focus');
  });
});
