import { IReviewFormPage } from './ReviewForm';

const base: IReviewFormPage = {
  orgInfo: undefined,
  orgRoles: [],
  handleGoToOrg: () => void {},
  handleGoToRole: (idx) => void {},
  handleDeleteRole: (idx) => void {},
};

export const mockReviewFormPageProps = {
  base,
};
