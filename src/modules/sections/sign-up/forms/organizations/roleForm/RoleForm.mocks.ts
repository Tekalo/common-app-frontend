import { CommitmentType } from '@/lib/enums';
import { IRoleForm } from './RoleForm';

const base: IRoleForm = {
  // formList: [],
  formType: [CommitmentType.Enum['full']],
  handleNewRole: () => void {},
  previousForm: undefined,
  activeIndex: 1,
  isLastRole: false,
  handleEditRole: () => void {},
};

export const mockRoleFormProps = {
  base,
};
