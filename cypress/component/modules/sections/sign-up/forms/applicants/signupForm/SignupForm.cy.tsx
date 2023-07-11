import { TERMS_LINK } from '@/lang/en';
import SignupForm, {
  ISignupForm,
} from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';

describe('<SignupForm />', () => {
  describe('debug', () => {
    beforeEach(() => {
      const turnstileIsValidSpy = cy.stub();
      const voidFn = () => void {};

      cy.mount(
        <SignupForm
          debugIsActive={true}
          isAuthenticated={false}
          isTurnstileValid={true}
          showUserExistsError={false}
          user={undefined}
          handleSubmit={voidFn}
          setIsTurnstileValid={turnstileIsValidSpy}
          setShowPrivacyModal={voidFn}
        />
      );
    });

    it('renders', () => {
      // Fields
      cy.get('input[name=input-name]').should('exist');
      cy.get('input[name=input-email]').should('exist');
      cy.get('input[name=input-pronoun]').should('exist');
      cy.get('input[name=input-searchStatus-active]').should('exist');
      cy.get('input[name=input-searchStatus-passive]').should('exist');
      cy.get('input[name=input-searchStatus-future]').should('exist');
      cy.get('button[name=input-preferredContact]').should('exist');
      cy.get('input[name=input-phone]').should('exist');
      cy.get('input[name=input-acceptedPrivacy]').should('exist');
      cy.get('input[name=input-acceptedTerms]').should('exist');
      cy.get('input[name=input-followUpOptIn]').should('exist');
      // cy.get('#candidate-form-turnstile').should('exist');

      // Button
      cy.get('#submit-candidate-sign-up').should('exist');
    });

    it('has correct required fields', () => {
      const requiredFields = [
        'input-name',
        'input-email',
        'input-searchStatus',
        'input-preferredContact',
        'input-acceptedPrivacy',
        'input-acceptedTerms',
      ];

      cy.get('button#submit-candidate-sign-up').click();

      requiredFields.forEach((field) => {
        cy.get(`p#errorMessage-${field}`).should('be.visible');
      });
    });
  });

  describe('no debug', () => {
    const voidFn = () => void {};
    let props: ISignupForm;

    beforeEach(() => {
      props = {
        debugIsActive: false,
        isAuthenticated: false,
        isTurnstileValid: true,
        showUserExistsError: false,
        user: undefined,
        handleSubmit: voidFn,
        setIsTurnstileValid: voidFn,
        setShowPrivacyModal: voidFn,
      };
    });

    it('renders', () => {
      cy.mountSignupForm(props);

      // Fields
      cy.get('input[name=input-name]').should('exist');
      cy.get('input[name=input-email]').should('exist');
      cy.get('input[name=input-pronoun]').should('exist');
      cy.get('input[name=input-searchStatus-active]').should('exist');
      cy.get('input[name=input-searchStatus-passive]').should('exist');
      cy.get('input[name=input-searchStatus-future]').should('exist');
      cy.get('button[name=input-preferredContact]').should('exist');
      cy.get('input[name=input-phone]').should('exist');
      cy.get('input[name=input-acceptedPrivacy]').should('exist');
      cy.get('input[name=input-acceptedTerms]').should('exist');
      cy.get('input[name=input-followUpOptIn]').should('exist');
      cy.get('#candidate-form-turnstile').should('exist');

      // Button
      cy.get('#submit-candidate-sign-up').should('exist');
    });

    it('should set turnstileIsValid to false', () => {
      cy.stub(props, 'setIsTurnstileValid').as('setTurnstileSpy');
      cy.mountSignupForm(props);

      cy.get('#submit-candidate-sign-up')
        .click()
        .then(() => {
          expect(props.setIsTurnstileValid).to.be.calledOnceWithExactly(false);
          // TODO: Can we check turnstile ref is reset?
        });
    });

    it('should show privacy modal', () => {
      cy.stub(props, 'setShowPrivacyModal').as('privacyModalSpy');
      cy.mountSignupForm(props);

      cy.get('#candidate-sign-up__privacy-modal-trigger')
        .click()
        .then(() => {
          expect(props.setShowPrivacyModal).to.be.called.calledOnceWithExactly(
            true
          );
        });
    });

    it('should have correct terms link', () => {
      cy.mountSignupForm(props);

      cy.get('#candidate-sign-up__terms-of-use-link').should(
        'have.attr',
        'href',
        TERMS_LINK
      );
    });

    // TODO: this doesn't work, idk how to force a re-render of the form from here
    // Look into how we can handle this in another way, look at turnstile error msg
    // it('should show user exists error', () => {
    //   props.showUserExistsError = true;
    //   cy.mountSignupForm(props);

    //   cy.get('#errorMessage-input-email').should(
    //     'have.text',
    //     ERROR_TEXT.userAlreadyExists
    //   );
    // });

    it('should display user info if already authenticated and it is present', () => {
      const name = 'TEST NAME';
      const email = 'TEST@EMAIL.COM';
      props.user = {
        name,
        email,
      };
      props.isAuthenticated = true;
      cy.mountSignupForm(props);

      const nameInput = cy.get('[name=input-name]');
      nameInput.should('be.disabled');
      nameInput.should('have.value', name);
      const emailInput = cy.get('[name=input-email]');
      emailInput.should('be.disabled');
      emailInput.should('have.value', email);
    });

    it('should disable name and email with empty values if they are not present', () => {
      props.isAuthenticated = true;
      cy.mountSignupForm(props);

      const nameInput = cy.get('[name=input-name]');
      nameInput.should('be.disabled');
      nameInput.should('have.value', '');
      const emailInput = cy.get('[name=input-email]');
      emailInput.should('be.disabled');
      emailInput.should('have.value', '');
    });

    it('should display turnstile error if it is not valid', () => {
      props.isTurnstileValid = false;
      cy.mountSignupForm(props);

      cy.get('#candidate-form-turnstile__error-message').should('be.visible');
    });
  });
});
