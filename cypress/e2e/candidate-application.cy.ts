import { CandidateSignupSelectors as Selectors } from '@/cypress/support/selectors/candidate-signup.selectors';
import {
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  APPLICANT_SUCCESS_LINK,
  CAUSE_ENUM_OPTIONS,
  SKILL_ENUM_OPTIONS,
} from '@/lang/en';
import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
  applicantsEndpoint,
} from '@/lib/helpers/apiHelpers';
import { gtmCookieName } from '@/lib/providers/gtmProvider';
import {
  AccountSubmissionResponseType,
  SubmissionResponseType,
} from '@/lib/types';
import { Interception } from 'cypress/types/net-stubbing';
import '../support/commands';

describe('Candidate Application', () => {
  beforeEach(() => {
    cy.setupTestingEnvironment();
    cy.visit(APPLICANT_SIGNUP_LINK);
  });

  // Clean up the test users we created
  after(() => {
    cy.deleteTestData('candidate');
  });

  it('should submit a candidate, required fields only', () => {
    cy.clearCookie(gtmCookieName);
    cy.visit(
      `${APPLICANT_SIGNUP_LINK}?utm_campaign=1&utm_content=2&utm_id=3&utm_medium=4&utm_source_platform=5&utm_source=6&utm_term=7`
    );

    cy.intercept({
      method: 'GET',
      url: applicantSubmissionsEndpoint,
    }).as('getSubmission');

    cy.intercept({
      method: 'POST',
      url: applicantDraftSubmissionsEndpoint,
    }).as('draftSave');

    cy.intercept({
      method: 'POST',
      url: applicantSubmissionsEndpoint,
    }).as('applicantSubmission');

    cy.url().should('include', APPLICANT_SIGNUP_LINK);

    fillName();
    fillEmail();
    fillSearchStatus('active');
    fillContactMethod('email');
    acceptPrivacy();
    acceptTerms();
    submitCandidateSignup();

    cy.url().should('include', APPLICANT_EXPERIENCE_LINK);
    cy.wait('@getSubmission');

    cy.then(() => {
      fillPreviousRole();
      fillPreviousOrg();
      fillYearsOfExperience();
      uploadDocXFile();

      saveAndConfirmExperienceForm();

      cy.wait('@draftSave').then((res) => {
        const requestBody = res.request.body;
        const responseBody = res.response?.body as SubmissionResponseType;
        const responseSubmission = responseBody.submission;

        expect(responseSubmission.currentLocation).to.equal(null);
        expect(responseSubmission.desiredSalary).to.equal(null);
        expect(responseSubmission.essayResponse).to.equal(null);
        expect(responseSubmission.githubUrl).to.equal(null);
        expect(responseSubmission.hoursPerWeek).to.equal(null);
        expect(responseSubmission.interestCauses).to.deep.equal([]);
        expect(responseSubmission.interestEmploymentType).to.deep.equal([]);
        expect(responseSubmission.interestRoles).to.deep.equal([]);
        expect(responseSubmission.interestWorkArrangement).to.deep.equal([]);
        expect(responseSubmission.lastOrg).to.equal('Schmidt Futures');
        expect(responseSubmission.lastRole).to.equal('Software Engineer');
        expect(responseSubmission.linkedInUrl).to.equal(null);
        expect(responseSubmission.openToRelocate).to.equal(null);
        expect(responseSubmission.openToRemoteMulti).to.deep.equal([]);
        expect(responseSubmission.otherCauses).to.deep.equal([]);
        expect(responseSubmission.otherSkills).to.deep.equal([]);
        expect(responseSubmission.portfolioPassword).to.equal(null);
        expect(responseSubmission.portfolioUrl).to.equal(null);
        expect(responseSubmission.previousImpactExperience).to.equal(null);
        expect(responseSubmission.referenceAttribution).to.equal(null);
        expect(responseSubmission.referenceAttributionOther).to.equal(null);
        expect(responseSubmission.resumeUpload?.originalFilename).to.equal(
          'example_file.docx'
        );
        expect(responseSubmission.skills).to.deep.equal([]);
        expect(responseSubmission.workAuthorization).to.equal(null);
        expect(responseSubmission.yoe).to.equal('4');

        // UTM Params
        expect(requestBody.utmParams.utm_campaign).to.equal('1');
        expect(requestBody.utmParams.utm_content).to.equal('2');
        expect(requestBody.utmParams.utm_id).to.equal('3');
        expect(requestBody.utmParams.utm_medium).to.equal('4');
        expect(requestBody.utmParams.utm_source_platform).to.equal('5');
        expect(requestBody.utmParams.utm_source).to.equal('6');
        expect(requestBody.utmParams.utm_term).to.equal('7');
        expect(requestBody.utmParams.ga_client_id).to.be.a('string');
        expect(requestBody.utmParams.ga_session_id).to.be.a('string');
      });

      submitExperienceForm();

      fillAndCheckEmploymentType();
      selectWorkArrangement(['advisor']);
      selectRoleInterest(['software engineer']);
      fillCurrentLocation();
      fillOpenToRelocation();
      fillOpenToRemoteMulti();
      selectInterestCauses(['algorithmic fairness']);
      fillEssay();
      saveAndConfirmInterestForm();
      submitInterestForm();

      cy.wait('@applicantSubmission').then((res) => {
        const requestBody = res.request.body;
        const responseBody = res.response?.body as SubmissionResponseType;
        const responseSubmission = responseBody.submission;

        expect(responseSubmission.currentLocation).to.equal(
          'New York, New York'
        );
        expect(responseSubmission.desiredSalary).to.equal(null);
        expect(responseSubmission.essayResponse).to.equal('Essay entry.');
        expect(responseSubmission.githubUrl).to.equal(null);
        expect(responseSubmission.hoursPerWeek).to.equal(null);
        expect(responseSubmission.interestCauses).to.deep.equal([
          'algorithmic fairness',
        ]);
        expect(responseSubmission.interestEmploymentType).to.deep.equal([
          'full',
          'part',
        ]);
        expect(responseSubmission.interestRoles).to.deep.equal([
          'software engineer',
        ]);
        expect(responseSubmission.interestWorkArrangement).to.deep.equal([
          'advisor',
        ]);
        expect(responseSubmission.lastOrg).to.equal('Schmidt Futures');
        expect(responseSubmission.lastRole).to.equal('Software Engineer');
        expect(responseSubmission.linkedInUrl).to.equal(null);
        expect(responseSubmission.openToRelocate).to.equal('yes');
        expect(responseSubmission.openToRemoteMulti).to.deep.equal(['remote']);
        expect(responseSubmission.otherCauses).to.deep.equal([]);
        expect(responseSubmission.otherSkills).to.deep.equal([]);
        expect(responseSubmission.portfolioPassword).to.equal(null);
        expect(responseSubmission.portfolioUrl).to.equal(null);
        expect(responseSubmission.previousImpactExperience).to.equal(false);
        expect(responseSubmission.referenceAttribution).to.equal(null);
        expect(responseSubmission.referenceAttributionOther).to.equal(null);
        expect(responseSubmission.resumeUpload?.originalFilename).to.equal(
          'example_file.docx'
        );
        expect(responseSubmission.skills).to.deep.equal([]);
        expect(responseSubmission.workAuthorization).to.equal(null);
        expect(responseSubmission.yoe).to.equal('4');

        // UTM Params
        expect(requestBody.utmParams.utm_campaign).to.equal('1');
        expect(requestBody.utmParams.utm_content).to.equal('2');
        expect(requestBody.utmParams.utm_id).to.equal('3');
        expect(requestBody.utmParams.utm_medium).to.equal('4');
        expect(requestBody.utmParams.utm_source_platform).to.equal('5');
        expect(requestBody.utmParams.utm_source).to.equal('6');
        expect(requestBody.utmParams.utm_term).to.equal('7');
        expect(requestBody.utmParams.ga_client_id).to.be.a('string');
        expect(requestBody.utmParams.ga_session_id).to.be.a('string');
      });

      // Confirm success
      cy.url().should('include', APPLICANT_SUCCESS_LINK);
    });
  });

  it('Should submit a candidate, all fields', () => {
    cy.intercept({
      method: 'GET',
      url: applicantSubmissionsEndpoint,
    }).as('getSubmission');

    cy.intercept({
      method: 'POST',
      url: applicantSubmissionsEndpoint,
    }).as('applicantSubmission');

    cy.url().should('include', APPLICANT_SIGNUP_LINK);

    fillName();
    fillEmail();
    fillPronouns();
    fillSearchStatus('passive');
    fillContactMethod('sms');
    fillPhoneNumber();
    acceptPrivacy();
    acceptTerms();
    acceptFollowUpOptIn();
    submitCandidateSignup();

    cy.url().should('include', APPLICANT_EXPERIENCE_LINK);
    cy.wait('@getSubmission');

    cy.then(() => {
      fillPreviousRole();
      fillPreviousOrg();
      fillYearsOfExperience();
      fillSkills([...SKILL_ENUM_OPTIONS]);
      fillOtherSkills();
      fillLinkedIn();
      fillPortfolio();
      fillPortfolioPwd();
      fillGithub();
      uploadDocXFile();

      saveAndConfirmExperienceForm();
      submitExperienceForm();

      fillAndCheckEmploymentType();
      selectWorkArrangement([
        'advisor',
        'consultant',
        'contractor',
        'internship',
        'volunteer',
      ]);
      fillHoursPerWeek();
      selectRoleInterest([
        'data analyst',
        'data scientist',
        'engineering manager',
        'product designer',
        'product manager',
        'software engineer',
        'software engineer - backend',
        'software engineer - frontend',
        'ux/ui designer',
        'ux researcher',
        'vp of engineering (or similar)',
        'vp of product (or similar)',
      ]);
      fillCurrentLocation();
      fillOpenToRelocation();
      fillOpenToRemoteMulti();
      fillDesiredSalary();
      selectInterestCauses();
      fillOtherCauses();
      selectWorkAuthorization();
      selectInterestGovt();
      selectInterestGovtTypes();
      fillPreviousExperience();
      fillEssay();
      selectAttribution('other');
      fillAttributionOther();

      saveAndConfirmInterestForm();
      submitInterestForm();

      cy.wait('@applicantSubmission').then((res) => {
        const responseBody = res.response?.body as SubmissionResponseType;
        const responseSubmission = responseBody.submission;

        expect(responseSubmission.currentLocation).to.equal(
          'New York, New York'
        );
        expect(responseSubmission.desiredSalary).to.equal('$200,000');
        expect(responseSubmission.essayResponse).to.equal('Essay entry.');
        expect(responseSubmission.githubUrl).to.equal('github');
        expect(responseSubmission.hoursPerWeek).to.equal('40hrs');
        expect(responseSubmission.interestEmploymentType).to.deep.equal([
          'full',
          'part',
        ]);
        expect(responseSubmission.interestGovt).to.equal(true);
        expect(responseSubmission.interestGovtEmplTypes).to.deep.equal([
          'paid',
          'unpaid',
        ]);
        expect(responseSubmission.interestRoles).to.deep.equal([
          'data analyst',
          'data scientist',
          'engineering manager',
          'product designer',
          'product manager',
          'software engineer',
          'software engineer - backend',
          'software engineer - frontend',
          'ux/ui designer',
          'ux researcher',
          'vp of engineering (or similar)',
          'vp of product (or similar)',
        ]);
        expect(responseSubmission.interestWorkArrangement).to.deep.equal([
          'advisor',
          'consultant',
          'contractor',
          'internship',
          'volunteer',
        ]);
        expect(responseSubmission.lastOrg).to.equal('Schmidt Futures');
        expect(responseSubmission.lastRole).to.equal('Software Engineer');
        expect(responseSubmission.linkedInUrl).to.equal('l');
        expect(responseSubmission.openToRelocate).to.equal('yes');
        expect(responseSubmission.openToRemoteMulti).to.deep.equal(['remote']);
        expect(responseSubmission.otherCauses).to.deep.equal([
          'otherCause1',
          'otherCause2',
        ]);
        expect(responseSubmission.otherSkills).to.deep.equal([
          'otherSkill1',
          'otherSkill2',
        ]);
        expect(responseSubmission.portfolioPassword).to.equal('portfolioPwd');
        expect(responseSubmission.portfolioUrl).to.equal('portfolioUrl');
        expect(responseSubmission.previousImpactExperience).to.equal(true);
        expect(responseSubmission.referenceAttribution).to.equal('other');
        expect(responseSubmission.referenceAttributionOther).to.equal(
          'Other Attribution'
        );
        expect(responseSubmission.resumeUpload?.originalFilename).to.equal(
          'example_file.docx'
        );
        expect(responseSubmission.skills).to.deep.equal([
          'react',
          'javascript',
          'python',
          'java',
          'sql',
          'privacy',
          'security',
          'devops',
          'figma',
          'sketch',
          'prototyping',
          'user research',
          'product development',
          'project management',
        ]);
        expect(responseSubmission.workAuthorization).to.equal('authorized');
        expect(responseSubmission.yoe).to.equal('4');
      });

      // Confirm success
      cy.url().should('include', APPLICANT_SUCCESS_LINK);
    });
  });

  function fillName(): void {
    cy.get(Selectors.name.input).fastType('Test User Name');
  }

  function fillEmail(): void {
    const randomEmail = `test-user-${new Date().getTime()}@schmidtfutures.com`;
    cy.get(Selectors.email.input).fastType(randomEmail);
  }

  function fillPronouns(): void {
    cy.get(Selectors.pronoun.input).fastType('they/them');
  }

  // Note: any of these can be customized like this, depending on our future needs
  // We may want to make it so that all of them can have options passed
  function fillSearchStatus(status: 'active' | 'passive' | 'future'): void {
    cy.get(`input[name=input-searchStatus-${status}]`).fastClick();
  }

  function fillContactMethod(method: 'email' | 'sms' | 'whatsapp'): void {
    cy.get(Selectors.contact.input).fastClick();
    cy.get(`li[data-name=input-preferredContact-${method}]`).fastClick();
  }

  function fillPhoneNumber(): void {
    cy.get(Selectors.phone.input).type('+1 8102410001');
  }

  function acceptPrivacy(): void {
    cy.get(Selectors.privacy.input).fastClick();
  }

  function acceptTerms(): void {
    cy.get(Selectors.terms.input).fastClick();
  }

  function acceptFollowUpOptIn(): void {
    cy.get(Selectors.followUp.input).fastClick();
  }

  function submitCandidateSignup(): void {
    cy.intercept({
      method: 'POST',
      url: applicantsEndpoint,
    }).as('applicantCreation');

    cy.get(Selectors.buttons.submit).fastClick();

    cy.wait('@applicantCreation').then((interception: Interception) => {
      const response = interception?.response
        ?.body as AccountSubmissionResponseType;

      cy.task('storeUserId', response.id);
    });
  }

  function fillPreviousRole(): void {
    cy.get('input[name=input-lastRole]').fastType('Software Engineer');
  }

  function fillPreviousOrg(): void {
    cy.get('input[name=input-lastOrg]').fastType('Schmidt Futures');
  }

  function fillYearsOfExperience(): void {
    cy.get('button[name=input-yoe]').fastClick();
    cy.get('li[data-name=input-yoe-4]').fastClick();
  }

  function fillSkills(skills: string[]): void {
    cy.get('button[name=input-skills]').fastClick();

    skills.forEach((skill) => {
      cy.get(`li[data-name="input-skills-${skill}"]`).fastClick();
    });

    cy.get('button[name=input-skills]').fastClick();
  }

  function fillOtherSkills(): void {
    cy.get('input[name=input-otherSkills]').fastType(
      'otherSkill1, otherSkill2'
    );
  }

  function fillLinkedIn(): void {
    cy.get('input[name=input-linkedInUrl]').fastType('linkedInUrl');
  }

  function fillPortfolio(): void {
    cy.get('input[name=input-portfolioUrl]').fastType('portfolioUrl');
  }

  function fillPortfolioPwd(): void {
    cy.get('input[name=input-portfolioPassword]').fastType('portfolioPwd');
  }

  function fillGithub(): void {
    cy.get('input[name=input-githubUrl]').fastType('github');
  }

  function saveAndConfirmExperienceForm(): void {
    cy.get('button#experience-save').fastClick();
    cy.get('button[name=modal-confirm]').fastClick();
  }

  function submitExperienceForm(): void {
    cy.get('button#experience-next').fastClick();
  }

  function fillAndCheckEmploymentType(): void {
    cy.get('input#input-interestEmploymentType-full').fastClick();
    cy.get('input[name=input-hoursPerWeek]').should('be.disabled');
    cy.get('input#input-interestEmploymentType-part').fastClick();
    cy.get('input[name=input-hoursPerWeek]').should('not.be.disabled');
  }

  function selectWorkArrangement(emplTypes: string[]): void {
    cy.get('button[name="input-interestWorkArrangement"]').fastClick();

    emplTypes.forEach((type) => {
      cy.get(
        `li[data-name="input-interestWorkArrangement-${type}"]`
      ).fastClick();
    });

    cy.get('button[name="input-interestWorkArrangement"]').fastClick();
  }

  function fillHoursPerWeek(): void {
    cy.get('input[name=input-hoursPerWeek]').fastType('40hrs');
  }

  function selectRoleInterest(roleTypes: string[]): void {
    const input = cy.get('button[name=input-interestRoles]');

    input.fastClick();

    roleTypes.forEach((role) => {
      cy.get(`li[data-name="input-interestRoles-${role}"]`).fastClick();
    });

    input.fastClick();
  }

  function fillCurrentLocation(): void {
    cy.get('input[name=input-currentLocation]').fastType('New York, New York');
  }

  function fillOpenToRelocation(): void {
    cy.get('button[name=input-openToRelocate]').fastClick();
    cy.get('li[data-name=input-openToRelocate-yes]').fastClick();
  }

  function fillOpenToRemoteMulti(): void {
    cy.get('button[name=input-openToRemoteMulti]').fastClick();
    cy.get('li[data-name="input-openToRemoteMulti-remote"]').fastClick();
    cy.get('button[name=input-openToRemoteMulti]').fastClick();
  }

  function fillDesiredSalary(): void {
    cy.get('input[name=input-desiredSalary]').fastType('$200,000');
  }

  function selectInterestCauses(selectedCauses?: string[]): void {
    const input = cy.get('button[name=input-interestCauses]');
    let shouldSelectOther = false;

    // Select 4 randomly and then other
    if (!selectedCauses?.length) {
      shouldSelectOther = true;
      const allCauses = [...CAUSE_ENUM_OPTIONS];
      selectedCauses = [];

      for (let i = 0; i < 4; i++) {
        const len = allCauses.length;
        const rndmIndex = Math.floor(Math.random() * len);

        selectedCauses.push(allCauses[rndmIndex]);
        allCauses.splice(rndmIndex, 1);
      }
    }

    input.fastClick();

    selectedCauses.forEach((cause: string) => {
      cy.get(`li[data-name="input-interestCauses-${cause}"]`).fastClick();
    });

    if (shouldSelectOther) {
      cy.get(`li[data-name="input-interestCauses-other"]`).fastClick();
    }

    input.fastClick();
  }

  function fillOtherCauses(): void {
    cy.get('input[name=input-otherCauses]').fastType(
      'otherCause1, otherCause2'
    );
  }

  function selectWorkAuthorization(): void {
    cy.get('button[name=input-workAuthorization]').fastClick();
    cy.get('li[data-name=input-workAuthorization-authorized]').fastClick();
  }

  function selectInterestGovt(): void {
    cy.get('input[name=input-interestGovt-true]').fastClick();
  }

  function selectInterestGovtTypes(): void {
    const input = cy.get('button[name=input-interestGovtEmplTypes]');

    input.fastClick();
    cy.get('li[data-name=input-interestGovtEmplTypes-paid]').fastClick();
    cy.get('li[data-name=input-interestGovtEmplTypes-unpaid]').fastClick();
    input.fastClick();
  }

  function fillPreviousExperience(): void {
    cy.get('input[name=input-previousImpactExperience-true]').fastClick();
  }

  function fillEssay(): void {
    cy.get('textarea[name=input-essayResponse]').fastType('Essay entry.');
  }

  function selectAttribution(type: string): void {
    cy.get('button[name=input-referenceAttribution]').fastClick();
    cy.get(`li[data-name="input-referenceAttribution-${type}"]`).fastClick();
  }

  function fillAttributionOther(): void {
    cy.get('input[name=input-referenceAttributionOther]').fastType(
      'Other Attribution'
    );
  }

  function saveAndConfirmInterestForm(): void {
    cy.get('button#interest-save').fastClick();
    cy.get('button[name=modal-confirm]').fastClick();
  }

  function submitInterestForm(): void {
    cy.get('button#candidate-application-submit').fastClick();
  }

  function uploadDocXFile(): void {
    const fileName = 'example_file.docx';

    cy.get('#upload-button-input-resumeUpload').selectFile(
      {
        contents: Cypress.Buffer.from([
          0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00,
        ]),
        fileName,
      },
      { force: true }
    );

    cy.get('span[data-name=file-name]')
      .should('be.visible')
      .should('have.text', fileName);
  }
});

export {};
