import '../support/commands';

describe('Candidate Application', () => {
  const navigationFormFillDelay = 250;

  beforeEach(() => {
    cy.bypassCloudflare();
    cy.visit('/sign-up/applicants');
  });

  it('Should submit a candidate, required fields only', () => {
    cy.url().should('include', '/sign-up/applicants');

    fillName();
    fillEmail();
    fillSearchStatus();
    fillContactMethod();
    acceptPrivacy();
    acceptTerms();
    submitCandidateSignup();

    // Wait for page navigation
    cy.url().should('include', '/sign-up/applicants/experience-and-interests');

    cy.wait(navigationFormFillDelay);
    fillPreviousRole();
    fillPreviousOrg();
    fillYearsOfExperience();

    saveAndConfirmExperienceForm();
    submitExperienceForm();

    cy.wait(navigationFormFillDelay);
    fillAndCheckEmploymentType();
    selectRoleInterest();
    fillCurrentLocation();
    fillOpenToRelocation();
    fillOpenToRemote();
    selectInterestCauses();
    fillEssay();
    saveAndConfirmInterestForm();
    submitInterestForm();

    // Confirm success
    cy.url().should('include', '/sign-up/applicants/success');
  });

  // it('Should submit a candidate, all fields', () => {

  // });

  function fillName(): void {
    cy.get('input[name=input-name]').type('Test User Name');
  }

  function fillEmail(): void {
    const randomEmail = `test-user-${new Date().getTime()}@schmidtfutures.com`;
    cy.get('input[name=input-email]').type(randomEmail);
  }

  function fillSearchStatus(): void {
    cy.get('input[name=input-searchStatus-active]').click();
  }

  function fillContactMethod(): void {
    cy.get('button[name=input-preferredContact]').click();
    cy.get('li[data-name=input-preferredContact-email]').click();
  }

  function acceptPrivacy(): void {
    cy.get('input[name=acceptedPrivacy]').click();
  }
  function acceptTerms(): void {
    cy.get('input[name=acceptedTerms]').click();
  }

  function submitCandidateSignup(): void {
    cy.get('button#submit-candidate-sign-up').click();
  }

  function fillPreviousRole(): void {
    cy.get('input[name=input-lastRole]').type('Software Engineer');
  }

  function fillPreviousOrg(): void {
    cy.get('input[name=input-lastOrg]').type('Schmidt Futures');
  }

  function fillYearsOfExperience(): void {
    cy.get('button[name=input-yoe]').click();
    cy.get('li[data-name=input-yoe-4]').click();
  }

  function saveAndConfirmExperienceForm(): void {
    cy.get('button#experience-save').click();
    cy.get('button[name=modal-confirm]').click();
  }

  function submitExperienceForm(): void {
    cy.get('button#experience-next').click();
  }

  function fillAndCheckEmploymentType(): void {
    cy.get('input#input-interestEmploymentType-full').click();
    cy.get('input[name=input-hoursPerWeek]').should('be.disabled');
    cy.get('input#input-interestEmploymentType-part').click();
    cy.get('input[name=input-hoursPerWeek]').should('not.be.disabled');
  }

  function selectRoleInterest(): void {
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
  }

  function fillCurrentLocation(): void {
    cy.get('input[name=input-currentLocation]').type('New York, New York');
  }

  function fillOpenToRelocation(): void {
    cy.get('button[name=input-openToRelocate]').click();
    cy.get('li[data-name=input-openToRelocate-yes]').click();
  }

  function fillOpenToRemote(): void {
    cy.get('button[name=input-openToRemote]').click();
    cy.get('li[data-name="input-openToRemote-only remote"]').click();
  }

  function selectInterestCauses(): void {
    cy.get('button[name=input-interestCauses]').click();
    cy.get(
      'li[data-name="input-interestCauses-human rights & social justice"]'
    ).click();
    cy.get('li[data-name="input-interestCauses-climate change"]').click();
    cy.get('li[data-name="input-interestCauses-tech policy"]').click();
    cy.get('li[data-name="input-interestCauses-environment"]').click();
    cy.get('button[name=input-interestCauses]').click();
  }

  function fillEssay(): void {
    cy.get('textarea[name=input-essayResponse]').type('Essay entry.');
  }

  function saveAndConfirmInterestForm(): void {
    cy.get('button#interest-save').click();
    cy.get('button[name=modal-confirm]').click();
  }

  function submitInterestForm(): void {
    cy.get('button#candidate-application-submit').click();
  }
});

export {};
