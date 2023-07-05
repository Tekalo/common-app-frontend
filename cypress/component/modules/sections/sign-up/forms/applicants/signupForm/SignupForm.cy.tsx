import SignupForm from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';

describe('<SignupForm />', () => {
  const voidFn = () => void {};

  it('renders', () => {
    cy.mount(
      <SignupForm
        isAuthenticated={false}
        isTurnstileValid={false}
        showUserExistsError={false}
        user={undefined}
        handleSubmit={voidFn}
        setIsTurnstileValid={voidFn}
        setShowPrivacyModal={voidFn}
      />
    );
  });
});
