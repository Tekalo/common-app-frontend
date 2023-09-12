import { getMockAuth0Context } from '@/cypress/fixtures/mocks';
import { ERROR_TEXT } from '@/lang/en';
import { redirectCookieName } from '@/lib/constants/strings';
import { applicantResumeEndpoint } from '@/lib/helpers/apiHelpers';
import ViewResumePage from '@/pages/view-resume';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';
import * as routerModule from 'next/router';

Cypress.Commands.add('mountViewResumePage', (auth0Context) => {
  cy.mount(
    <Auth0Context.Provider value={auth0Context}>
      <ViewResumePage />
    </Auth0Context.Provider>
  );
});

describe('View Resume Page', () => {
  const mockApplicantId = '123';
  const expectedApplicantResumeEndpoint = applicantResumeEndpoint.replace(
    ':id',
    mockApplicantId.toString()
  );
  const mockSignedLink = 'http://www.getmyresume.com';
  let mockAuth0Context: Auth0ContextInterface<User>;
  let mockQueryContents: any = {
    applicantId: mockApplicantId,
  };

  beforeEach(() => {
    cy.stub(routerModule, 'useRouter').callsFake(() => {
      return {
        push: cy.stub().as('routerPush'),
        query: mockQueryContents,
      };
    });

    cy.intercept(
      {
        method: 'GET',
        url: expectedApplicantResumeEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply({
          id: mockApplicantId,
          signedLink: mockSignedLink,
        });
      })
    ).as('resumeRequested');

    mockAuth0Context = getMockAuth0Context();
    mockAuth0Context.isAuthenticated = true;
  });

  it('should render', () => {
    mockAuth0Context.isLoading = true;
    cy.mountViewResumePage(mockAuth0Context);

    cy.get('div[data-name=loading-spinner]').should('be.visible');
  });

  it('should redirect to the signedLink', () => {
    cy.mountViewResumePage(mockAuth0Context);

    cy.get('@routerPush').should(
      'have.been.calledOnceWithExactly',
      mockSignedLink
    );
  });

  it('should redirect user to login', () => {
    const expectedUrlValue = encodeURIComponent(window.location.href);
    mockAuth0Context.isAuthenticated = false;

    cy.mountViewResumePage(mockAuth0Context);

    cy.get('@routerPush').should('have.been.calledOnceWithExactly', 'sign-in');
    cy.getCookie(redirectCookieName)
      .its('value')
      .should('equal', expectedUrlValue);
  });

  it('should display the 404 error message', () => {
    cy.intercept(
      {
        method: 'GET',
        url: expectedApplicantResumeEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply({
          statusCode: 404,
        });
      })
    ).as('resumeRequested');

    cy.mountViewResumePage(mockAuth0Context);

    cy.get('#view-resume-error').should('have.text', ERROR_TEXT.resumeNotFound);
  });

  it('should display the generic error message (bad status)', () => {
    cy.intercept(
      {
        method: 'GET',
        url: expectedApplicantResumeEndpoint,
      },
      cy.stub().callsFake((res) => {
        res.reply({ statusCode: 500 });
      })
    ).as('resumeRequested');

    cy.mountViewResumePage(mockAuth0Context);

    cy.get('#view-resume-error').should(
      'have.text',
      ERROR_TEXT.resumeFetchFailed
    );
  });

  it('should display the generic error message (rejection)', () => {
    cy.intercept(
      {
        method: 'GET',
        url: expectedApplicantResumeEndpoint,
      },
      { forceNetworkError: true }
    ).as('resumeRequested');

    cy.mountViewResumePage(mockAuth0Context);

    cy.get('#view-resume-error').should(
      'have.text',
      ERROR_TEXT.resumeFetchFailed
    );
  });

  it('should show the no applicantId error message', () => {
    mockQueryContents = {};

    cy.mountViewResumePage(mockAuth0Context);

    cy.get('#view-resume-error').should('have.text', ERROR_TEXT.noApplicantId);
  });
});
