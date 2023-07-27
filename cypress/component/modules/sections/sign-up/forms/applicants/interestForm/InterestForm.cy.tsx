import InterestForm, {
  IInterestForm,
} from '@/modules/sections/sign-up/forms/applicants/interestForm/InterestForm';

import { CandidateInterestSelectors as Selectors } from '@/cypress/support/selectors/candidate-interest.selectors';

Cypress.Commands.add('mountInterestForm', (props: IInterestForm) => {
  return cy.mount(
    <InterestForm
      handleSave={props.handleSave}
      handleSubmit={props.handleSubmit}
      savedForm={undefined}
    />
  );
});

describe('Applicant <InterestForm />', () => {
  const voidFn = () => void {};

  describe('initial render', () => {
    let props: IInterestForm;

    beforeEach(() => {
      props = {
        handleSave: voidFn,
        handleSubmit: voidFn,
        savedForm: undefined,
      };
    });

    it('renders all fields except work arrangement and referenceAttributionOther', () => {
      // disable invariant errors from dnd component
      Cypress.on('uncaught:exception', (err) => {
        return false;
      });

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
      // TODO
      // Fields
    });

    it('renders all fields including work arrangement when part time selected and referenceAttributionOther when referenceAttribution is "Other"', () => {
      cy.mountInterestForm(props);
      // TODO
      // Fields
    });
  });
});
