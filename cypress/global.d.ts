/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    bypassCloudflareAccess(): Chainable<void>;
    deleteTestData(deleteUrl: string): Chainable<void>;
    login(): Chainable<void>;
    validateLogin(): Chainable<void>;
  }
}
