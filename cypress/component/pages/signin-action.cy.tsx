import { getMockAuth0Context } from '@/cypress/fixtures/mocks';
import { ACCOUNT_LINK, BASE_LINK } from '@/lang/en/en';
import { redirectCookieName } from '@/lib/constants/strings';
import { applicantSubmissionsEndpoint } from '@/lib/helpers/api/endpoints';
import CookiesProvider from '@/lib/providers/cookiesProvider';
import SignInActionPage from '@/pages/signin-action';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';
import * as routerModule from 'next/router';

Cypress.Commands.add('mountSignInActionPage', (auth0Context) => {
  cy.mount(
    <Auth0Context.Provider value={auth0Context}>
      <CookiesProvider>
        <SignInActionPage />
      </CookiesProvider>
    </Auth0Context.Provider>
  );
});

describe('Sign-in Action Page', () => {
  const mockRedirectUrl = 'http://tekalo.org/view-resume?applicantId=101';
  let mockAuth0Context: Auth0ContextInterface<User>;

  beforeEach(() => {
    cy.stub(routerModule, 'useRouter').callsFake(() => {
      return {
        push: cy.stub().as('routerPush'),
      };
    });

    mockAuth0Context = getMockAuth0Context();
    mockAuth0Context.isAuthenticated = true;
  });

  it('should render', () => {
    mockAuth0Context.isLoading = true;
    cy.mountSignInActionPage(mockAuth0Context);

    cy.get('div[data-name=loading-spinner]').should('be.visible');
  });

  it('should redirect based on cookie', () => {
    cy.setCookie(redirectCookieName, mockRedirectUrl);

    cy.mountSignInActionPage(mockAuth0Context);

    cy.get('@routerPush').should(
      'have.been.calledOnceWithExactly',
      mockRedirectUrl
    );
  });

  it('should redirect user to home if application is complete', () => {
    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply({
          isFinal: true,
        });
      })
    );

    cy.mountSignInActionPage(mockAuth0Context);

    cy.get('@routerPush').should('have.been.calledOnceWithExactly', BASE_LINK);
  });

  it('should redirect user to account page if application is incomplete', () => {
    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply({
          isFinal: false,
        });
      })
    );

    cy.mountSignInActionPage(mockAuth0Context);

    cy.get('@routerPush').should(
      'have.been.calledOnceWithExactly',
      ACCOUNT_LINK
    );
  });

  it('should redirect user to home if there is an error retrieving application (bad status)', () => {
    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply({
          statusCode: 404,
        });
      })
    );

    cy.mountSignInActionPage(mockAuth0Context);

    cy.get('@routerPush').should('have.been.calledOnceWithExactly', BASE_LINK);
  });

  it('should redirect user to home if there is an error retrieving application (rejection)', () => {
    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      { forceNetworkError: true }
    );

    cy.mountSignInActionPage(mockAuth0Context);

    cy.get('@routerPush').should('have.been.calledOnceWithExactly', BASE_LINK);
  });
});
