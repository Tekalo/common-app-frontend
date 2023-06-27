/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    deleteTestData(deleteUrl: string): Chainable<void>;
    login(): Chainable<void>;
    setupTestingEnvironment(): Chainable<void>;
    validateLogin(): Chainable<void>;
  }
}
