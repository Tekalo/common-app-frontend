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

  beforeEach(() => {
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
    cy.mountExperienceAndInterestFormPage(mockAuth0Context).then(
      (childProps: ExperienceAndInterestProps) => {
        console.log(childProps);
      }
    );
  });
});
