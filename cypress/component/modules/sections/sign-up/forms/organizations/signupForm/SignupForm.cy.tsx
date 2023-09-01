import SignupForm, {
  ISignupForm,
} from '@/modules/sections/sign-up/forms/organizations/signupForm/SignupForm';

import { OrganizationSignupSelectors as Selectors } from '@/cypress/support/selectors/organization-signup.selectors';

Cypress.Commands.add('mountOrganizationSignupForm', (props: ISignupForm) => {
  cy.mount(
    <SignupForm handleSubmit={props.handleSubmit} previousForm={undefined} />
  );
});

describe('Organization <SignupForm />', () => {
  const voidFn = () => void {};

  describe('initial render', () => {
    let props: ISignupForm;

    beforeEach(() => {
      props = {
        handleSubmit: voidFn,
        previousForm: undefined,
      };
    });

    it('renders all fields except referenceAttributionOther', () => {
      cy.mountOrganizationSignupForm(props);

      // Fields
      cy.get(Selectors.name.input).should('exist');
      cy.get(Selectors.type.input).should('exist');
      cy.get(Selectors.size.input).should('exist');
      cy.get(Selectors.impactAreas.input).should('exist');
      cy.get(Selectors.phone.input).should('exist');
      cy.get(Selectors.positionType.fullTime).should('exist');
      cy.get(Selectors.positionType.partTime).should('exist');
      cy.get(Selectors.eoe.input).should('exist');
      cy.get(Selectors.referenceAttribution.input).should('exist');
      cy.get(Selectors.referenceAttributionOther.input).should('not.exist');
    });

    it('should render referenceAttributionOther when referenceAttribution is "Other"', () => {
      cy.mountOrganizationSignupForm(props);

      const referenceAttribution = cy.get(Selectors.referenceAttribution.input);
      referenceAttribution.click();

      cy.get(Selectors.referenceAttribution.options.other).click();
      cy.get(Selectors.referenceAttributionOther.input).should('exist');
    });
  });
});
