import SignupForm from '@/sections/sign-up/forms/organizations/signupForm/SignupForm';
import { mockSignupFormProps } from '@/sections/sign-up/forms/organizations/signupForm/SignupForm.mocks';

export default { component: SignupForm };

export const Default = {
  args: { ...mockSignupFormProps.base },
};
