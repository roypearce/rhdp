import ChainDate, { TimePeriod } from '../../../src/chain-date';

const firstDayOfMonth = new ChainDate().startOfMonth().format();

describe('Show/hide functionality', () => {
  it('should focus on init if that prop is set', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-single').should('exist').should('be.visible');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-single').click();
    cy.getId('div-datepicker').should('exist').should('be.visible');
    cy.getId('btn-day-2021-11-08').should('have.focus');
  });

  it('should focus on the element that had focus before it was shown', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-single').should('exist').should('be.visible');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-single').click();
    cy.getId('div-datepicker').should('exist').should('be.visible');
    cy.getId(`btn-day-${firstDayOfMonth}`).click();
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-single').should('have.focus');
  });

  it('should allow clicking the already selected date to let it close the datepicker even though it has no other meaningful effect', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-single').should('exist').should('be.visible');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-single').click();
    cy.getId('div-datepicker').should('exist').should('be.visible');
    cy.getId(`btn-day-${firstDayOfMonth}`).click();
    cy.getId('div-datepicker').should('not.exist');
  });

  it('should close the datepicker when a range is selected', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-range').should('exist').should('be.visible');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-range').click();
    cy.getId('div-datepicker').should('exist').should('be.visible');
    cy.getId(`btn-day-${firstDayOfMonth}`).click();
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('not.exist');
  });

  it('should not close the datepicker when a multple dates are selected in multiple mode', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-multiple').should('exist').should('be.visible');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-multiple').click();
    cy.getId('div-datepicker').should('exist').should('be.visible');
    cy.getId(`btn-day-${firstDayOfMonth}`).click();
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('exist');
    cy.getId('btn-close').click();
    cy.getId('div-datepicker').should('not.exist');
  });

  it('should close the datepicker when a max multiple is selected', () => {
    cy.visitStory('tests--show-hide');
    cy.getId('btn-show-hide-multiple-max').should('exist').should('be.visible');
    cy.getId('div-datepicker').should('not.exist');
    cy.getId('btn-show-hide-multiple-max').click();
    cy.getId('div-datepicker').should('exist').should('be.visible');
    cy.getId(`btn-day-${firstDayOfMonth}`).click();
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('exist');
    cy.realPress('ArrowRight');
    cy.realPress('ArrowRight');
    cy.realPress('Enter');
    cy.getId('div-datepicker').should('not.exist');
  });
});
