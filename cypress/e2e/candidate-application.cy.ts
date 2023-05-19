import '../support/commands';

describe('Candidate Application', () => {
  beforeEach(() => {
    cy.bypassCloudflare();
    cy.visit('/sign-up/applicants');
  });

  it('Should submit a candidate, required fields only', () => {
    cy.url().should('include', '/sign-up/applicants');

    const randomEmail = `test-user-${Math.random()}@schmidtfutures.com`;

    // Fill out required fields
    cy.get('input[name=input-name]').type('Test User Name');
    cy.get('input[name=input-email]').type(randomEmail);
    cy.get('input[name=input-searchStatus-active]').click();
    cy.get('button[name=input-preferredContact]').click();
    cy.get('li[data-name=input-preferredContact-email]').click();
    cy.get('input[name=acceptedPrivacy]').click();
    cy.get('input[name=acceptedTerms]').click();
    cy.get('button#submit-candidate-application').click();

    // Wait for page navigation
    cy.url().should('include', '/sign-up/applicants/experience-and-interests');

    // Fill out required experience fields
    cy.wait(200);
    cy.get('input[name=input-lastRole]').type('Software Engineer');
    cy.get('input[name=input-lastOrg]').type('Schmidt Futures');
    cy.get('button[name=input-yoe]').click();
    cy.get('li[data-name=input-yoe-4]').click();
    cy.get('button#experience-save').click();
    cy.get('button[name=modal-confirm]').click();
    cy.get('button#experience-next').click();

    // Fill out required interest form
    cy.wait(200);
    cy.get('input#input-interestEmploymentType-full').click();
    cy.get('input[name=input-hoursPerWeek]').should('be.disabled');
    cy.get('input#input-interestEmploymentType-part').click();
    cy.get('input[name=input-hoursPerWeek]').should('not.be.disabled');

    // Roles
    cy.get('button[name=input-interestRoles]').click();
    cy.get('li[data-name="input-interestRoles-software engineer"]').click();
    cy.get(
      'li[data-name="input-interestRoles-software engineer - backend"]'
    ).click();
    cy.get(
      'li[data-name="input-interestRoles-software engineer - frontend"]'
    ).click();
    cy.get('li[data-name="input-interestRoles-data analyst"]').click();
    cy.get('button[name=input-interestRoles]').click();

    cy.get('input[name=input-currentLocation]').type('New York, New York');

    // Relocation
    cy.get('button[name=input-openToRelocate]').click();
    cy.get('li[data-name=input-openToRelocate-yes]').click();

    // Remote
    cy.get('button[name=input-openToRemote]').click();
    cy.get('li[data-name="input-openToRemote-only remote"]').click();
  });

  it('Should submit a candidate, all fields');
});

export {};
