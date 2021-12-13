describe('Blocked dates', () => {
  it('should block all dates specified from selection for the month of Nov 2021', () => {
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
  });

  it('should not allow blocked dates to be selected', () => {
    cy.getId('btn-day-2021-11-01').realClick();
    cy.getId('btn-day-2021-11-01').should('not.have.attr', 'aria-selected', 'true');
    cy.getId('div-dates-selected').should('have.text', '2021-11-09');
  });

  it('should not block unspecified dates', () => {
    cy.getId('btn-day-2021-10-31').should('not.be.disabled');
    cy.getId('btn-day-2021-11-03').should('not.be.disabled');
    cy.getId('btn-day-2021-11-04').should('not.be.disabled');
    cy.getId('btn-day-2021-11-05').should('not.be.disabled');
    cy.getId('btn-day-2021-11-06').should('not.be.disabled');
    cy.getId('btn-day-2021-11-09').should('not.be.disabled');
    cy.getId('btn-day-2021-11-10').should('not.be.disabled');
    cy.getId('btn-day-2021-11-11').should('not.be.disabled');
    cy.getId('btn-day-2021-11-12').should('not.be.disabled');
    cy.getId('btn-day-2021-11-13').should('not.be.disabled');
    cy.getId('btn-day-2021-11-14').should('not.be.disabled');
    cy.getId('btn-day-2021-11-15').should('not.be.disabled');
    cy.getId('btn-day-2021-11-16').should('not.be.disabled');
    cy.getId('btn-day-2021-11-17').should('not.be.disabled');
    cy.getId('btn-day-2021-11-18').should('not.be.disabled');
    cy.getId('btn-day-2021-11-19').should('not.be.disabled');
    cy.getId('btn-day-2021-11-20').should('not.be.disabled');
  });

  it('should allow unspecified dates to be selected', () => {
    cy.getId('btn-day-2021-11-04').realClick();
    cy.getId('btn-day-2021-11-04').should('have.attr', 'aria-selected', 'true');
    cy.getId('div-dates-selected').should('have.text', '2021-11-04');
  });
});
