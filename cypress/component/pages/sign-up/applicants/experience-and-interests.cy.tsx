import { APPLICANT_FORM_TEXT } from '@/lang/en';
import { applicantSubmissionsEndpoint } from '@/lib/helpers/apiHelpers';
import { SubmissionResponseType } from '@/lib/types';
import * as ExperienceFormModule from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import { IExperienceForm } from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import * as InterestFormModule from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { IInterestForm } from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';
import ApplicantForms from '@/pages/sign-up/applicants/experience-and-interests';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';

export interface ExperienceAndInterestProps {
  experience: IExperienceForm;
  interest: IInterestForm;
}

Cypress.Commands.add('mountExperienceAndInterestFormPage', (auth0Context) => {
  let experienceProps: IExperienceForm;
  let interestProps: IInterestForm;

  const MockExperienceForm: React.FC<IExperienceForm> = ({
    handleNext,
    handleSave,
    savedForm,
    showUploadErrorModal,
  }) => {
    experienceProps = {
      handleNext,
      handleSave,
      savedForm,
      showUploadErrorModal,
    };
    return <>Experience Form</>;
  };
  const MockInterestForm: React.FC<IInterestForm> = ({
    handleSubmit,
    handleSave,
    savedForm,
  }) => {
    interestProps = {
      handleSubmit,
      handleSave,
      savedForm,
    };
    return <>Interest Form</>;
  };

  cy.stub(ExperienceFormModule, 'default').callsFake(MockExperienceForm);
  cy.stub(InterestFormModule, 'default').callsFake(MockInterestForm);

  cy.mount(
    <Auth0Context.Provider value={auth0Context}>
      <ApplicantForms />
    </Auth0Context.Provider>
  ).then(() => {
    return { experience: experienceProps, interest: interestProps };
  });
});

describe('Experience and Interest Page', () => {
  const voidFn = () => void {};
  const mockAuthToken = 'MOCK_AUTH_TOKEN';
  let mockAuth0Context: Auth0ContextInterface<User>;
  const mockSubmissionResponse: SubmissionResponseType = {
    submission: {},
    isFinal: false,
  };

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: applicantSubmissionsEndpoint,
      },
      cy.stub().callsFake((req) => {
        req.reply(mockSubmissionResponse);
      })
    );

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
  });

  it('should render', () => {
    cy.mountExperienceAndInterestFormPage(mockAuth0Context);

    cy.get('h3[data-name=page-header]').should(
      'contain.text',
      APPLICANT_FORM_TEXT.HEADER
    );
    cy.get('[data-name=timeline] li[data-index=0]').should(
      'have.attr',
      'data-state',
      'enabled'
    );
    cy.get('[data-name=timeline] li[data-index=1]').should(
      'have.attr',
      'data-state',
      'disabled'
    );
    cy.get('div[data-name=form-area]').should(
      'contain.text',
      'Experience Form'
    );
  });
});
