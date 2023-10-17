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

        expect(responseSubmission).to.deep.include({
          currentLocation: null,
          desiredSalary: null,
          essayResponse: null,
          githubUrl: null,
          hoursPerWeek: null,
          interestCauses: [],
          interestEmploymentType: [],
          interestRoles: [],
          interestWorkArrangement: [],
          lastOrg: 'Schmidt Futures',
          lastRole: 'Software Engineer',
          linkedInUrl: null,
          openToRelocate: null,
          openToRemoteMulti: [],
          otherCauses: [],
          otherSkills: [],
          portfolioPassword: null,
          portfolioUrl: null,
          previousImpactExperience: null,
          referenceAttribution: null,
          referenceAttributionOther: null,
          skills: [],
          workAuthorization: null,
          yoe: '4',
        });
        expect(responseSubmission.resumeUpload).to.include({
          originalFilename: 'example_file.docx',
        });

        // UTM Params
        expect(requestBody.utmParams).to.include({
          utm_campaign: '1',
          utm_content: '2',
          utm_id: '3',
          utm_medium: '4',
          utm_source_platform: '5',
          utm_source: '6',
          utm_term: '7',
        });
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

        expect(responseSubmission).to.deep.include({
          currentLocation: 'New York, New York',
          desiredSalary: null,
          essayResponse: 'Essay entry.',
          githubUrl: null,
          hoursPerWeek: null,
          interestCauses: ['algorithmic fairness'],
          interestEmploymentType: ['full', 'part'],
          interestRoles: ['software engineer'],
          interestWorkArrangement: ['advisor'],
          lastOrg: 'Schmidt Futures',
          lastRole: 'Software Engineer',
          linkedInUrl: null,
          openToRelocate: 'yes',
          openToRemoteMulti: ['remote'],
          otherCauses: [],
          otherSkills: [],
          portfolioPassword: null,
          portfolioUrl: null,
          previousImpactExperience: false,
          referenceAttribution: null,
          referenceAttributionOther: null,
          skills: [],
          workAuthorization: null,
          yoe: '4',
        });

        // The id is assigned by the db so we won't know what it is
        expect(responseSubmission.resumeUpload).to.include({
          originalFilename: 'example_file.docx',
        });
        expect(responseSubmission.resumeUpload?.id).to.be.a('number');

        // UTM Params
        expect(requestBody.utmParams).to.include({
          utm_campaign: '1',
          utm_content: '2',
          utm_id: '3',
          utm_medium: '4',
          utm_source_platform: '5',
          utm_source: '6',
          utm_term: '7',
        });
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

        expect(responseSubmission).to.deep.include({
          currentLocation: 'New York, New York',
          desiredSalary: '$200,000',
          essayResponse: 'Essay entry.',
          githubUrl: 'github',
          hoursPerWeek: '40hrs',
          interestEmploymentType: ['full', 'part'],
          interestGovt: true,
          interestGovtEmplTypes: ['paid', 'unpaid'],
          interestRoles: [
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
          ],
          interestWorkArrangement: [
            'advisor',
            'consultant',
            'contractor',
            'internship',
            'volunteer',
          ],
          lastOrg: 'Schmidt Futures',
          lastRole: 'Software Engineer',
          linkedInUrl: 'l',
          openToRelocate: 'yes',
          openToRemoteMulti: ['remote'],
          otherCauses: ['otherCause1', 'otherCause2'],
          otherSkills: ['otherSkill1', 'otherSkill2'],
          portfolioPassword: 'portfolioPwd',
          portfolioUrl: 'portfolioUrl',
          previousImpactExperience: true,
          referenceAttribution: 'other',
          referenceAttributionOther: 'Other Attribution',
          skills: [
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
          ],
          workAuthorization: 'authorized',
          yoe: '4',
        });
        expect(responseSubmission.resumeUpload).to.include({
          originalFilename: 'example_file.docx',
        });
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
    cy.get('input[name=input-lastRole]').type('Software Engineer');
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
