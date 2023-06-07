import '../support/commands';

describe('Candidate Application', () => {
  // Just a little extra wait time for local api, it can be slow
  const formSubmissionTimeout = 10000;
  const navigationFormFillDelay = 250;

  beforeEach(() => {
    cy.bypassCloudflare();
    cy.visit('/sign-up/applicants');
  });

  it('Should submit a candidate, required fields only', () => {
    cy.url().should('include', '/sign-up/applicants');

    fillName();
    fillEmail();
    fillSearchStatus('active');
    fillContactMethod('email');
    acceptPrivacy();
    acceptTerms();
    submitCandidateSignup();

    cy.url({ timeout: formSubmissionTimeout }).should(
      'include',
      '/sign-up/applicants/experience-and-interests'
    );

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
    cy.url({ timeout: formSubmissionTimeout }).should(
      'include',
      '/sign-up/applicants/success'
    );
  });

  it('Should submit a candidate, all fields', () => {
    cy.url().should('include', '/sign-up/applicants');

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

    cy.url({ timeout: formSubmissionTimeout }).should(
      'include',
      '/sign-up/applicants/experience-and-interests'
    );

    cy.wait(navigationFormFillDelay);
    fillPreviousRole();
    fillPreviousOrg();
    fillYearsOfExperience();
    fillSkills(['react', 'javascript', 'devops']);
    fillOtherSkills();
    fillLinkedIn();
    fillPortfolio();
    fillPortfolioPwd();
    fillGithub();
    fillResume();
    fillResumePwd();

    saveAndConfirmExperienceForm();
    submitExperienceForm();

    cy.wait(navigationFormFillDelay);
    fillAndCheckEmploymentType();
    fillHoursPerWeek();
    selectRoleInterest();
    fillCurrentLocation();
    fillOpenToRelocation();
    fillOpenToRemote();
    fillDesiredSalary();
    selectInterestCauses();
    fillOtherCauses();
    selectWorkAuthorization();
    selectInterestGovt();
    selectInterestGovtTypes();
    fillPreviousExperience();
    fillEssay();
    selectAttribution();

    saveAndConfirmInterestForm();
    submitInterestForm();

    // Confirm success
    cy.url({ timeout: formSubmissionTimeout }).should(
      'include',
      '/sign-up/applicants/success'
    );
  });

  function fillName(): void {
    cy.get('input[name=input-name]').type('Test User Name');
  }

  function fillEmail(): void {
    const randomEmail = `test-user-${new Date().getTime()}@schmidtfutures.com`;
    cy.get('input[name=input-email]').type(randomEmail);
  }

  function fillPronouns(): void {
    cy.get('input[name=input-pronoun]').type('they/them');
  }

  // Note: any of these can be customized like this, depending on our future needs
  // We may want to make it so that all of them can have options passed
  function fillSearchStatus(status: 'active' | 'passive' | 'future'): void {
    cy.get(`input[name=input-searchStatus-${status}]`).click();
  }

  function fillContactMethod(method: 'email' | 'sms' | 'whatsapp'): void {
    cy.get('button[name=input-preferredContact]').click();
    cy.get(`li[data-name=input-preferredContact-${method}]`).click();
  }

  function fillPhoneNumber(): void {
    cy.get('input[name=input-phone]').type('+1 8102410001');
  }

  function acceptPrivacy(): void {
    cy.get('input[name=acceptedPrivacy]').click();
  }

  function acceptTerms(): void {
    cy.get('input[name=acceptedTerms]').click();
  }

  function acceptFollowUpOptIn(): void {
    cy.get('input[name=followUpOptIn]').click();
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

  function fillSkills(skills: string[]): void {
    cy.get('button[name=input-skills]').click();

    skills.forEach((skill) => {
      cy.get(`li[data-name=input-skills-${skill}]`).click();
    });

    cy.get('button[name=input-skills]').click();
  }

  function fillOtherSkills(): void {
    cy.get('input[name=input-otherSkills]').type('otherSkill1, otherSkill2');
  }

  function fillLinkedIn(): void {
    cy.get('input[name=input-linkedInUrl]').type('linkedInUrl');
  }

  function fillPortfolio(): void {
    cy.get('input[name=input-portfolioUrl]').type('portfolioUrl');
  }

  function fillPortfolioPwd(): void {
    cy.get('input[name=input-portfolioPassword]').type('portfolioPwd');
  }

  function fillGithub(): void {
    cy.get('input[name=input-githubUrl]').type('github');
  }

  function fillResume(): void {
    cy.get('input[name=input-resumeUrl]').type('resumeLink');
  }

  function fillResumePwd(): void {
    cy.get('input[name=input-resumePassword]').type('resumePwd');
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

  function fillHoursPerWeek(): void {
    cy.get('input[name=input-hoursPerWeek]').type('40hrs');
  }

  function selectRoleInterest(): void {
    const input = cy.get('button[name=input-interestRoles]');

    input.click();
    cy.get('li[data-name="input-interestRoles-software engineer"]').click();
    cy.get(
      'li[data-name="input-interestRoles-software engineer - backend"]'
    ).click();
    cy.get(
      'li[data-name="input-interestRoles-software engineer - frontend"]'
    ).click();
    cy.get('li[data-name="input-interestRoles-data analyst"]').click();
    input.click();
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

  function fillDesiredSalary(): void {
    cy.get('input[name=input-desiredSalary]').type('$200,000');
  }

  function selectInterestCauses(): void {
    const input = cy.get('button[name=input-interestCauses]');

    input.click();
    cy.get(
      'li[data-name="input-interestCauses-human rights & social justice"]'
    ).click();
    cy.get('li[data-name="input-interestCauses-climate change"]').click();
    cy.get('li[data-name="input-interestCauses-tech policy"]').click();
    cy.get('li[data-name="input-interestCauses-environment"]').click();
    input.click();
  }

  function fillOtherCauses(): void {
    cy.get('input[name=input-otherCauses]').type('otherCause1, otherCause2');
  }

  function selectWorkAuthorization(): void {
    cy.get('button[name=input-workAuthorization]').click();
    cy.get('li[data-name=input-workAuthorization-authorized]').click();
  }

  function selectInterestGovt(): void {
    cy.get('input[name=input-interestGovt-true]').click();
  }

  function selectInterestGovtTypes(): void {
    const input = cy.get('button[name=input-interestGovtEmplTypes]');

    input.click();
    cy.get('li[data-name=input-interestGovtEmplTypes-paid]').click();
    cy.get('li[data-name=input-interestGovtEmplTypes-unpaid]').click();
    input.click();
  }

  function fillPreviousExperience(): void {
    cy.get('input[name=input-previousImpactExperience-true]').click();
  }

  function fillEssay(): void {
    cy.get('textarea[name=input-essayResponse]').type('Essay entry.');
  }

  function selectAttribution(): void {
    cy.get('button[name=input-referenceAttribution]').click();
    cy.get('li[data-name=input-referenceAttribution-website]').click();
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
