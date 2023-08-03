import RoleForm, {
  IRoleForm,
} from '@/modules/sections/sign-up/forms/organizations/roleForm/RoleForm';

import { OrganizationRoleSelectors as Selectors } from '@/cypress/support/selectors/organization-role.selectors';

Cypress.Commands.add('mountOrgRoleForm', (props: IRoleForm) => {
  return cy.mount(
    <RoleForm
      formType={props.formType}
      previousForm={props.previousForm}
      activeIndex={props.activeIndex}
      handleNewRole={props.handleNewRole}
      handleEditRole={props.handleEditRole}
    />
  );
});

describe('Organization <RoleForm />', () => {
  describe('The initial render', () => {
    let props: IRoleForm;

    beforeEach(() => {
      props = {
        formType: undefined,
        previousForm: undefined,
        activeIndex: 0,
        handleNewRole: () => void {},
        handleEditRole: () => void {},
      };
    });

    it('does not initially render roleTypeOther field', () => {
      cy.mountOrgRoleForm(props);
      cy.get(Selectors.roleTypeOther.input).should('not.exist');
    });
  });

  describe('When roleType does not equal "other"', () => {
    let props: IRoleForm;

    beforeEach(() => {
      props = {
        formType: undefined,
        previousForm: undefined,
        activeIndex: 0,
        handleNewRole: () => void {},
        handleEditRole: () => void {},
      };
    });

    it('does not render the "roleTypeOther" field', () => {
      cy.mountOrgRoleForm(props);
      cy.get(Selectors.roleType.input).click();
      cy.get(Selectors.roleType.options.dataAnalyst).click();
      cy.get(Selectors.roleType.input).should('have.text', 'Data analyst');
      cy.get(Selectors.roleTypeOther.input).should('not.exist');
    });
  });

  describe('When roleType field does equal "other"', () => {
    let props: IRoleForm;

    beforeEach(() => {
      props = {
        formType: undefined,
        previousForm: undefined,
        activeIndex: 0,
        handleNewRole: () => void {},
        handleEditRole: () => void {},
      };
    });

    it('renders the "roleTypeOther" field', () => {
      cy.mountOrgRoleForm(props);
      cy.get(Selectors.roleType.input).click();
      cy.get(Selectors.roleType.options.other).click();
      cy.get(Selectors.roleType.input).should('have.text', 'Other');
      cy.wait(1000); // wait for animation to finish
      cy.get(Selectors.roleTypeOther.input).should('exist');
      cy.get(Selectors.roleTypeOther.input).type('Other role type');
      cy.get(Selectors.roleTypeOther.input).should(
        'have.value',
        'Other role type'
      );
    });
  });
});
