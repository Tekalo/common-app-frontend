/// <reference types="cypress" />

import { ISignupForm } from '@/modules/sections/sign-up/forms/applicants/signupForm/SignupForm';
import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      // e2e test methods
      setupTestingEnvironment(): Chainable<void>;
      deleteTestData(deleteUrl: string): Chainable<void>;
      login(): Chainable<void>;
      validateLogin(): Chainable<void>;
      // Unit test methods
      mount: typeof mount;
      mountSignupForm(props: ISignupForm): Chainable<MountReturn>;
    }
  }
}
