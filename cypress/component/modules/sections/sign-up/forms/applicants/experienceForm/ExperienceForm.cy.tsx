import { voidFn } from '@/cypress/fixtures/mocks';
import { ERROR_TEXT } from '@/lang/en';
import { DraftSubmissionType } from '@/lib/types';
import ExperienceForm, {
  IExperienceForm,
} from '@/modules/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import { Subject } from 'rxjs';

Cypress.Commands.add('mountExperienceForm', (props: IExperienceForm) => {
  cy.mount(
    <ExperienceForm
      isEditing={props.isEditing}
      handleNext={props.handleNext}
      handleSave={props.handleSave}
      savedForm={props.savedForm}
      showUploadErrorModal={props.showUploadErrorModal}
      forceValidateForm={props.forceValidateForm}
    />
  );
});

describe('Experience Form', () => {
  let props: IExperienceForm;
  let fullCandidateExperience: DraftSubmissionType;
  let mockSavedForm: DraftSubmissionType | undefined;
  const forceValidateForm = new Subject<void>();

  before(() => {
    cy.fixture('candidate-experience-values').then((res) => {
      fullCandidateExperience = res;
    });
  });

  describe('Render', () => {
    beforeEach(() => {
      props = {
        forceValidateForm,
        isEditing: false,
        savedForm: undefined,
        handleNext: voidFn,
        handleSave: voidFn,
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
      cy.get('div[data-name=file-upload-field]').should('be.visible');
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
        forceValidateForm,
        isEditing: false,
        savedForm: mockSavedForm,
        handleNext: voidFn,
        handleSave: voidFn,
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

    it('should load resume file name from the saved form', () => {
      cy.mountExperienceForm(props);

      cy.get('span[data-name=file-name]').should(
        'have.text',
        mockSavedForm?.resumeUpload?.originalFilename
      );
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      mockSavedForm = JSON.parse(JSON.stringify(fullCandidateExperience));

      props = {
        forceValidateForm,
        isEditing: false,
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
          expect(callArgs.resumeUpload.id).to.equal(
            mockSavedForm?.resumeUpload?.id
          );
          expect(callArgs.resumeUpload.originalFilename).to.equal(
            mockSavedForm?.resumeUpload?.originalFilename
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
          expect(callArgs.resumeUpload.id).to.equal(
            mockSavedForm?.resumeUpload?.id
          );
          expect(callArgs.resumeUpload.originalFilename).to.equal(
            mockSavedForm?.resumeUpload?.originalFilename
          );
          expect(JSON.stringify(callArgs)).to.equal(
            JSON.stringify(mockSavedForm)
          );
        });
    });
  });

  describe('editing', () => {
    beforeEach(() => {
      mockSavedForm = JSON.parse(JSON.stringify(fullCandidateExperience));

      props = {
        forceValidateForm,
        isEditing: true,
        handleNext: cy.stub().as('next'),
        handleSave: cy.stub().as('save'),
        savedForm: mockSavedForm,
        showUploadErrorModal: voidFn,
      };
    });

    it('should remove save button when editing', () => {
      cy.mountExperienceForm(props);

      cy.get('button#experience-save').should('not.exist');
    });
  });
});
