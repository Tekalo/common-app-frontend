import { ISignupForm } from './SignupForm';

const base: ISignupForm = {
  showUserExistsError: false,
  handleSubmit: () => void {},
  setShowPrivacyModal: () => void {},
};

export const mockSignupFormProps = {
  base,
};
