import { ISignupForm } from './SignupForm';

const base: ISignupForm = {
  debugIsActive: false,
  isAuthenticated: false,
  isTurnstileValid: true,
  showUserExistsError: false,
  user: undefined,
  handleSubmit: () => void {},
  setIsTurnstileValid: () => void {},
  setShowPrivacyModal: () => void {},
};

export const mockSignupFormProps = {
  base,
};
