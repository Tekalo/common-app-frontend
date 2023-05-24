declare namespace Cypress {
  interface Chainable {
    bypassCloudflare(): Chainable<void>;
    login(): Chainable<void>;
  }
}
