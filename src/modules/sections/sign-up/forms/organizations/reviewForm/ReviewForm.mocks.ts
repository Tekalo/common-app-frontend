import { IReviewFormPage } from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';

const base: IReviewFormPage = {
  debugIsActive: false,
  isTurnstileValid: true,
  orgInfo: undefined,
  orgRoles: [],
  handleDeleteRole: (idx) => void {},
  handleGoToOrg: () => void {},
  handleGoToRole: (idx) => void {},
  handleSubmit: (val) => void {},
  setIsTurnstileValid: () => void {},
};

export const mockReviewFormPageProps = {
  base,
};
