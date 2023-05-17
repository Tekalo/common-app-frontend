describe('Candidate Application', () => {
  it('passes', () => {
    console.log(Cypress.env());
    cy.visit({
      url: '/sign-up/applicants',
      headers: {
        'CF-Access-Client-Id': Cypress.env('cf_access_id'),
        'CF-Access-Client-Secret': Cypress.env('cf_access_secret'),
      },
    });

    cy.url().should('include', '/sign-up/applicants');
  });
});

export {};
