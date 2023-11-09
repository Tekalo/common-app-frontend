import '@/cypress/support/commands';
import { OrganizationRoleSelectors as RoleSelectors } from '@/cypress/support/selectors/organization-role.selectors';
import { OrganizationSignupSelectors } from '@/cypress/support/selectors/organization-signup.selectors';
import {
  CAUSE_ENUM_OPTIONS,
  ORG_SIGNUP_LINK,
  REF_ENUM_OPTIONS,
  ROLE_ENUM_OPTIONS,
  YOE_RANGE_ENUM_OPTIONS,
} from '@/lang/en';
import { EmploymentType } from '@/lib/enums';
import { opportunityBatchEndpoint } from '@/lib/helpers/apiHelpers';
import { OrgBatchSubmissionResponseType } from '@/lib/types';
import { Interception } from 'cypress/types/net-stubbing';

type EmploymentFillTypes = typeof EmploymentType._input;

describe('Organization Application', () => {
  const reviewPageTitleSelector = 'h3[data-name=review-page-title]';

  beforeEach(() => {
    cy.setupTestingEnvironment();
    cy.visit(ORG_SIGNUP_LINK);
  });

  after(() => {
    cy.deleteTestData('opportunity');
  });

  it('Should submit opportunity, full-time only, required only', () => {
    cy.url().should('include', ORG_SIGNUP_LINK);

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas([getRandomEntry([...CAUSE_ENUM_OPTIONS], true)]);
    fillContactName();
    fillContactEmail();
    selectCommitmentTypes(['full']);
    selectEoe();
    selectAttribution(getRandomEntry([...REF_ENUM_OPTIONS], true));

    submitOrgSignUpForm();

    // Role Form
    cy.get('div[data-name="Role 1"]').should('exist');
    doFullTimeChecks();

    selectRoleType(getRandomEntry([...ROLE_ENUM_OPTIONS], true));
    fillPositionTitle();
    fillSalaryRange();
    selectFullyRemote();
    selectVisaSponsorship();
    selectYoe([getRandomEntry([...YOE_RANGE_ENUM_OPTIONS], true)]);
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
    selectImpactAreas([...CAUSE_ENUM_OPTIONS]);
    fillContactName();
    fillContactEmail();
    fillContactPhone();
    selectCommitmentTypes(['full']);
    selectEoe();
    selectAttribution('other');
    textAttribution();

    submitOrgSignUpForm();

    // Role Form
    cy.get('div[data-name="Role 1"]').should('exist');
    doFullTimeChecks();

    selectRoleType('other');
    fillRoleOther();
    fillPositionTitle();
    fillJobDescriptionLink();
    fillSalaryRange();
    selectFullyRemote();
    fillLocation();
    selectVisaSponsorship();
    fillStartDate();
    selectYoe([...YOE_RANGE_ENUM_OPTIONS]);
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

  it('Should submit opportunity, part-time only unpaid, required only', () => {
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
    selectImpactAreas([getRandomEntry([...CAUSE_ENUM_OPTIONS], true)]);
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

    selectRoleType(getRandomEntry([...ROLE_ENUM_OPTIONS], true));
    fillEmploymentType(['other']);
    fillOtherRoleType();
    fillPositionTitle();
    fillSalaryRange();

    selectFullyRemote();
    selectVisaSponsorship();
    selectYoe([getRandomEntry([...YOE_RANGE_ENUM_OPTIONS])]);
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
    cy.url().should('include', ORG_SIGNUP_LINK);

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas([...CAUSE_ENUM_OPTIONS]);
    fillImpactAreasOther();
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

    selectRoleType(getRandomEntry([...ROLE_ENUM_OPTIONS], true));
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
    selectYoe([...YOE_RANGE_ENUM_OPTIONS]);
    selectDesiredSkills();
    fillOtherSkills();
    selectSimilarExperience();
    fillDesiredImpactExperience();
    fillRolePitch();

    goToOrgReview();

    // Review form
    cy.get(reviewPageTitleSelector).should('exist');
    cy.get('span[data-name="label-orgImpactAreasOther"]').should(
      'have.text',
      'Other impact areas: '
    );
    cy.get('span[data-name="value-orgImpactAreasOther"]').should(
      'have.text',
      'impact Area 1, impact Area 2, impact Area 3'
    );
    acceptPrivacy();
    submitOrgApplication();

    checkSuccessPage();
  });

  it('Should submit opportunity, part and full-time, required only', () => {
    cy.url().should('include', ORG_SIGNUP_LINK);

    fillOrgName();
    selectOrgType();
    selectOrgSize();
    selectImpactAreas([getRandomEntry([...CAUSE_ENUM_OPTIONS], true)]);
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

    selectRoleType(getRandomEntry([...ROLE_ENUM_OPTIONS], true));

    fillEmploymentType(['full-time employee']);
    cy.get('input[name=input-desiredHoursPerWeek]').should('be.disabled');

    fillPositionTitle();
    fillSalaryRange();
    selectFullyRemote();
    selectVisaSponsorship();
    selectYoe([getRandomEntry([...YOE_RANGE_ENUM_OPTIONS])]);
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
    selectImpactAreas([...CAUSE_ENUM_OPTIONS]);
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

    selectRoleType(getRandomEntry([...ROLE_ENUM_OPTIONS], true));

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
    selectYoe([...YOE_RANGE_ENUM_OPTIONS]);
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
    selectImpactAreas([...CAUSE_ENUM_OPTIONS]);
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
    selectYoe([...YOE_RANGE_ENUM_OPTIONS]);
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

  function getRandomEntry(arr: string[], omitLast = false): string {
    const max = omitLast ? arr.length - 1 : arr.length;
    const randomIndex = Math.floor(Math.random() * max);

    return arr[randomIndex];
  }

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
    cy.get('input[name=input-salaryRange]').should('not.exist');
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

  function selectImpactAreas(areas: string[]): void {
    const input = cy.get('button[name="input-organization.impactAreas"]');

    input.fastClick();

    areas.forEach((area) => {
      cy.get(
        `li[data-name="input-organization.impactAreas-${area}"]`
      ).fastClick();
    });

    input.fastClick();
  }

  function fillImpactAreasOther(): void {
    cy.get(OrganizationSignupSelectors.impactAreasOther.input).fastType(
      'impact Area 1, impact Area 2, impact Area 3'
    );
  }

  function fillContactName(): void {
    cy.get('input[name="input-contact.name"]').fastType('Contact Name');
  }

  function fillContactEmail(): void {
    cy.get('input[name="input-contact.email"]').fastType(
      'success+test-user-contact@simulator.amazonses.com'
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

  function selectRoleType(roleType: string): void {
    cy.get('button[name=input-roleType]').fastClick();
    cy.get(`li[data-name="input-roleType-${roleType}"`).fastClick();
  }

  function fillRoleOther(): void {
    cy.get('input[name=input-otherRoleType]').fastType('Other role type');
  }

  function selectOtherRoleType(): void {
    cy.get(RoleSelectors.roleType.input).fastClick();
    cy.get(RoleSelectors.roleType.options.other).fastClick();
    cy.get(RoleSelectors.roleType.input).should('have.text', 'Other');
    cy.get(RoleSelectors.roleTypeOther.input).should('exist');
    cy.get(RoleSelectors.roleTypeOther.input).fastType('Other role type');
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

  function selectYoe(options: string[]): void {
    const input = cy.get('button[name=input-desiredYoe');

    input.fastClick();

    options.forEach((opt) => {
      cy.get(`li[data-name="input-desiredYoe-${opt}"]`).fastClick();
    });

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

      cy.task('storeOppId', response.id);
    });
  }

  function selectAttribution(attribution: string): void {
    cy.get('button[name=input-referenceAttribution]').fastClick();
    cy.get(
      `li[data-name="input-referenceAttribution-${attribution}"]`
    ).fastClick();
  }

  function textAttribution(): void {
    cy.get('input[name=input-referenceAttributionOther]').fastType(
      'A more specific reference'
    );
  }
});
