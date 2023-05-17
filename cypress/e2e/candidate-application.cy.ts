describe('Candidate Application', () => {
  it('passes', () => {
    cy.visit('/sign-up/applicants');

    expect(true).to.equal(true);
  });
});

export {};
