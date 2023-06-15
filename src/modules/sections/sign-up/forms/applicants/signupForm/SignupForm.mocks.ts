import { ISignupForm } from './SignupForm';

const base: ISignupForm = {
  isAuthenticated: false,
  user: undefined,
  showUserExistsError: false,
  handleSubmit: () => void {},
  setShowPrivacyModal: () => void {},
  isTurnstileValid: true,
  setIsTurnstileValid: () => void {},
};

export const mockSignupFormProps = {
  base,
};
