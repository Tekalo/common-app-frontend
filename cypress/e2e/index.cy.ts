describe('The Home Page', () => {
  beforeEach(() => {
    cy.login();
    cy.validateLogin();
  });

  it('can navigate to the account page when logged in', () => {
    cy.get('a[href="/account"]').fastClick();
    cy.url().should('contain', '/account');
  });
});
