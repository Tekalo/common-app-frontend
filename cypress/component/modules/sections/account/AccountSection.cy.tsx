import { getMockAuth0Context } from '@/cypress/fixtures/mocks';
import {
  ACCOUNT_PAGE_TEXT,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  BASE_LINK,
  EDIT_APP_LINK,
  ERROR_MODAL_TEXT,
} from '@/lang/en';
import {
  applicantSubmissionsEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/apiHelpers';
import SubmissionProvider from '@/lib/providers/SubmissionProvider';
import AccountSection from '@/modules/sections/account/AccountSection';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';
import * as routerModule from 'next/router';

Cypress.Commands.add('mountAccountSection', (auth0Context) => {
  cy.mount(
    <Auth0Context.Provider value={auth0Context}>
      <SubmissionProvider>
        <AccountSection></AccountSection>
      </SubmissionProvider>
    </Auth0Context.Provider>
  );
});

describe('Account Section', () => {
  const mockAccountName = 'Test User';
  let mockAuth0Context: Auth0ContextInterface<User>;
  let mockSubmissionResponse: any;
  let mockApplicantRes: any;

  beforeEach(() => {
    cy.stub(routerModule, 'useRouter').callsFake(() => {
      return {
        push: cy.stub().as('routerPush'),
      };
    });

    mockAuth0Context = getMockAuth0Context();
    mockAuth0Context.isAuthenticated = true;

    mockApplicantRes = {
      statusCode: 200,
      body: {
        name: mockAccountName,
        isPaused: false,
      },
    };

    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply(mockSubmissionResponse);
      })
    ).as('getSubmission');

    cy.intercept(
      {
        method: 'GET',
        url: existingApplicantEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply(mockApplicantRes);
      })
    ).as('getAccount');
  });

  describe('account checks', () => {
    beforeEach(() => {
      mockApplicantRes = { statusCode: 401 };
    });

    it('should bounce the user to the signup page if not authorized', () => {
      cy.mountAccountSection(mockAuth0Context);

      cy.get('@routerPush').should(
        'have.been.calledOnceWithExactly',
        APPLICANT_SIGNUP_LINK
      );
    });

    it('should set continue link to signup link if user does not exist', () => {
      mockApplicantRes = { statusCode: 404 };

      cy.mountAccountSection(mockAuth0Context);

      cy.get('a[data-name=continue-application-link]').should(
        'have.attr',
        'href',
        APPLICANT_SIGNUP_LINK
      );
    });

    it('should show the error modal if some other error is passed', () => {
      mockApplicantRes = { statusCode: 500 };

      cy.mountAccountSection(mockAuth0Context);

      cy.get('p#error-modal-description')
        .should('be.visible')
        .should('have.text', ERROR_MODAL_TEXT.somethingWrong);
    });
  });

  describe('submission checks', () => {
    it('should console log if user has no submissions', () => {
      cy.spy(console, 'log').as('consoleLog');
      cy.mountAccountSection(mockAuth0Context);

      cy.get('@consoleLog').should(
        'have.been.calledOnceWithExactly',
        'No submissions for this user'
      );
    });

    it('should bounce user to signup page if unauthorized', () => {
      mockSubmissionResponse = { statusCode: 401 };

      cy.mountAccountSection(mockAuth0Context);

      cy.get('@routerPush').should(
        'have.been.calledOnceWithExactly',
        APPLICANT_SIGNUP_LINK
      );
    });

    it('should show the error modal if some other error is passed', () => {
      mockSubmissionResponse = { statusCode: 500 };

      cy.mountAccountSection(mockAuth0Context);

      cy.get('p#error-modal-description')
        .should('be.visible')
        .should('have.text', ERROR_MODAL_TEXT.somethingWrong);
    });
  });

  describe('not authenticated', () => {
    it('should bounce user to home page if they are not authenticaated', () => {
      mockAuth0Context.isAuthenticated = false;

      cy.mountAccountSection(mockAuth0Context);

      cy.get('@routerPush').should(
        'have.been.calledOnceWithExactly',
        BASE_LINK
      );
    });
  });

  describe('application submitted', () => {
    it('should render', () => {
      cy.mountAccountSection(mockAuth0Context);

      cy.wait('@getAccount');

      cy.get('h3[data-name=account-greeting]').should(
        'have.text',
        `Welcome back, ${mockAccountName}`
      );

      cy.get('h4[data-name=account-subhead]').should(
        'have.text',
        ACCOUNT_PAGE_TEXT.MANAGE
      );

      cy.get('div[data-name=actions-header]').should(
        'have.text',
        ACCOUNT_PAGE_TEXT.ACCOUNT
      );

      cy.get('a[data-name=continue-application-link]')
        .should('have.text', ACCOUNT_PAGE_TEXT.APP_CONTINUE)
        .should('have.attr', 'href', APPLICANT_EXPERIENCE_LINK);

      cy.get('div[data-name=continue-link-subhead]').should(
        'have.text',
        ACCOUNT_PAGE_TEXT.APP_CONTINUE_BODY
      );

      cy.get('div[data-name=show-delete-modal-link]').should(
        'have.text',
        ACCOUNT_PAGE_TEXT.APP_DELETE_TITLE
      );

      cy.get('div[data-name=delete-data-subhead]').should(
        'have.text',
        ACCOUNT_PAGE_TEXT.APP_DELETE_BODY
      );
    });
  });

  describe('has submitted', () => {
    it('should show edit controls if application has been submitted', () => {
      mockSubmissionResponse = {
        isFinal: true,
        submission: {
          createdAt: '2023-06-26T17:51:26.219Z',
          updatedAt: '2023-09-21T18:46:37.721Z',
        },
      };

      cy.mountAccountSection(mockAuth0Context);

      cy.get('a[data-name=edit-application-link]')
        .should('have.text', ACCOUNT_PAGE_TEXT.APP_EDIT)
        .should('have.attr', 'href', EDIT_APP_LINK);

      cy.get('div[data-name=last-edited-date]').should(
        'have.text',
        'Last edited Sep, 21 2023'
      );
    });

    it('should show createdAt date if updatedDate is earlier', () => {
      mockSubmissionResponse = {
        isFinal: true,
        submission: {
          createdAt: '2023-06-06T17:51:26.219Z',
          updatedAt: '1970-09-21T18:46:37.721Z',
        },
      };

      cy.mountAccountSection(mockAuth0Context);

      cy.get('a[data-name=edit-application-link]')
        .should('have.text', ACCOUNT_PAGE_TEXT.APP_EDIT)
        .should('have.attr', 'href', EDIT_APP_LINK);

      cy.get('div[data-name=last-edited-date]').should(
        'have.text',
        'Last edited Jun, 6 2023'
      );
    });
  });
});
