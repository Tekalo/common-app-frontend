import { IOrgFormPage } from './OrgFormPage';

const base: IOrgFormPage = {
  activeIndex: 1,
  orgInfo: undefined,
  orgRoles: [],
  setActiveIndex: () => void {},
  handleNewRole: () => void {},
  handleEditRole: () => void {},
  handleOrgSignup: () => void {},
};

export const mockOrgFormPageProps = {
  base,
};
