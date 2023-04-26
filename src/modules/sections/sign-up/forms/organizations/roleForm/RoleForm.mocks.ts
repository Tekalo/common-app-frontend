import { RoleType } from '@/lib/enums';
import { IRoleForm } from './RoleForm';

const base: IRoleForm = {
  // formList: [],
  formType: RoleType.BOTH,
  handleNewRole: () => void {},
  // handleEditRole: () => void {},
};

export const mockRoleFormProps = {
  base,
};
