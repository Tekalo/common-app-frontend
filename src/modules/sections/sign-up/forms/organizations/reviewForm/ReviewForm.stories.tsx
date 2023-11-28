import ReviewFormPage from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';
import { mockReviewFormPageProps } from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm.mocks';

export default { component: ReviewFormPage };

export const Default = {
  args: { ...mockReviewFormPageProps.base },
};
