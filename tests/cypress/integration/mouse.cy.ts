describe('Mouse interactions', () => {
  it('should have focus on the date clicked', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-day-2021-11-04').should('be.visible').click();
    cy.getId('btn-day-2021-11-04').should('have.focus');
  });

  it('should have focus on the date clicked when the date is outside of the current month and the calendar re-renders', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('btn-day-2021-12-04').should('be.visible').click();
    cy.getId('div-month-year-title').should('have.text', 'December 2021');
    cy.getId('btn-day-2021-12-04').should('have.focus');
  });
});
