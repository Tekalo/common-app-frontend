import RoleForm, {
  IRoleForm,
} from '@/modules/sections/sign-up/forms/organizations/roleForm/RoleForm';

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
  describe('initial render', () => {
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
      // TODO: Fields
    });

    it('renders roleTypeOther field when roleType is "other"', () => {
      cy.mountOrgRoleForm(props);
      // TODO: Fields
    });
  });
});
