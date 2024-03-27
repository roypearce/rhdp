describe('Start of week', () => {
  it('should start on sunday by default', () => {
    cy.visitStory('tests--single-date-preselected');
    cy.getId('div-days-of-the-week').children().first().should('have.text', 'Sun');
    cy.getId('div-days-of-the-week').children().last().should('have.text', 'Sat');
    cy.getId('div-calendar-dates').find('button').first().should('have.attr', 'data-testid', 'btn-day-2021-10-31');
    cy.getId('div-calendar-dates').find('button').last().should('have.attr', 'data-testid', 'btn-day-2021-12-04');
  });

  it('should start on monday when weekStart prop is 1', () => {
    cy.visitStory('tests--week-start-one');
    cy.getId('div-days-of-the-week').children().first().should('have.text', 'Mon');
    cy.getId('div-days-of-the-week').children().last().should('have.text', 'Sun');
    cy.getId('div-calendar-dates').find('button').first().should('have.attr', 'data-testid', 'btn-day-2021-11-01');
    cy.getId('div-calendar-dates').find('button').last().should('have.attr', 'data-testid', 'btn-day-2021-12-05');
  });
});
