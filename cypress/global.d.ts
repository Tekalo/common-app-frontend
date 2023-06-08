declare namespace Cypress {
  interface Chainable {
    bypassCloudflareAccess(): Chainable<void>;
    login(): Chainable<void>;
    validateLogin(): Chainable<void>;
  }
}
