import { getMockAuth0Context } from '@/cypress/fixtures/mocks';
import {
  ACCOUNT_PAGE_TEXT,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  ERROR_MODAL_TEXT,
} from '@/lang/en';
import {
  applicantSubmissionsEndpoint,
  existingApplicantEndpoint,
} from '@/lib/helpers/apiHelpers';
import SubmissionProvider from '@/lib/providers/SubmissionProvider';
import { SubmissionResponseType } from '@/lib/types';
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
  let mockSubmissionResponse: SubmissionResponseType;
  let mockApplicantRes: any;

  beforeEach(() => {
    cy.stub(routerModule, 'useRouter').callsFake(() => {
      return {
        push: cy.stub().as('routerPush'),
      };
    });

    mockAuth0Context = getMockAuth0Context();

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
      mockAuth0Context.isAuthenticated = true;
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

  describe('application submitted', () => {
    beforeEach(() => {
      mockAuth0Context.isAuthenticated = true;
    });

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
});
