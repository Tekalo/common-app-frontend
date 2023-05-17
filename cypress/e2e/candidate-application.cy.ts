describe('Candidate Application', () => {
  it('passes', () => {
    console.log(Cypress.env());
    cy.visit({
      url: '/sign-up/applicants',
      // TODO: Move this to a session callback so we don't have to do it every time
      headers: {
        'CF-Access-Client-Id': Cypress.env('cf_access_id'),
        'CF-Access-Client-Secret': Cypress.env('cf_access_secret'),
      },
    });

    cy.url().should('include', '/sign-up/applicants');
  });
});

export {};
