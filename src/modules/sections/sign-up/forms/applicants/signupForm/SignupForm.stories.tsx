import SignupForm from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';
import { mockSignupFormProps } from '@/sections/sign-up/forms/applicants/signupForm/SignupForm.mocks';

export default { component: SignupForm };

export const Default = {
  args: { ...mockSignupFormProps.base },
};
