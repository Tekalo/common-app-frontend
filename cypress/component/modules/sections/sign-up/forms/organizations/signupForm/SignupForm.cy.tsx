import SignupForm, {
  ISignupForm,
} from '@/modules/sections/sign-up/forms/organizations/signupForm/SignupForm';

import { voidFn } from '@/cypress/fixtures/mocks';
import { OrganizationSignupSelectors as Selectors } from '@/cypress/support/selectors/organization-signup.selectors';

Cypress.Commands.add('mountOrganizationSignupForm', (props: ISignupForm) => {
  cy.mount(
    <SignupForm handleSubmit={props.handleSubmit} previousForm={undefined} />
  );
});

describe('Organization <SignupForm />', () => {
  describe('initial render', () => {
    let props: ISignupForm;

    beforeEach(() => {
      props = {
        handleSubmit: voidFn,
        previousForm: undefined,
      };
    });

    it('should render', () => {
      cy.mountOrganizationSignupForm(props);

      // Fields
      cy.get(Selectors.name.input).should('exist');
      cy.get(Selectors.type.input).should('exist');
      cy.get(Selectors.size.input).should('exist');
      cy.get(Selectors.impactAreas.input).should('exist');
      cy.get(Selectors.impactAreasOther.input).should('not.exist');
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

    it('should render impactAreasOther when "other" impact area is selected', () => {
      cy.mountOrganizationSignupForm(props);

      cy.get(Selectors.impactAreas.input).fastClick();
      cy.get(Selectors.impactAreas.options.other).fastClick();
      cy.get(Selectors.impactAreas.input).fastClick();

      cy.get(Selectors.impactAreasOther.input).should('be.visible');
    });
  });
});
