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
import SignupForm, {
  ISignupForm,
} from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import '@cypress/code-coverage/support';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

Cypress.Commands.add('mountSignupForm', (props: ISignupForm) => {
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

// Example use:
// cy.mount(<MyComponent />)
