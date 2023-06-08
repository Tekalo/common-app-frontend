describe('Signed In User', () => {
  beforeEach(() => {
    cy.login();
    cy.validateLogin();
  });

  it('should take user to candidate application page', () => {
    cy.get('a[data-name=continue-application-link]').click();
    cy.url().should('contain', 'sign-up/applicants/experience-and-interests');
  });

  it('should display delete modal', () => {
    cy.get('div[data-name=show-delete-modal-link]').click();
    cy.get('div[data-name=delete-account-modal]').should('be.visible');
    cy.get('div[data-name=confirm-modal-cancel').click();
    cy.get('div[data-name=delete-account-modal]').should('not.exist');
  });

  it('should sign the user out', () => {
    cy.get('div[data-name=sign-in-out-link]').click();

    cy.url().should('equal', Cypress.config('baseUrl'));
    cy.get('div[data-name=sign-in-out-link]').should('contain.text', 'Sign in');
  });
});
