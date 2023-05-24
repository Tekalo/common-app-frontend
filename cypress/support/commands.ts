Cypress.Commands.add('bypassCloudflare', (): void => {
  cy.session(
    'cf',
    () => {
      cy.visit({
        url: '/',
        headers: {
          'CF-Access-Client-Id': Cypress.env('cf_access_id'),
          'CF-Access-Client-Secret': Cypress.env('cf_access_secret'),
        },
      });
    },
    { cacheAcrossSpecs: true }
  );
});

Cypress.Commands.add('login', (): void => {
  cy.session(
    'login',
    () => {
      cy.visit('/sign-in');

      // TODO: Update this for production
      cy.origin(Cypress.env('auth0_domain'), () => {
        cy.url().should('contain', '/u/login');

        cy.get('input[name=username]').type(Cypress.env('auth0_username'));
        cy.get('input[name=password]').type(Cypress.env('auth0_password'));

        cy.get('button[name=action]').last().click();
      });

      cy.url({ timeout: 10000 }).should('equal', Cypress.config('baseUrl'));
    },
    {
      validate() {
        cy.visit('/account');
        cy.get('div[data-name=account-greeting]', { timeout: 10000 }).should(
          'have.text',
          'Welcome back, Test User'
        );
      },
    }
  );
});

export {};
