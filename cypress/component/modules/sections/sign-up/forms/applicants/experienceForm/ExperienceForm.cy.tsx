import { voidFn } from '@/cypress/fixtures/mocks';
import { ERROR_TEXT } from '@/lang/en';
import { DraftSubmissionType } from '@/lib/types';
import ExperienceForm, {
  IExperienceForm,
} from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';

Cypress.Commands.add('mountExperienceForm', (props: IExperienceForm) => {
  cy.mount(
    <ExperienceForm
      handleNext={props.handleNext}
      handleSave={props.handleSave}
      savedForm={props.savedForm}
      showUploadErrorModal={props.showUploadErrorModal}
    />
  );
});

describe('Experience Form', () => {
  let props: IExperienceForm;
  let fullCandidateExperience: DraftSubmissionType;
  let mockSavedForm: DraftSubmissionType | undefined;

  before(() => {
    cy.fixture('candidate-experience-values').then((res) => {
      fullCandidateExperience = res;
    });
  });

  describe('Render', () => {
    beforeEach(() => {
      props = {
        handleNext: voidFn,
        handleSave: voidFn,
        savedForm: undefined,
        showUploadErrorModal: voidFn,
      };
    });

    it('should render', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-lastRole]').should('be.visible');
      cy.get('input[name=input-lastOrg]').should('be.visible');
      cy.get('button[name=input-yoe]').should('be.visible');
      cy.get('button[name=input-skills]').should('be.visible');
      cy.get('input[name=input-otherSkills]').should('be.visible');
      cy.get('input[name=input-linkedInUrl]').should('be.visible');
      cy.get('input[name=input-portfolioUrl]').should('be.visible');
      cy.get('input[name=input-portfolioPassword]').should('be.visible');
      cy.get('input[name=input-githubUrl]').should('be.visible');
      cy.get('input[name=input-resumeUrl]').should('be.visible');
      cy.get('button#experience-save').should('be.visible');
      cy.get('button#experience-next').should('be.visible');
    });

    it('should should show correct error messages', () => {
      cy.mountExperienceForm(props);

      cy.get('button#experience-next').fastClick();

      cy.get('#errorMessage-input-lastRole').should(
        'have.text',
        ERROR_TEXT.required
      );
      cy.get('#errorMessage-input-lastOrg').should(
        'have.text',
        ERROR_TEXT.required
      );
      cy.get('#errorMessage-input-yoe').should(
        'have.text',
        ERROR_TEXT.required
      );
    });
  });

  describe('Load', () => {
    beforeEach(() => {
      mockSavedForm = JSON.parse(JSON.stringify(fullCandidateExperience));

      props = {
        handleNext: voidFn,
        handleSave: voidFn,
        savedForm: mockSavedForm,
        showUploadErrorModal: voidFn,
      };
    });

    it('should load lastRole value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-lastRole]').should(
        'have.value',
        mockSavedForm?.lastRole
      );
    });

    it('should load lastOrg value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-lastOrg]').should(
        'have.value',
        mockSavedForm?.lastOrg
      );
    });

    it('should load yoe value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('button[name=input-yoe]').should('have.text', 'Less than 1');
    });

    it('should load skills value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('button[name=input-skills]').fastClick();
      mockSavedForm?.skills?.forEach((skill) => {
        cy.get(`li[data-name="input-skills-${skill}"] input`).should(
          'be.checked'
        );
      });
    });

    it('should load otherSkills value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-otherSkills]').should(
        'have.value',
        mockSavedForm?.otherSkills?.join(', ')
      );
    });

    it('should load linkedInUrl value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-linkedInUrl]').should(
        'have.value',
        mockSavedForm?.linkedInUrl
      );
    });

    it('should load portfolioUrl value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-portfolioUrl]').should(
        'have.value',
        mockSavedForm?.portfolioUrl
      );
    });

    it('should load portfolioPassword value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-portfolioPassword]').should(
        'have.value',
        mockSavedForm?.portfolioPassword
      );
    });

    it('should load githubUrl value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-githubUrl]').should(
        'have.value',
        mockSavedForm?.githubUrl
      );
    });

    it('should load resumeUrl value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-resumeUrl]').should(
        'have.value',
        mockSavedForm?.resumeUrl
      );
    });

    it('should load resumePassword value from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('input[name=input-resumePassword]').should(
        'have.value',
        mockSavedForm?.resumePassword
      );
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      mockSavedForm = JSON.parse(JSON.stringify(fullCandidateExperience));

      props = {
        handleNext: cy.stub().as('next'),
        handleSave: cy.stub().as('save'),
        savedForm: mockSavedForm,
        showUploadErrorModal: voidFn,
      };
    });

    it('should save form values', () => {
      cy.mountExperienceForm(props);

      cy.get('button#experience-save').fastClick();

      cy.get('@save')
        .should('have.been.calledOnce')
        .invoke('getCall', 0)
        .its('args')
        .its(0)
        .should((callArgs) => {
          expect(JSON.stringify(callArgs)).to.equal(
            JSON.stringify(mockSavedForm)
          );
          expect(callArgs.lastRole).to.equal(mockSavedForm?.lastRole);
          expect(callArgs.lastOrg).to.equal(mockSavedForm?.lastOrg);
          expect(callArgs.yoe).to.equal(mockSavedForm?.yoe);
          expect(callArgs.skills).to.deep.equal(mockSavedForm?.skills);
          expect(callArgs.otherSkills).to.deep.equal(
            mockSavedForm?.otherSkills
          );
          expect(callArgs.linkedInUrl).to.equal(mockSavedForm?.linkedInUrl);
          expect(callArgs.portfolioUrl).to.equal(mockSavedForm?.portfolioUrl);
          expect(callArgs.portfolioPassword).to.equal(
            mockSavedForm?.portfolioPassword
          );
          expect(callArgs.githubUrl).to.equal(mockSavedForm?.githubUrl);
          expect(callArgs.resumeUrl).to.equal(mockSavedForm?.resumeUrl);
          expect(callArgs.resumePassword).to.equal(
            mockSavedForm?.resumePassword
          );
        });
    });

    it('should pass form values when clicking next', () => {
      cy.mountExperienceForm(props);

      cy.get('button#experience-next').fastClick();

      cy.get('@next')
        .should('have.been.calledOnce')
        .invoke('getCall', 0)
        .its('args')
        .its(0)
        .should((callArgs) => {
          expect(callArgs.lastRole).to.equal(mockSavedForm?.lastRole);
          expect(callArgs.lastOrg).to.equal(mockSavedForm?.lastOrg);
          expect(callArgs.yoe).to.equal(mockSavedForm?.yoe);
          expect(callArgs.skills).to.deep.equal(mockSavedForm?.skills);
          expect(callArgs.otherSkills).to.deep.equal(
            mockSavedForm?.otherSkills
          );
          expect(callArgs.linkedInUrl).to.equal(mockSavedForm?.linkedInUrl);
          expect(callArgs.portfolioUrl).to.equal(mockSavedForm?.portfolioUrl);
          expect(callArgs.portfolioPassword).to.equal(
            mockSavedForm?.portfolioPassword
          );
          expect(callArgs.githubUrl).to.equal(mockSavedForm?.githubUrl);
          expect(callArgs.resumeUrl).to.equal(mockSavedForm?.resumeUrl);
          expect(callArgs.resumePassword).to.equal(
            mockSavedForm?.resumePassword
          );
          expect(JSON.stringify(callArgs)).to.equal(
            JSON.stringify(mockSavedForm)
          );
        });
    });
  });
});
