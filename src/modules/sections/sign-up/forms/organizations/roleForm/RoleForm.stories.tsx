import RoleForm from '@/sections/sign-up/forms/organizations/roleForm/RoleForm';
import { mockRoleFormProps } from '@/sections/sign-up/forms/organizations/roleForm/RoleForm.mocks';

export default { component: RoleForm };

export const Default = {
  args: { ...mockRoleFormProps.base },
};
