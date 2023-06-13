import { deleteRequest } from '@/lib/helpers/apiHelpers';

Cypress.Commands.add('bypassCloudflareAccess', (): void => {
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

Cypress.Commands.add('validateLogin', (): void => {
  cy.visit('/account');
  cy.get('h3[data-name=account-greeting]', { timeout: 10000 }).should(
    'have.text',
    'Welcome back, Test User'
  );
});

Cypress.Commands.add('login', (): void => {
  cy.session(
    'login',
    () => {
      cy.bypassCloudflareAccess();
      cy.visit('/sign-in');

      cy.origin(`https://${Cypress.env('auth0_domain')}`, () => {
        cy.url({ timeout: 10000 }).should('contain', '/u/login');

        cy.get('input[name=username]').type(Cypress.env('auth0_username'));
        cy.get('input[name=password]').type(Cypress.env('auth0_password'));

        cy.get('button[name=action]').last().click();
      });

      cy.url({ timeout: 10000 }).should(
        'contain',
        `${Cypress.config('baseUrl')}`
      );
    },
    {
      validate() {
        cy.validateLogin();
      },
    }
  );
});

Cypress.Commands.add('deleteTestData', (deleteUrl: string) => {
  cy.intercept({
    method: 'POST',
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
  }).as('adminLogin');

  cy.login();

  cy.wait('@adminLogin').then((intercept: any) => {
    const accessToken = intercept.response.body.access_token;

    cy.task('getUserIds').then((uids) => {
      const userIds = uids as string[];

      userIds.forEach((id) => {
        deleteRequest(`${deleteUrl}/${id}`, accessToken);
      });

      cy.task('clearUserIds');
    });
  });
});

export {};
