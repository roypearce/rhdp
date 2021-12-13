export const getId = (id: string) => {
  return cy.get(`[data-testid=${id}]`);
};

export const visitStory = (id: string, options?: Partial<Cypress.VisitOptions>) => {
  cy.visit(`/iframe.html?id=${id}&viewMode=story`, options);
  cy.get('preview-loader').should('not.exist');
  return cy.visit(`/iframe.html?id=${id}&viewMode=story`, options);
};

Cypress.Commands.add('getId', getId);
Cypress.Commands.add('visitStory', visitStory);
