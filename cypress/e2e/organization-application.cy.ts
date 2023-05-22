import '../support/commands';

describe('Organization Application', () => {
  const formSubmissionDelay = 10000;

  beforeEach(() => {
    cy.bypassCloudflare();
    cy.visit('/sign-up/organizations');
  });

  it('Should submit opportunity, all fields', () => {
    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    fillContactPhone();
    selectCommitmentTypes();
    selectEoe();

    submitOrgSignUpForm();

    cy.get('div[data-name="Role 1"]').should('exist');

    // selectUnpaid();
    selectRoleType();
    fillOpportunityType();
    fillOtherRoleType();
    fillPositionTitle();
    fillJobDescriptionLink();
    fillPayRange();
    // fillHoursPerWeek();
    selectFullyRemote();
    fillLocation();
    selectVisaSponsorship();
    fillStartDate();
    selectYoe();
    selectDesiredSkills();
    fillOtherSkills();
    selectSimilarExperience();
    fillDesiredImpactExperience();
    fillRolePitch();

    // Review
    goToOrgReview();

    cy.get('div[data-name=review-page-title]').should('exist');
    acceptPrivacy();
    submitOrgApplication();

    cy.url({ timeout: formSubmissionDelay }).should(
      'include',
      'sign-up/organizations/success'
    );
  });

  function fillOrgName(): void {
    cy.get('input[name="input-organization.name"]').type('TestOrg1');
  }

  function selectOrgType(): void {
    cy.get('button[name="input-organization.type"]').click();
    cy.get('li[data-name="input-organization.type-501(c)(3)"]').click();
  }

  function selectOrgSize(): void {
    cy.get('button[name="input-organization.size"]').click();
    cy.get('li[data-name="input-organization.size-51-100"]').click();
  }

  function selectImpactAreas(): void {
    const input = cy.get('button[name="input-organization.impactAreas"]');

    input.click();
    cy.get(
      'li[data-name="input-organization.impactAreas-climate change"]'
    ).click();
    cy.get(
      'li[data-name="input-organization.impactAreas-human rights & social justice"]'
    ).click();
    cy.get('li[data-name="input-organization.impactAreas-education"]').click();
    input.click();
  }

  function fillContactName(): void {
    cy.get('input[name="input-contact.name"]').type('Contact Name');
  }

  function fillContactEmail(): void {
    cy.get('input[name="input-contact.email"]').type(
      'mscontactemailtest@schmidtfutures.com'
    );
  }

  function fillContactPhone(): void {
    cy.get('input[name="input-contact.phone"]').type('1212110009');
  }

  function selectCommitmentTypes(): void {
    cy.get('input#input-commitmentTypes-full').click();
    cy.get('input#input-commitmentTypes-part').click();
  }

  function selectEoe(): void {
    cy.get('button[name="input-organization.eoe"]').click();
    cy.get('li[data-name="input-organization.eoe-true"]').click();
  }

  function submitOrgSignUpForm(): void {
    cy.get('button#submit-org-sign-up').click();
  }

  function selectUnpaid(): void {
    cy.get('input[name=input-paid-false]').click();
  }

  function selectRoleType(): void {
    cy.get('button[name=input-roleType]').click();
    cy.get('li[data-name="input-roleType-software engineer"').click();
  }

  function fillOpportunityType(): void {
    cy.get('button[name=input-employmentTypeSelect]').click();
    cy.get(
      'li[data-name="input-employmentTypeSelect-full-time employee"]'
    ).click();
  }

  function fillOtherRoleType(): void {
    cy.get('input[name=input-employmentTypeText]').type(
      'Other type of role explained here'
    );
  }

  function fillPositionTitle(): void {
    cy.get('input[name=input-positionTitle').type(
      'Senior Software Engineer - Test'
    );
  }

  function fillJobDescriptionLink(): void {
    cy.get('input[name=input-jdUrl]').type('http://www.examplejoblisting.com');
  }

  function fillPayRange(): void {
    cy.get('input[name=input-salaryRange]').type('150k - 250k');
  }

  function fillHoursPerWeek(): void {
    cy.get('input[name=input-desiredHoursPerWeek]').type('30 - 40hrs');
  }

  function selectFullyRemote(): void {
    cy.get('input[name=input-fullyRemote-true]').click();
  }

  function fillLocation(): void {
    cy.get('input[name=input-location]').type('New York, New York');
  }

  function selectVisaSponsorship(): void {
    cy.get('button[name=input-visaSponsorship]').click();
    cy.get('li[data-name=input-visaSponsorship-no]').click();
  }

  function fillStartDate(): void {
    cy.get('input[name=input-desiredStartDate]').type('10/10/2023');
  }

  function selectYoe(): void {
    const input = cy.get('button[name=input-desiredYoe');

    input.click();
    cy.get('li[data-name=input-desiredYoe-2-4]').click();
    cy.get('li[data-name=input-desiredYoe-8-12]').click();
    input.click();
  }

  function selectDesiredSkills(): void {
    const input = cy.get('button[name=input-desiredSkills]');

    input.click();
    cy.get('li[data-name=input-desiredSkills-javascript]').click();
    cy.get('li[data-name=input-desiredSkills-python]').click();
    cy.get('li[data-name=input-desiredSkills-sql]').click();
    input.click();
  }

  function fillOtherSkills(): void {
    cy.get('input[name=input-desiredOtherSkills]').type(
      'otherSkill1, otherSkill2'
    );
  }

  function selectSimilarExperience(): void {
    cy.get('input[name=input-similarStaffed-true]').click();
  }

  function fillDesiredImpactExperience(): void {
    cy.get('textarea[name=input-desiredImpactExp]').type(
      'Desired impact-related experience goes here!'
    );
  }

  function fillRolePitch(): void {
    cy.get('textarea[name=input-pitchEssay]').type(
      'Here is the role pitch! Give it some extra text to make it longer.'
    );
  }

  function goToOrgReview(): void {
    cy.get('button#review').click();
  }

  function acceptPrivacy(): void {
    cy.get('input[name=acceptedPrivacy]').click();
  }

  function submitOrgApplication(): void {
    cy.get('button#submit-org-form').click();
  }
});
