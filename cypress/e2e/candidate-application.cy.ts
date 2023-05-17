describe('Candidate Application', () => {
  it('passes', () => {
    console.log(Cypress.env());
    cy.visit('/sign-up/applicants');

    expect(true).to.equal(true);
  });
});

export {};
