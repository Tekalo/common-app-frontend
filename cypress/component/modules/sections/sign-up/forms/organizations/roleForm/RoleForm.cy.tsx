import RoleForm, {
  IRoleForm,
} from '@/modules/sections/sign-up/forms/organizations/roleForm/RoleForm';

import { MockSkillSearchProvider } from '@/cypress/fixtures/mocks';
import { OrganizationRoleSelectors as Selectors } from '@/cypress/support/selectors/organization-role.selectors';

Cypress.Commands.add('mountOrgRoleForm', (props: IRoleForm) => {
  cy.mount(
    <MockSkillSearchProvider>
      <RoleForm
        formType={props.formType}
        previousForm={props.previousForm}
        activeIndex={props.activeIndex}
        handleNewRole={props.handleNewRole}
        handleEditRole={props.handleEditRole}
      />
    </MockSkillSearchProvider>
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

      cy.get(Selectors.roleType.input).fastClick();
      cy.get(Selectors.roleType.options.dataAnalyst).fastClick();
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

      cy.get(Selectors.roleType.input).fastClick();
      cy.get(Selectors.roleType.options.other).fastClick();
      cy.get(Selectors.roleType.input).should('have.text', 'Other');
      cy.get(Selectors.roleTypeOther.input)
        .should('exist')
        .fastType('Other role type')
        .should('have.value', 'Other role type');
    });
  });

  describe('when the role is not paid', () => {
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

    it('does not render the "salaryRange" field', () => {
      cy.mountOrgRoleForm(props);
      cy.get(Selectors.roleUnpaid.input).click();
      cy.get(Selectors.roleSalary.input).should('not.exist');
    });
  });

  describe('when the role is paid', () => {
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

    it('it renders the "salaryRange" field', () => {
      cy.mountOrgRoleForm(props);
      cy.get(Selectors.rolePaid.input).click();
      cy.get(Selectors.roleSalary.input).should('exist');
    });
  });
});
