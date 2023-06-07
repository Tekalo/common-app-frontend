import { EmploymentType } from '@/lib/enums';
import '../support/commands';

type EmploymentFillTypes = typeof EmploymentType._input;

describe('Organization Application', () => {
  const formSubmissionDelay = 10000;
  const reviewPageTitleSelector = 'h3[data-name=review-page-title]';

  beforeEach(() => {
    cy.bypassCloudflare();
    cy.visit('/sign-up/organizations');
  });

  it('Should submit opportunity, full-time only, required only', () => {
    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    selectCommitmentTypes(['full']);
    selectEoe();

    submitOrgSignUpForm();

    // Role Form
    cy.get('div[data-name="Role 1"]').should('exist');
    doFullTimeChecks();

    selectRoleType();
    fillPositionTitle();
    fillSalaryRange();
    selectFullyRemote();
    selectVisaSponsorship();
    selectYoe();
    selectSimilarExperience();
    fillRolePitch();

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  it('Should submit opportunity, full-time only, all fields', () => {
    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    fillContactPhone();
    selectCommitmentTypes(['full']);
    selectEoe();

    submitOrgSignUpForm();

    // Role Form
    cy.get('div[data-name="Role 1"]').should('exist');
    doFullTimeChecks();

    selectRoleType();
    fillPositionTitle();
    fillJobDescriptionLink();
    fillSalaryRange();
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

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  it('Should submit opportunity, part-time only, required only', () => {
    /*
      TEST FLOW:
        Sign up
        Check correct fields are hidden/shown
        Check Paid/unpaid options are correct
        Fill required fields
    */

    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    selectCommitmentTypes(['part']);
    selectEoe();

    submitOrgSignUpForm();

    // Role Form
    cy.get('div[data-name="Role 1"]').should('exist');
    doPartTimeChecks();
    doPartTimeUnpaidChecks();
    doPartTimePaidChecks();

    selectRoleType();
    fillEmploymentType(['other']);
    fillOtherRoleType();
    fillPositionTitle();
    fillSalaryRange();
    selectFullyRemote();
    selectVisaSponsorship();
    selectYoe();
    selectSimilarExperience();
    fillRolePitch();

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  it('Should submit opportunity, part-time only, all fields', () => {
    /*
      TEST FLOW:
        Sign up
        Check correct fields are hidden/shown
        Check Paid/unpaid options are correct
        Fill all fields
    */

    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    fillContactPhone();
    selectCommitmentTypes(['part']);
    selectEoe();

    submitOrgSignUpForm();

    // Role form
    cy.get('div[data-name="Role 1"]').should('exist');
    doPartTimeChecks();
    doPartTimeUnpaidChecks();
    doPartTimePaidChecks();

    selectRoleType();
    fillEmploymentType(['contractor']);
    fillOtherRoleType();
    fillPositionTitle();
    fillJobDescriptionLink();
    fillSalaryRange();
    fillHoursPerWeek();
    selectFullyRemote();
    fillLocation();
    selectVisaSponsorship();
    fillStartDate();
    fillEndDate();
    selectYoe();
    selectDesiredSkills();
    fillOtherSkills();
    selectSimilarExperience();
    fillDesiredImpactExperience();
    fillRolePitch();

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  it('Should submit opportunity, part and full-time, required only', () => {
    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    fillContactPhone();
    selectCommitmentTypes(['full', 'part']);
    selectEoe();

    submitOrgSignUpForm();

    // Role form
    cy.get('div[data-name="Role 1"]').should('exist');
    doPartTimeUnpaidChecks();

    selectPaidOrUnpaid('paid');

    selectRoleType();

    fillEmploymentType(['full-time employee']);
    cy.get('input[name=input-desiredHoursPerWeek]').should('be.disabled');

    fillPositionTitle();
    fillSalaryRange();
    selectFullyRemote();
    selectVisaSponsorship();
    selectYoe();
    selectSimilarExperience();
    fillRolePitch();

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  it('Should submit opportunity, part and full-time, all fields', () => {
    cy.url().should('include', '/sign-up/organizations');

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    fillContactPhone();
    selectCommitmentTypes(['full', 'part']);
    selectEoe();

    submitOrgSignUpForm();

    // Role form
    cy.get('div[data-name="Role 1"]').should('exist');
    doPartTimeUnpaidChecks();

    selectPaidOrUnpaid('paid');

    selectRoleType();

    fillEmploymentType(['internship']);
    cy.get('input[name=input-desiredHoursPerWeek]').should('not.be.disabled');
    fillOtherRoleType();
    fillPositionTitle();
    fillJobDescriptionLink();
    fillSalaryRange();
    fillHoursPerWeek();
    selectFullyRemote();
    selectVisaSponsorship();
    fillStartDate();
    selectYoe();
    selectDesiredSkills();
    fillOtherSkills();
    selectSimilarExperience();
    fillDesiredImpactExperience();
    fillRolePitch();

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  function checkSuccessPage(): void {
    cy.url({ timeout: formSubmissionDelay }).should(
      'include',
      'sign-up/organizations/success'
    );
  }

  function doFullTimeChecks(): void {
    cy.get('input[name=input-paid-true]').should('be.hidden');
    cy.get('button[name=input-employmentTypeSelect]').should('be.hidden');
    cy.get('input[name=input-employmentTypeText]').should('be.hidden');
    cy.get('input[name=input-desiredHoursPerWeek]').should('not.exist');
  }

  function doPartTimeChecks(): void {
    cy.get('input[name=input-paid-true]').should('be.visible');
    cy.get('button[name=input-employmentTypeSelect]').should('be.visible');
    cy.get('input[name=input-employmentTypeText]').should('be.visible');
    cy.get('input[name=input-desiredHoursPerWeek]').should('be.visible');
  }

  function doPartTimeUnpaidChecks(): void {
    selectPaidOrUnpaid('unpaid');
    cy.get(
      'li[data-name="input-employmentTypeSelect-full-time employee"]'
    ).should('not.exist');
    cy.get('li[data-name="input-employmentTypeSelect-contractor"]').should(
      'not.exist'
    );
    cy.get('li[data-name="input-employmentTypeSelect-consultant"]').should(
      'not.exist'
    );
    cy.get('li[data-name="input-employmentTypeSelect-internship"]').should(
      'not.exist'
    );
    cy.get('input[name=input-salaryRange]').should('be.disabled');
    fillEmploymentType(['volunteer']);
    cy.get('button[name=input-visaSponsorship]').should('be.disabled');
  }

  function doPartTimePaidChecks(): void {
    selectPaidOrUnpaid('paid');
    cy.get(
      'li[data-name="input-employmentTypeSelect-full-time employee"]'
    ).should('not.exist');
    cy.get('input[name=input-salaryRange]').should('not.be.disabled');
  }

  function fillOrgName(): void {
    cy.get('input[name="input-organization.name"]').type('SF E2E Test Org');
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

  function selectCommitmentTypes(types: ('full' | 'part')[]): void {
    types.forEach((type) => {
      cy.get(`input#input-commitmentTypes-${type}`).click();
    });
  }

  function selectEoe(): void {
    cy.get('button[name="input-organization.eoe"]').click();
    cy.get('li[data-name="input-organization.eoe-true"]').click();
  }

  function submitOrgSignUpForm(): void {
    cy.get('button#submit-org-sign-up').click();
  }

  function selectPaidOrUnpaid(paid: 'paid' | 'unpaid'): void {
    const selector = paid === 'paid' ? 'true' : 'false';

    cy.get(`input[name=input-paid-${selector}]`).click();
  }

  function selectRoleType(): void {
    cy.get('button[name=input-roleType]').click();
    cy.get('li[data-name="input-roleType-software engineer"').click();
  }

  function fillEmploymentType(types: EmploymentFillTypes[]): void {
    cy.get('button[name=input-employmentTypeSelect]').click();

    types.forEach((type) => {
      cy.get(`li[data-name="input-employmentTypeSelect-${type}"]`).click();
    });
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

  function fillSalaryRange(): void {
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

  function fillEndDate(): void {
    cy.get('input[name=input-desiredEndDate]').type('10/10/2025');
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
    // TODO: Figure out how long this should be
    // >3s && <10s
    cy.wait(5000);
    cy.get('button#submit-org-form').click();
  }
});
