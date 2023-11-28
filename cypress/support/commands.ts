import { deleteRequest } from '@/lib/helpers/api/apiHelpers';
import {
  applicantsEndpoint,
  opportunityBatchEndpoint,
} from '@/lib/helpers/api/endpoints';
import { __DEBUG_ITEM_KEY__ } from '@/providers/debugProvider';

Cypress.Commands.add('setupTestingEnvironment', (): void => {
  cy.session(
    'cf',
    () => {
      // This enabled debug mode
      localStorage.setItem(
        __DEBUG_ITEM_KEY__,
        Cypress.env('debug_mode_secret')
      );

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
  cy.visit('account');
  cy.get('h3[data-name=account-greeting]').should(
    'have.text',
    'Welcome back, Test User'
  );
});

Cypress.Commands.add('login', (): void => {
  cy.session('login', () => {
    cy.setupTestingEnvironment();
    cy.visit('/sign-in');

    if (Cypress.env('environment') === 'production') {
      // The new auth0 domain is too close to the baseUrl now, so we need to
      // not run this in origin or it will fail
      cy.url().should('contain', '/u/login');

      const auth0Username = Cypress.env('auth0_username');
      const auth0Password = Cypress.env('auth0_password');

      cy.get('input[name=username]')
        .invoke('val', auth0Username.substring(0, auth0Username.length - 1))
        .type(auth0Username.charAt(auth0Username.length - 1));
      cy.get('input[name=password]')
        .invoke('val', auth0Password.substring(0, auth0Password.length - 1))
        .type(auth0Password.charAt(auth0Password.length - 1));

      cy.get('button[name=action]').last().click({ force: true });
    } else {
      cy.origin(`https://${Cypress.env('auth0_domain')}`, () => {
        cy.url().should('contain', '/u/login');

        const auth0Username = Cypress.env('auth0_username');
        const auth0Password = Cypress.env('auth0_password');

        cy.get('input[name=username]')
          .invoke('val', auth0Username.substring(0, auth0Username.length - 1))
          .type(auth0Username.charAt(auth0Username.length - 1));
        cy.get('input[name=password]')
          .invoke('val', auth0Password.substring(0, auth0Password.length - 1))
          .type(auth0Password.charAt(auth0Password.length - 1));

        cy.get('button[name=action]').last().click({ force: true });
      });
    }

    cy.url().should('contain', `/account`);
  });
});

Cypress.Commands.add('deleteTestData', (type: 'opportunity' | 'candidate') => {
  let deleteUrl: string;
  let taskName: string;

  cy.intercept({
    method: 'POST',
    url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
  }).as('adminLogin');

  cy.login();

  if (type === 'opportunity') {
    deleteUrl = opportunityBatchEndpoint;
    taskName = 'OppIds';
  } else {
    deleteUrl = applicantsEndpoint;
    taskName = 'UserIds';
  }

  cy.wait('@adminLogin').then((intercept: any) => {
    const accessToken = intercept.response.body.access_token;

    cy.task(`get${taskName}`).then((uids) => {
      const deleteIds = uids as string[];

      deleteIds.forEach(async (id) => {
        await deleteRequest(`${deleteUrl}/${id}`, accessToken);
      });

      cy.task(`clear${taskName}`);
    });
  });
});

export {};
