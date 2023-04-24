import { IRoleForm } from './RoleForm';

const base: IRoleForm = {
  formList: [],
  formType: 'string',
  handleNewRole: () => void {},
  handleEditRole: () => void {},
};

export const mockRoleFormProps = {
  base,
};
