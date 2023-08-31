import InterestForm, {
  IInterestForm,
} from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';

import { CandidateInterestSelectors as Selectors } from '@/cypress/support/selectors/candidate-interest.selectors';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

Cypress.Commands.add('mountInterestForm', (props: IInterestForm) => {
  return cy.mount(
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

  describe('initial render', () => {
    beforeEach(() => {
      props = {
        handleSave: voidFn,
        handleSubmit: voidFn,
        savedForm: undefined,
      };
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

  describe('save', () => {
    const mockSavedForm = {
      interestWorkArrangement: [
        'advisor',
        'consultant',
        'internship',
        'contractor',
        'volunteer',
      ],
      hoursPerWeek: '20',
      interestEmploymentType: ['full', 'part'],
      interestGovt: true,
      previousImpactExperience: false,
      interestRoles: ['product designer', 'vp of engineering (or similar)'],
      currentLocation: 'Brooklyn, NY',
      openToRelocate: 'yes',
      openToRemoteMulti: ['hybrid', 'remote', 'in-person', 'not sure'],
      desiredSalary: '100k',
      interestCauses: [
        'immigration',
        'government tech',
        'lgbtqia+ rights',
        'public infrastructure',
        'racial justice',
      ],
      otherCauses: ['cause 1', 'cause 2'],
      workAuthorization: 'authorized',
      interestGovtEmplTypes: ['paid', 'unpaid'],
      essayResponse: 'This is an essay response',
      referenceAttribution: 'other',
      referenceAttributionOther: 'Some other place',
    };

    beforeEach(() => {
      props = {
        handleSave: cy.stub().as('save'),
        handleSubmit: voidFn,
        savedForm: mockSavedForm,
      };
    });

    it('should convert strings to bools', () => {
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

      cy.get('#interest-save').fastClick();

      cy.get('@save')
        .should('have.been.calledOnce')
        .invoke('getCall', 0)
        .its('args')
        .its(0)
        .should((callArgs) => {
          expect(callArgs.previousImpactExperience).to.equal(true);
          expect(callArgs.interestGovt).to.equal(false);
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
        mockSavedForm.interestWorkArrangement,
        'input-interestWorkArrangement'
      );
    });

    it('should load hoursPerWeek value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-hoursPerWeek]',
        mockSavedForm.hoursPerWeek
      );
    });

    it('should load interestRoles value from the saved form', () => {
      cy.mountInterestForm(props);

      checkListHasCheckedOptions(
        mockSavedForm.interestRoles,
        'input-interestRoles'
      );
    });

    it('should load currentLocation value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-currentLocation]',
        mockSavedForm.currentLocation
      );
    });

    it('should load openToRelocate value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-openToRelocate]',
        mockSavedForm.openToRelocate
      );
    });

    it('should load openToRemoteMulti value from the saved form', () => {
      cy.mountInterestForm(props);

      checkListHasCheckedOptions(
        mockSavedForm.openToRemoteMulti,
        'input-openToRemoteMulti'
      );
    });

    it('should load desiredSalary value from the saved form', () => {
      cy.mountInterestForm(props);

      checkInputHasValue(
        'input[name=input-desiredSalary]',
        mockSavedForm.desiredSalary
      );
    });
  });

  function checkInputHasValue(inputSelector: string, expValue: any): void {
    cy.get(inputSelector).should('have.value', expValue);
  }

  function checkListItemIsChecked(inputSelector: string): void {
    cy.get(inputSelector).should('be.checked');
  }

  function checkListHasCheckedOptions(
    savedFormProp: any[],
    fieldSelector: string
  ): void {
    const dropdown = cy.get(`button[name=${fieldSelector}]`);
    dropdown.fastClick();

    savedFormProp.forEach((option) => {
      checkListItemIsChecked(
        `li[data-name="${fieldSelector}-${option}"] input`
      );
    });

    dropdown.fastClick();
  }
});
