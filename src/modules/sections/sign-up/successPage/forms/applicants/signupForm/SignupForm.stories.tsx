import SignupForm from './SignupForm';
import { mockSignupFormProps } from './SignupForm.mocks';

export default { component: SignupForm };

export const Default = {
  args: { ...mockSignupFormProps.base },
};
