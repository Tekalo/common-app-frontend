import { ISignupForm } from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';

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
