Cypress.Commands.add('bypassCloudflare', (): void => {
  cy.visit({
    url: '/',
    headers: {
      'CF-Access-Client-Id': Cypress.env('cf_access_id'),
      'CF-Access-Client-Secret': Cypress.env('cf_access_secret'),
    },
  });
});

export {};
