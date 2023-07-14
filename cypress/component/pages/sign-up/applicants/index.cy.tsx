import {
  ACCOUNT_LINK,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_FORM_TEXT,
  ORG_SIGNUP_LINK,
  PRIVACY_MODAL_TEXT,
  SIGN_IN_LINK,
} from '@/lang/en';
import {
  applicantSubmissionsEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/apiHelpers';

import { Auth0ContextInterface, User } from '@auth0/auth0-react';
import router from 'next/router';

describe('Applicant Signup Page', () => {
  const voidFn = () => void {};
  const testToken = '123';

  let mockAuth0Context: Auth0ContextInterface<User>;
  // https://devdocs.io/cypress/api/commands/intercept#Providing-a-stub-response-with-req-reply
  let mockHasSubmittedRes: any;
  let mockApplicantRes: any;

  beforeEach(() => {
    cy.stub(router, 'push').as('routerPush');

    mockHasSubmittedRes = {
      statusCode: 200,
      body: {
        isFinal: true,
      },
    };
    mockApplicantRes = {
      statusCode: 200,
      body: {},
    };

    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy
        .stub()
        .as('submittedCall')
        .callsFake((req) => {
          console.log(req);
          req.reply(mockHasSubmittedRes);
        })
    ).as('hasSubmitted');

    cy.intercept(
      {
        method: 'GET',
        url: existingApplicantEndpoint,
      },
      cy
        .stub()
        .as('dataCall')
        .callsFake((req) => req.reply(mockApplicantRes))
    ).as('hasData');

    mockAuth0Context = {
      getAccessTokenSilently: () =>
        cy.stub().returns(Promise.resolve(testToken)),
      getAccessTokenWithPopup: voidFn,
      getIdTokenClaims: voidFn,
      handleRedirectCallback: voidFn,
      isAuthenticated: false,
      isLoading: false,
      loginWithPopup: voidFn,
      loginWithRedirect: voidFn,
      logout: voidFn,
      user: undefined,
    } as unknown as Auth0ContextInterface<User>;
  });

  it('should render', () => {
    cy.mountCandidateSignupFormPage(mockAuth0Context);

    cy.get('#nav-title-header').should('have.text', APPLICANT_FORM_TEXT.HEADER);
    cy.get('#nav-title-sign-in').should(
      'have.text',
      `${APPLICANT_FORM_TEXT.NAVAWAY}${APPLICANT_FORM_TEXT.SIGN_IN_LINK_COPY}`
    );
    cy.get('#nav-title-sign-in-link').should('have.attr', 'href', SIGN_IN_LINK);
    cy.get('#applicant-signup-org-navaway').should(
      'have.text',
      `${APPLICANT_FORM_TEXT.IFORG[0]}${APPLICANT_FORM_TEXT.IFORG[1]}`
    );
    cy.get('#applicant-signup-org-navaway a').should(
      'have.attr',
      'href',
      ORG_SIGNUP_LINK
    );
  });

  it('should show the spinner while loading', () => {
    mockAuth0Context.isLoading = true;

    cy.mountCandidateSignupFormPage(mockAuth0Context);

    cy.get('#loading-spinner').should('be.visible');
  });

  it('should show privacy modal and close it', () => {
    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.setShowPrivacyModal(true);

      cy.get('#table-modal-header').should(
        'have.text',
        PRIVACY_MODAL_TEXT.HEADER
      );

      cy.get('#close-table-modal').click();

      cy.get('#table-modal-header').should('not.exist');
    });
  });

  it('should redirect the user to the account page', () => {
    mockAuth0Context.isAuthenticated = true;
    mockAuth0Context.isLoading = false;
    mockAuth0Context.user = {};

    cy.mountCandidateSignupFormPage(mockAuth0Context);

    cy.wait(['@hasSubmitted', '@hasData']);

    cy.get('@submittedCall').should('have.been.calledOnce');
    cy.get('@dataCall').should('have.been.calledOnce');

    cy.get('@routerPush').should(
      'have.been.calledOnceWithExactly',
      ACCOUNT_LINK
    );
  });

  it('should redirect the user to the experience form', () => {
    mockAuth0Context.isAuthenticated = true;
    mockAuth0Context.isLoading = false;
    mockAuth0Context.user = {};
    mockHasSubmittedRes = { isFinal: false };

    cy.mountCandidateSignupFormPage(mockAuth0Context);

    cy.wait(['@hasSubmitted', '@hasData']);

    cy.get('@submittedCall').should('have.been.calledOnce');
    cy.get('@dataCall').should('have.been.calledOnce');

    cy.get('@routerPush').should(
      'have.been.calledOnceWithExactly',
      APPLICANT_EXPERIENCE_LINK
    );
  });

  it('should show the content after redirect check', () => {
    mockAuth0Context.isAuthenticated = true;
    mockAuth0Context.isLoading = false;
    mockAuth0Context.user = {};
    mockHasSubmittedRes = { isFinal: false };
    mockApplicantRes = {
      statusCode: 404,
      body: {},
    };

    cy.mountCandidateSignupFormPage(mockAuth0Context);

    cy.wait(['@hasSubmitted', '@hasData']);

    cy.get('@submittedCall').should('have.been.calledOnce');
    cy.get('@dataCall').should('have.been.calledOnce');

    cy.get('#mockContent').should('be.visible');
  });
});
