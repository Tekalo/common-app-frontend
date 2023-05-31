import { ISignupForm } from './SignupForm';

const base: ISignupForm = {
  handleSubmit: () => void {},
  setShowPrivacyModal: () => void {},
  isTurnstileValid: true,
  setIsTurnstileValid: () => void {},
};

export const mockSignupFormProps = {
  base,
};
