import { voidFn } from '@/lib/helpers/utilities';
import { IReviewFormPage } from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';

const base: IReviewFormPage = {
  debugIsActive: false,
  isTurnstileValid: true,
  orgInfo: undefined,
  orgRoles: [],
  handleDeleteRole: voidFn,
  handleGoToOrg: voidFn,
  handleGoToRole: voidFn,
  handleSubmit: voidFn,
  setIsTurnstileValid: voidFn,
};

export const mockReviewFormPageProps = {
  base,
};
