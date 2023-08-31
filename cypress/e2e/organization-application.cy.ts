import { ORG_SIGNUP_LINK } from '@/lang/en';
import { EmploymentType } from '@/lib/enums';
import { opportunityBatchEndpoint } from '@/lib/helpers/apiHelpers';
import { OrgBatchSubmissionResponseType } from '@/lib/types';
import { Interception } from 'cypress/types/net-stubbing';
import '../support/commands';

import { OrganizationRoleSelectors as Selectors } from '@/cypress/support/selectors/organization-role.selectors';

type EmploymentFillTypes = typeof EmploymentType._input;

describe('Organization Application', () => {
  const reviewPageTitleSelector = 'h3[data-name=review-page-title]';

  beforeEach(() => {
    cy.setupTestingEnvironment();
    cy.visit(ORG_SIGNUP_LINK);
  });

  after(() => {
    cy.deleteTestData(opportunityBatchEndpoint);
  });

  it('Should submit opportunity, full-time only, required only', () => {
    cy.url().should('include', ORG_SIGNUP_LINK);

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    selectCommitmentTypes(['full']);
    selectEoe();
    selectAttribution();

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

  it('Should submit opportunity, full-time only, required only with free text attribution', () => {
    cy.url().should('include', ORG_SIGNUP_LINK);

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas();
    fillContactName();
    fillContactEmail();
    selectCommitmentTypes(['full']);
    selectEoe();
    selectOtherAttribution();
    textAttribution();

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
    cy.url().should('include', ORG_SIGNUP_LINK);

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

    cy.url().should('include', ORG_SIGNUP_LINK);

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

    cy.url().should('include', ORG_SIGNUP_LINK);

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
    cy.url().should('include', ORG_SIGNUP_LINK);

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
    cy.url().should('include', ORG_SIGNUP_LINK);

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

  it('Should submit opportunity, part and full-time, all fields with other role type filled out', () => {
    cy.url().should('include', ORG_SIGNUP_LINK);

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

    selectOtherRoleType();

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
    cy.url().should('include', 'sign-up/organizations/success');
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
    cy.get('input[name="input-organization.name"]').fastType('SF E2E Test Org');
  }

  function selectOrgType(): void {
    cy.get('button[name="input-organization.type"]').fastClick();
    cy.get('li[data-name="input-organization.type-501(c)(3)"]').fastClick();
  }

  function selectOrgSize(): void {
    cy.get('button[name="input-organization.size"]').fastClick();
    cy.get('li[data-name="input-organization.size-51-100"]').fastClick();
  }

  function selectImpactAreas(): void {
    const input = cy.get('button[name="input-organization.impactAreas"]');

    input.fastClick();
    cy.get(
      'li[data-name="input-organization.impactAreas-climate change"]'
    ).fastClick();
    cy.get(
      'li[data-name="input-organization.impactAreas-human rights & social justice"]'
    ).fastClick();
    cy.get(
      'li[data-name="input-organization.impactAreas-education"]'
    ).fastClick();
    input.fastClick();
  }

  function fillContactName(): void {
    cy.get('input[name="input-contact.name"]').fastType('Contact Name');
  }

  function fillContactEmail(): void {
    cy.get('input[name="input-contact.email"]').fastType(
      'test-user-contact@schmidtfutures.com'
    );
  }

  function fillContactPhone(): void {
    cy.get('input[name="input-contact.phone"]').type('+1212110009');
  }

  function selectCommitmentTypes(types: ('full' | 'part')[]): void {
    types.forEach((type) => {
      cy.get(`input#input-commitmentTypes-${type}`).fastClick();
    });
  }

  function selectEoe(): void {
    cy.get('button[name="input-organization.eoe"]').fastClick();
    cy.get('li[data-name="input-organization.eoe-true"]').fastClick();
  }

  function submitOrgSignUpForm(): void {
    cy.get('button#submit-org-sign-up').fastClick();
  }

  function selectPaidOrUnpaid(paid: 'paid' | 'unpaid'): void {
    const selector = paid === 'paid' ? 'true' : 'false';

    cy.get(`input[name=input-paid-${selector}]`).fastClick();
  }

  function selectRoleType(): void {
    cy.get('button[name=input-roleType]').fastClick();
    cy.get('li[data-name="input-roleType-software engineer"').fastClick();
  }

  function selectOtherRoleType(): void {
    cy.get(Selectors.roleType.input).fastClick();
    cy.get(Selectors.roleType.options.other).fastClick();
    cy.get(Selectors.roleType.input).should('have.text', 'Other');
    cy.wait(1000); // wait for animation to finish
    cy.get(Selectors.roleTypeOther.input).should('exist');
    cy.get(Selectors.roleTypeOther.input).fastType('Other role type');
  }

  function fillEmploymentType(types: EmploymentFillTypes[]): void {
    cy.get('button[name=input-employmentTypeSelect]').fastClick();

    types.forEach((type) => {
      cy.get(`li[data-name="input-employmentTypeSelect-${type}"]`).fastClick();
    });
  }

  function fillOtherRoleType(): void {
    cy.get('input[name=input-employmentTypeText]').fastType(
      'Other type of role explained here'
    );
  }

  function fillPositionTitle(): void {
    cy.get('input[name=input-positionTitle').fastType(
      'Senior Software Engineer - Test'
    );
  }

  function fillJobDescriptionLink(): void {
    cy.get('input[name=input-jdUrl]').fastType(
      'http://www.examplejoblisting.com'
    );
  }

  function fillSalaryRange(): void {
    cy.get('input[name=input-salaryRange]').fastType('150k - 250k');
  }

  function fillHoursPerWeek(): void {
    cy.get('input[name=input-desiredHoursPerWeek]').fastType('30 - 40hrs');
  }

  function selectFullyRemote(): void {
    cy.get('input[name=input-fullyRemote-true]').fastClick();
  }

  function fillLocation(): void {
    cy.get('input[name=input-location]').fastType('New York, New York');
  }

  function selectVisaSponsorship(): void {
    cy.get('button[name=input-visaSponsorship]').fastClick();
    cy.get('li[data-name=input-visaSponsorship-no]').fastClick();
  }

  function fillStartDate(): void {
    cy.get('input[name=input-desiredStartDate]').fastType('10/10/2023');
  }

  function fillEndDate(): void {
    cy.get('input[name=input-desiredEndDate]').fastType('10/10/2025');
  }

  function selectYoe(): void {
    const input = cy.get('button[name=input-desiredYoe');

    input.fastClick();
    cy.get('li[data-name=input-desiredYoe-3-5]').fastClick();
    cy.get('li[data-name=input-desiredYoe-9-12]').fastClick();
    input.fastClick();
  }

  function selectDesiredSkills(): void {
    const input = cy.get('button[name=input-desiredSkills]');

    input.fastClick();
    cy.get('li[data-name=input-desiredSkills-javascript]').fastClick();
    cy.get('li[data-name=input-desiredSkills-python]').fastClick();
    cy.get('li[data-name=input-desiredSkills-sql]').fastClick();
    input.fastClick();
  }

  function fillOtherSkills(): void {
    cy.get('input[name=input-desiredOtherSkills]').fastType(
      'otherSkill1, otherSkill2'
    );
  }

  function selectSimilarExperience(): void {
    cy.get('input[name=input-similarStaffed-true]').fastClick();
  }

  function fillDesiredImpactExperience(): void {
    cy.get('textarea[name=input-desiredImpactExp]').fastType(
      'Desired impact-related experience goes here!'
    );
  }

  function fillRolePitch(): void {
    cy.get('textarea[name=input-pitchEssay]').fastType(
      'Here is the role pitch! Give it some extra text to make it longer.'
    );
  }

  function goToOrgReview(): void {
    cy.get('button#review').fastClick();
  }

  function acceptPrivacy(): void {
    cy.get('input[name=input-acceptedPrivacy]').fastClick();
  }

  function submitOrgApplication(): void {
    cy.intercept({
      method: 'POST',
      url: opportunityBatchEndpoint,
    }).as('opportunityCreation');

    cy.get('button#submit-org-form').fastClick();

    cy.wait('@opportunityCreation').then((interception: Interception) => {
      const response = interception?.response
        ?.body as OrgBatchSubmissionResponseType;

      cy.task('storeUserId', response.id);
    });
  }

  function selectAttribution(): void {
    cy.get('button[name=input-referenceAttribution]').fastClick();
    cy.get('li[data-name=input-referenceAttribution-linkedIn]').fastClick();
  }

  function selectOtherAttribution(): void {
    cy.get('button[name=input-referenceAttribution]').fastClick();
    cy.get('li[data-name=input-referenceAttribution-other]').fastClick();
  }

  function textAttribution(): void {
    cy.get('input[name=input-referenceAttributionOther]').fastType(
      'A more specific reference'
    );
  }
});
