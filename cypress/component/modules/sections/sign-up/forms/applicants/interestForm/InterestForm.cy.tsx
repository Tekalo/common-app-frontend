import InterestForm, {
  IInterestForm,
} from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';

import { CandidateInterestSelectors as Selectors } from '@/cypress/support/selectors/candidate-interest.selectors';

import { ERROR_TEXT } from '@/lang/en';
import { DraftSubmissionType } from '@/lib/types';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

Cypress.Commands.add('mountInterestForm', (props: IInterestForm) => {
  cy.mount(
    <DndProvider backend={TouchBackend}>
      <InterestForm
        handleSave={props.handleSave}
        handleSubmit={props.handleSubmit}
        savedForm={props.savedForm}
      />
    </DndProvider>
  );
});

describe('Applicant <InterestForm />', () => {
  const voidFn = () => void {};
  let props: IInterestForm;
  let mockSavedForm: DraftSubmissionType | undefined;
  let fullCandidateInterest: DraftSubmissionType;

  before(() => {
    cy.fixture('candidate-interest-values').then((res) => {
      fullCandidateInterest = res.fullCandidateInterest;
    });
  });

  describe('Render', () => {
    beforeEach(() => {
      props = {
        handleSave: voidFn,
        handleSubmit: voidFn,
        savedForm: undefined,
      };
    });

    it('should display correct error messages', () => {
      cy.mountInterestForm(props);

      cy.get('#candidate-application-submit').fastClick();

      cy.get('[id^=errorMessage-input-]').its('length').should('equal', 7);
      cy.get('#errorMessage-input-interestEmploymentType').should(
        'have.text',
        ERROR_TEXT.requiredSelectGroup
      );
      cy.get('#errorMessage-input-interestRoles').should(
        'have.text',
        ERROR_TEXT.requiredSelectGroup
      );
      cy.get('#errorMessage-input-currentLocation').should(
        'have.text',
        ERROR_TEXT.required
      );
      cy.get('#errorMessage-input-openToRelocate').should(
        'have.text',
        ERROR_TEXT.required
      );
      cy.get('#errorMessage-input-openToRemoteMulti').should(
        'have.text',
        ERROR_TEXT.requiredSelectGroup
      );
      cy.get('#errorMessage-input-interestCauses').should(
        'have.text',
        ERROR_TEXT.interestCauses
      );
      cy.get('#errorMessage-input-essayResponse').should(
        'have.text',
        ERROR_TEXT.required
      );
    });

    it('should have default "no" values for radio buttons', () => {
      cy.mountInterestForm(props);

      cy.get('input[name=input-interestGovt-false]').should('be.checked');
      cy.get('input[name=input-previousImpactExperience-false]').should(
        'be.checked'
      );
      cy.get('button[name=input-interestGovtEmplTypes]').should('be.disabled');
    });

    it('renders all fields except work arrangement and referenceAttributionOther', () => {
      cy.mountInterestForm(props);

      // Fields
      cy.get(Selectors.employmentType.fullTime).should('exist');
      cy.get(Selectors.employmentType.partTime).should('exist');

      // Only rendered if part time
      cy.get(Selectors.workArrangement.input).should('not.exist');

      cy.get(Selectors.hoursPerWeek.input).should('exist');
      cy.get(Selectors.roles.input).should('exist');
      cy.get(Selectors.location.input).should('exist');
      cy.get(Selectors.relocation.input).should('exist');
      cy.get(Selectors.remote.input).should('exist');
      cy.get(Selectors.salary.input).should('exist');
      cy.get(Selectors.interestCauses.input).should('exist');
      cy.get(Selectors.otherCauses.input).should('exist');
      cy.get(Selectors.workAuthorization.input).should('exist');
      cy.get(Selectors.govInterest.no).should('exist');
      cy.get(Selectors.govInterest.yes).should('exist');
      cy.get(Selectors.govInterestType.input).should('exist');
      cy.get(Selectors.previousExperience.no).should('exist');
      cy.get(Selectors.previousExperience.yes).should('exist');
      cy.get(Selectors.essay.input).should('exist');
      cy.get(Selectors.referenceAttribution.input).should('exist');
      cy.get(Selectors.referenceAttributionOther.input).should('not.exist');
    });

    it('renders all fields including work arrangement when part time selected and not referenceAttributionOther', () => {
      cy.mountInterestForm(props);
      // Fields
      cy.get(Selectors.employmentType.fullTime).should('exist');
      cy.get(Selectors.employmentType.partTime).should('exist').fastClick();

      // Only rendered if part time
      cy.get(Selectors.workArrangement.input).should('exist');

      cy.get(Selectors.hoursPerWeek.input).should('exist');
      cy.get(Selectors.roles.input).should('exist');
      cy.get(Selectors.location.input).should('exist');
      cy.get(Selectors.relocation.input).should('exist');
      cy.get(Selectors.remote.input).should('exist');
      cy.get(Selectors.salary.input).should('exist');
      cy.get(Selectors.interestCauses.input).should('exist');
      cy.get(Selectors.otherCauses.input).should('exist');
      cy.get(Selectors.workAuthorization.input).should('exist');
      cy.get(Selectors.govInterest.no).should('exist');
      cy.get(Selectors.govInterest.yes).should('exist');
      cy.get(Selectors.govInterestType.input).should('exist');
      cy.get(Selectors.previousExperience.no).should('exist');
      cy.get(Selectors.previousExperience.yes).should('exist');
      cy.get(Selectors.essay.input).should('exist');
      cy.get(Selectors.referenceAttribution.input).should('exist');
      cy.get(Selectors.referenceAttributionOther.input).should('not.exist');
    });

    it('renders all fields including work arrangement when part time selected and referenceAttributionOther when referenceAttribution is "Other"', () => {
      cy.mountInterestForm(props);
      // Fields
      cy.get(Selectors.employmentType.fullTime).should('exist');
      cy.get(Selectors.employmentType.partTime).should('exist');

      // Only rendered if part time
      cy.get(Selectors.workArrangement.input).should('not.exist');

      cy.get(Selectors.hoursPerWeek.input).should('exist');
      cy.get(Selectors.roles.input).should('exist');
      cy.get(Selectors.location.input).should('exist');
      cy.get(Selectors.relocation.input).should('exist');
      cy.get(Selectors.remote.input).should('exist');
      cy.get(Selectors.salary.input).should('exist');
      cy.get(Selectors.interestCauses.input).should('exist');
      cy.get(Selectors.otherCauses.input).should('exist');
      cy.get(Selectors.workAuthorization.input).should('exist');
      cy.get(Selectors.govInterest.no).should('exist');
      cy.get(Selectors.govInterest.yes).should('exist');
      cy.get(Selectors.govInterestType.input).should('exist');
      cy.get(Selectors.previousExperience.no).should('exist');
      cy.get(Selectors.previousExperience.yes).should('exist');
      cy.get(Selectors.essay.input).should('exist');
      cy.get(Selectors.referenceAttribution.input).should('exist');
      cy.get(Selectors.referenceAttributionOther.input).should('not.exist');

      cy.get(Selectors.referenceAttribution.input).fastClick();
      cy.get(Selectors.referenceAttribution.options.other).fastClick();

      cy.get(Selectors.referenceAttributionOther.input).should('exist');
    });
  });

  describe('Save', () => {
    beforeEach(() => {
      mockSavedForm = JSON.parse(JSON.stringify(fullCandidateInterest));

      props = {
        handleSave: cy.stub().as('save'),
        handleSubmit: voidFn,
        savedForm: mockSavedForm,
      };
    });

    it('should convert bools to strings', () => {
      cy.mountInterestForm(props);

      cy.get('input[name=input-interestGovt-true]').should('be.checked');
      cy.get('input[name=input-previousImpactExperience-false]').should(
        'be.checked'
      );

      cy.get('input[name=input-interestGovt-false]').fastClick();
      cy.get('input[name=input-interestGovt-false]')
        .invoke('val')
        .should('equal', 'false');

      cy.get('input[name=input-previousImpactExperience-true]').fastClick();
      cy.get('input[name=input-previousImpactExperience-true]')
        .invoke('val')
        .should('equal', 'true');
    });

    it('should convert strings to bools', () => {
      cy.mountInterestForm(props);

      cy.get('#interest-save').fastClick();

      cy.get('@save')
        .should('have.been.calledOnce')
        .invoke('getCall', 0)
        .its('args')
        .its(0)
        .should((callArgs) => {
          expect(callArgs.previousImpactExperience).to.equal(false);
          expect(callArgs.interestGovt).to.equal(true);
        });
    });

    it('should load employmentType values from the saved form', () => {
      cy.mountInterestForm(props);

      cy.get('#input-interestEmploymentType-full').should('be.checked');
      cy.get('#input-interestEmploymentType-part').should('be.checked');
    });

    it('should load interestWorkArrangement values from the saved form', () => {
      cy.mountInterestForm(props);

      checkListHasCheckedOptions(
        mockSavedForm?.interestWorkArrangement,
        'input-interestWorkArrangement'
      );
    });

    it('should load hoursPerWeek value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-hoursPerWeek]',
        mockSavedForm?.hoursPerWeek
      );
    });

    it('should load interestRoles value from the saved form', () => {
      cy.mountInterestForm(props);

      checkListHasCheckedOptions(
        mockSavedForm?.interestRoles,
        'input-interestRoles'
      );
    });

    it('should load currentLocation value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-currentLocation]',
        mockSavedForm?.currentLocation
      );
    });

    it('should load openToRelocate value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-openToRelocate]',
        mockSavedForm?.openToRelocate
      );
    });

    it('should load openToRemoteMulti value from the saved form', () => {
      cy.mountInterestForm(props);

      checkListHasCheckedOptions(
        mockSavedForm?.openToRemoteMulti,
        'input-openToRemoteMulti'
      );
    });

    it('should load desiredSalary value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-desiredSalary]',
        mockSavedForm?.desiredSalary
      );
    });
  });

  describe('Submit', () => {
    beforeEach(() => {
      mockSavedForm = JSON.parse(JSON.stringify(fullCandidateInterest));

      props = {
        handleSave: voidFn,
        handleSubmit: cy.stub().as('submit'),
        savedForm: mockSavedForm,
      };
    });

    it('should successfully submit the form data', () => {
      cy.mountInterestForm(props);

      cy.get('#candidate-application-submit').fastClick();

      cy.get('@submit')
        .should('have.been.calledOnce')
        .invoke('getCall', 0)
        .its('args')
        .its(0)
        .should((submissionBody) => {
          expect(JSON.stringify(submissionBody)).to.equal(
            JSON.stringify(mockSavedForm)
          );
          expect(submissionBody.currentLocation).to.equal(
            mockSavedForm?.currentLocation
          );
          expect(submissionBody.desiredSalary).to.equal(
            mockSavedForm?.desiredSalary
          );
          expect(submissionBody.essayResponse).to.equal(
            mockSavedForm?.essayResponse
          );
          expect(submissionBody.hoursPerWeek).to.equal(
            mockSavedForm?.hoursPerWeek
          );
          expect(submissionBody.interestCauses).to.deep.equal(
            mockSavedForm?.interestCauses
          );
          expect(submissionBody.interestEmploymentType).to.deep.equal(
            mockSavedForm?.interestEmploymentType
          );
          expect(submissionBody.interestGovt).to.equal(
            mockSavedForm?.interestGovt
          );
          expect(submissionBody.interestRoles).to.deep.equal(
            mockSavedForm?.interestRoles
          );
          expect(submissionBody.interestGovtEmplTypes).to.deep.equal(
            mockSavedForm?.interestGovtEmplTypes
          );
          expect(submissionBody.interestRoles).to.deep.equal(
            mockSavedForm?.interestRoles
          );
          expect(submissionBody.interestWorkArrangement).to.deep.equal(
            mockSavedForm?.interestWorkArrangement
          );
          expect(submissionBody.openToRelocate).to.equal(
            mockSavedForm?.openToRelocate
          );
          expect(submissionBody.openToRemoteMulti).to.deep.equal(
            mockSavedForm?.openToRemoteMulti
          );
          expect(submissionBody.otherCauses).to.deep.equal(
            mockSavedForm?.otherCauses
          );
          expect(submissionBody.previousImpactExperience).to.equal(
            mockSavedForm?.previousImpactExperience
          );
          expect(submissionBody.referenceAttribution).to.equal(
            mockSavedForm?.referenceAttribution
          );
          expect(submissionBody.referenceAttributionOther).to.equal(
            mockSavedForm?.referenceAttributionOther
          );
          expect(submissionBody.workAuthorization).to.equal(
            mockSavedForm?.workAuthorization
          );
        });
    });
  });

  function checkInputHasValue(inputSelector: string, expValue: any): void {
    cy.get(inputSelector).should('have.value', expValue);
  }

  function checkListItemIsChecked(inputSelector: string): void {
    cy.get(inputSelector).should('be.checked');
  }

  function checkListHasCheckedOptions(
    savedFormProp: any[] | undefined,
    fieldSelector: string
  ): void {
    const dropdown = cy.get(`button[name=${fieldSelector}]`);
    dropdown.fastClick();

    if (savedFormProp?.length) {
      savedFormProp.forEach((option) => {
        checkListItemIsChecked(
          `li[data-name="${fieldSelector}-${option}"] input`
        );
      });

      dropdown.fastClick();
    }
  }
});
