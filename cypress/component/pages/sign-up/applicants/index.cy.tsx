import {
  ACCOUNT_LINK,
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

  beforeEach(() => {
    cy.stub(router, 'push').as('routerPush');

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

  it('should show privacy modal', () => {
    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.setShowPrivacyModal(true);

      cy.get('#table-modal-header').should(
        'have.text',
        PRIVACY_MODAL_TEXT.HEADER
      );
    });
  });

  it.only('should redirect the user to the account page', () => {
    mockAuth0Context.isAuthenticated = true;
    mockAuth0Context.isLoading = false;
    mockAuth0Context.user = {};
    const mockHasSubmittedRes = {
      ok: true,
      body: { isFinal: true },
    };
    const mockApplicantRes = {
      ok: true,
    };

    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy
        .stub()
        .as('submittedCall')
        .callsFake((req) => req.reply(mockHasSubmittedRes))
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

    cy.mountCandidateSignupFormPage(mockAuth0Context);

    cy.wait(['@hasSubmitted', '@hasData']);

    cy.get('@submittedCall').should('have.been.calledOnce');
    cy.get('@dataCall').should('have.been.calledOnce');

    cy.get('@routerPush').should(
      'have.been.calledOnceWithExactly',
      ACCOUNT_LINK
    );
  });

  // it('should take form values on submission', () => {
  //   console.log(apiHelpers);

  //   cy.stub(apiHelpers, 'get')
  //     .as('hasSubmitted')
  //     .withArgs(applicantSubmissionsEndpoint, '')
  //     .returns(
  //       Promise.resolve({
  //         ok: true,
  //       })
  //     );
  // });
});
