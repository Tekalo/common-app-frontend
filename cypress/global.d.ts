/// <reference types="cypress" />

import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      bypassCloudflareAccess(): Chainable<void>;
      deleteTestData(deleteUrl: string): Chainable<void>;
      login(): Chainable<void>;
      validateLogin(): Chainable<void>;
      mount: typeof mount;
    }
  }
}
