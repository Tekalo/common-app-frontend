import { CommitmentType } from '@/lib/enums';
import { IRoleForm } from './RoleForm';

const base: IRoleForm = {
  // formList: [],
  formType: [CommitmentType.Enum['full-time']],
  handleNewRole: () => void {},
  // handleEditRole: () => void {},
};

export const mockRoleFormProps = {
  base,
};
