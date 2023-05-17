describe('Candidate Application', () => {
  it('passes', () => {
    console.log(Cypress.env());
    cy.visit('/sign-up/applicants');

    cy.url().should('include', '/sign-up/applicants');
  });
});

export {};
