import {
  ACCOUNT_LINK,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_FORM_TEXT,
  ERROR_MODAL_TEXT,
  ORG_SIGNUP_LINK,
  PRIVACY_MODAL_TEXT,
  SIGN_IN_LINK,
  TRACKING,
} from '@/lang/en';
import {
  applicantSubmissionsEndpoint,
  applicantsEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/apiHelpers';
import { NewCandidateType } from '@/lib/types';
import * as SignupFormModule from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import { ISignupForm } from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import ApplicantSignup from '@/pages/sign-up/applicants';

import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';
import router from 'next/router';

Cypress.Commands.add('mountCandidateSignupFormPage', (auth0Context) => {
  // TODO: We are setting childProps to the props passed into the child component
  // This way we can access them from the test file
  let childProps: ISignupForm;
  const MockSignupForm: React.FC<ISignupForm> = ({
    debugIsActive,
    isAuthenticated,
    isTurnstileValid,
    showUserExistsError,
    user,
    handleSubmit,
    setIsTurnstileValid,
    setShowPrivacyModal,
  }) => {
    childProps = {
      debugIsActive,
      isAuthenticated,
      isTurnstileValid,
      showUserExistsError,
      user,
      handleSubmit,
      setIsTurnstileValid,
      setShowPrivacyModal,
    };

    return (
      <div id="mockContent">
        {showUserExistsError ? (
          <p id="conflict-error">User exists error</p>
        ) : null}
        {!isTurnstileValid ? (
          <p id="turnstile-not-valid">Turnstile not valid</p>
        ) : null}
        <p>Mock Child Component</p>
      </div>
    );
  };

  // Mocking the child form so we don't have to deal with its imp. details
  // and we can grab the props passed to it
  cy.stub(SignupFormModule, 'default').callsFake(MockSignupForm);

  cy.mount(
    <Auth0Context.Provider value={auth0Context}>
      <ApplicantSignup />
    </Auth0Context.Provider>
  ).then(() => {
    return childProps;
  });
});

describe('Applicant Signup Page', () => {
  const voidFn = () => void {};
  const mockAuthToken = 'MOCK_AUTH_TOKEN';
  const mockTurnstileToken = 'XXX_TURNSTILE_XXX';

  let mockAuth0Context: Auth0ContextInterface<User>;
  // https://devdocs.io/cypress/api/commands/intercept#Providing-a-stub-response-with-req-reply
  let mockHasSubmittedRes: any;
  let mockApplicantRes: any;
  let mockFormValues: NewCandidateType;

  // Set up all our mocks
  beforeEach(() => {
    window.dataLayerEvent = cy.stub();
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
        cy.stub().returns(Promise.resolve(mockAuthToken)),
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

    mockFormValues = {
      acceptedPrivacy: true,
      acceptedTerms: true,
      email: 'test-user-607@schmidtfutures.com',
      followUpOptIn: true,
      name: 'Test User',
      phone: '+18102410000',
      preferredContact: 'sms',
      pronoun: 'she/her',
      searchStatus: 'active',
    } as NewCandidateType;
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

  it('should submit a regular, non-debug submission with all fields filled out', () => {
    cy.intercept(
      {
        method: 'POST',
        url: applicantsEndpoint,
      },
      cy
        .stub()
        .as('submissionResponse')
        .callsFake((req) => {
          expect(req.body).to.deep.equal(mockFormValues);
          expect(req.headers['content-type']).to.equal('application/json');
          expect(req.headers['x-turnstile-token']).to.equal(mockTurnstileToken);

          req.reply({ statusCode: 200 });
        })
    ).as('applicantSubmission');

    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.handleSubmit(mockFormValues, mockTurnstileToken);

      cy.wait('@applicantSubmission').then(() => {
        cy.get('@submissionResponse').should('have.been.calledOnce');

        expect(window.dataLayerEvent).to.have.been.calledOnceWithExactly(
          TRACKING.CANDIDATE_SIGNUP
        );
        expect(router.push).to.have.been.calledOnceWithExactly(
          APPLICANT_EXPERIENCE_LINK
        );
      });
    });
  });

  it('should submit a regular, non-debug submission with only required fields', () => {
    mockFormValues.followUpOptIn = false;
    mockFormValues.pronoun = '';

    const expectedFormValues = {
      acceptedPrivacy: true,
      acceptedTerms: true,
      email: 'test-user-607@schmidtfutures.com',
      followUpOptIn: false,
      name: 'Test User',
      phone: '+18102410000',
      preferredContact: 'sms',
      searchStatus: 'active',
    };

    cy.intercept(
      {
        method: 'POST',
        url: applicantsEndpoint,
      },
      cy
        .stub()
        .as('submissionResponse')
        .callsFake((req) => {
          expect(req.body).to.deep.equal(expectedFormValues);
          expect(req.headers['content-type']).to.equal('application/json');
          expect(req.headers['x-turnstile-token']).to.equal(mockTurnstileToken);

          req.reply({ statusCode: 200 });
        })
    ).as('applicantSubmission');

    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.handleSubmit(mockFormValues, mockTurnstileToken);

      cy.wait('@applicantSubmission').then(() => {
        cy.get('@submissionResponse').should('have.been.calledOnce');

        expect(window.dataLayerEvent).to.have.been.calledOnceWithExactly(
          TRACKING.CANDIDATE_SIGNUP
        );
        expect(router.push).to.have.been.calledOnceWithExactly(
          APPLICANT_EXPERIENCE_LINK
        );
      });
    });
  });

  it('should reject with bad turnstile token', () => {
    cy.stub(console, 'error');
    cy.intercept(
      {
        method: 'POST',
        url: applicantsEndpoint,
      },
      (req) =>
        req.reply({
          statusCode: 418,
        })
    ).as('badTurnstileSubmission');

    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.handleSubmit(mockFormValues, mockTurnstileToken);

      cy.wait('@badTurnstileSubmission').then(() => {
        expect(console.error).to.have.been.called.calledOnce;
        cy.get('#turnstile-not-valid').should('be.visible');
      });
    });
  });

  it('should notify the user that their account already exists', () => {
    cy.intercept(
      {
        method: 'POST',
        url: applicantsEndpoint,
      },
      (req) =>
        req.reply({
          statusCode: 409,
        })
    ).as('userConflictSubmission');

    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.handleSubmit(mockFormValues, mockTurnstileToken);

      cy.wait('@userConflictSubmission').then(() => {
        cy.get('#conflict-error').should('be.visible');
      });
    });
  });

  it('should should show error modal', () => {
    cy.intercept(
      {
        method: 'POST',
        url: applicantsEndpoint,
      },
      (req) =>
        req.reply({
          statusCode: 500,
        })
    ).as('otherErrorSubmission');

    cy.mountCandidateSignupFormPage(mockAuth0Context).then((testProps) => {
      testProps.handleSubmit(mockFormValues, mockTurnstileToken);

      cy.wait('@otherErrorSubmission').then(() => {
        cy.get('#error-modal-title').should(
          'have.text',
          ERROR_MODAL_TEXT.requestFailed
        );
        cy.get('#error-modal-description').should(
          'have.text',
          ERROR_MODAL_TEXT.somethingWrong
        );

        // Close modal
        cy.get('#error-modal-button-container button').click();
        cy.get('#error-modal-title').should('not.exist');
        cy.get('#error-modal-description').should('not.exist');
      });
    });
  });
});
