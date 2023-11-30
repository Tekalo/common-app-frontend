import { CommitmentType } from '@/lib/validators/enums';
import { IRoleForm } from '@/sections/sign-up/forms/organizations/roleForm/RoleForm';

const base: IRoleForm = {
  // formList: [],
  formType: [CommitmentType.Enum['full']],
  handleNewRole: () => void {},
  previousForm: undefined,
  activeIndex: 1,
  handleEditRole: () => void {},
};

export const mockRoleFormProps = {
  base,
};
