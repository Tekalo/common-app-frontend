// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import * as SignupFormModule from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import SignupForm, {
  ISignupForm,
} from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import ApplicantSignup from '@/pages/sign-up/applicants';
import { Auth0Context } from '@auth0/auth0-react';
import '@cypress/code-coverage/support';
import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('mountCandidateSignupForm', (props: ISignupForm) => {
  return cy.mount(
    <SignupForm
      debugIsActive={props.debugIsActive}
      isAuthenticated={props.isAuthenticated}
      isTurnstileValid={props.isTurnstileValid}
      showUserExistsError={props.showUserExistsError}
      user={props.user}
      handleSubmit={props.handleSubmit}
      setIsTurnstileValid={props.setIsTurnstileValid}
      setShowPrivacyModal={props.setShowPrivacyModal}
    />
  );
});

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

    return <>Mock Child Component</>;
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
