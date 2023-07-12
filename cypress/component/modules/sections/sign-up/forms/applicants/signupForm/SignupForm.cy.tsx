import { CandidateSignupSelectors as Selectors } from '@/cypress/support/selectors/candidate-signup.selectors';
import { APPLICANT_FORM_TEXT, ERROR_TEXT, TERMS_LINK } from '@/lang/en';
import { ISignupForm } from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';

describe('<SignupForm />', () => {
  const voidFn = () => void {};

  describe('debug', () => {
    let props: ISignupForm;

    beforeEach(() => {
      props = {
        debugIsActive: true,
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
      cy.get(Selectors.name.input).should('exist');
      cy.get(Selectors.email.input).should('exist');
      cy.get(Selectors.pronoun.input).should('exist');
      cy.get(Selectors.searchStatus.input.active).should('exist');
      cy.get(Selectors.searchStatus.input.passive).should('exist');
      cy.get(Selectors.searchStatus.input.future).should('exist');
      cy.get(Selectors.contact.input).should('exist');
      cy.get(Selectors.phone.input).should('exist');
      cy.get(Selectors.privacy.input).should('exist');
      cy.get(Selectors.terms.input).should('exist');
      cy.get(Selectors.followUp.input).should('exist');
      cy.get(Selectors.turnstile.input).should('not.exist');

      // Button
      cy.get(Selectors.buttons.submit).should('exist');
    });

    it('has correct required fields', () => {
      cy.mountSignupForm(props);

      const requiredFields = [
        'input-name',
        'input-email',
        'input-searchStatus',
        'input-preferredContact',
        'input-acceptedPrivacy',
        'input-acceptedTerms',
      ];

      cy.get(Selectors.buttons.submit).click();

      requiredFields.forEach((field) => {
        cy.get(`p#errorMessage-${field}`).should('be.visible');
      });
    });

    it('should make phone number required by selecting phone contact method', () => {
      cy.mountSignupForm(props);

      const preferredContactField = cy.get(Selectors.contact.input);
      preferredContactField.click();
      cy.get('li[data-name=input-preferredContact-sms]').click();

      cy.get(Selectors.buttons.submit).click();
      cy.get('label[for=input-phone]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.label
      );
      const phoneErrorMessage = cy.get('#errorMessage-input-phone');
      phoneErrorMessage.should('exist');
      phoneErrorMessage.should('contain.text', ERROR_TEXT.required);
    });

    it('should make phone number required by selecting whatsapp contact method', () => {
      cy.mountSignupForm(props);

      const preferredContactField = cy.get(Selectors.contact.input);
      preferredContactField.click();
      cy.get('li[data-name=input-preferredContact-whatsapp]').click();

      cy.get(Selectors.buttons.submit).click();
      cy.get('label[for=input-phone]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.label
      );
      const phoneErrorMessage = cy.get('#errorMessage-input-phone');
      phoneErrorMessage.should('exist');
      phoneErrorMessage.should('contain.text', ERROR_TEXT.required);
    });

    it('should make phone number optional by selecting email contact method', () => {
      cy.mountSignupForm(props);

      const preferredContactField = cy.get(Selectors.contact.input);
      preferredContactField.click();
      cy.get('li[data-name=input-preferredContact-email]').click();

      cy.get(Selectors.buttons.submit).click();
      cy.get('label[for=input-phone]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.labelOptional
      );
      cy.get('#errorMessage-input-phone').should('not.exist');
    });
  });

  describe('no debug', () => {
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
      cy.get(Selectors.name.input).should('exist');
      cy.get(Selectors.email.input).should('exist');
      cy.get(Selectors.pronoun.input).should('exist');
      cy.get(Selectors.searchStatus.input.active).should('exist');
      cy.get(Selectors.searchStatus.input.passive).should('exist');
      cy.get(Selectors.searchStatus.input.future).should('exist');
      cy.get(Selectors.contact.input).should('exist');
      cy.get(Selectors.phone.input).should('exist');
      cy.get(Selectors.privacy.input).should('exist');
      cy.get(Selectors.terms.input).should('exist');
      cy.get(Selectors.followUp.input).should('exist');
      cy.get(Selectors.turnstile.input).should('exist');

      // Button
      cy.get(Selectors.buttons.submit).should('exist');
    });

    it('should set turnstileIsValid to false', () => {
      cy.stub(props, 'setIsTurnstileValid').as('setTurnstileSpy');
      cy.mountSignupForm(props);

      cy.get(Selectors.buttons.submit)
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
