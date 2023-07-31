import { CandidateSignupSelectors as Selectors } from '@/cypress/support/selectors/candidate-signup.selectors';
import {
  APPLICANT_FORM_TEXT,
  CONTACT_ENUM_OPTIONS,
  ERROR_TEXT,
  SEARCH_STATUS_ENUM_OPTIONS,
  TERMS_LINK,
} from '@/lang/en';
import SignupForm, {
  ISignupForm,
} from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';

Cypress.Commands.add('mountCandidateSignupForm', (props: ISignupForm) => {
  return cy.mount(
    <SignupForm
      debugIsActive={props.debugIsActive}
      isAuthenticated={props.isAuthenticated}
      isTurnstileValid={props.isTurnstileValid}
      showUserExistsError={props.showUserExistsError}
      user={props.user}
      handleSubmit={props.handleSubmit}
      setIsTurnstileValid={props.setIsTurnstileValid}
      setShowPrivacyModal={props.setShowPrivacyModal}
    />
  );
});

describe('<SignupForm />', () => {
  const name = 'Test Name';
  const email = 'test-email@schmidtfutures.com';
  const pronoun = 'they/them';
  const phone = '8101110001';
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
      cy.mountCandidateSignupForm(props);

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
      cy.mountCandidateSignupForm(props);

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

    it('have phone number as optional by default', () => {
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.phone.label).should(
        'have.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.labelOptional
      );
    });

    it('should make phone number required by selecting phone contact method', () => {
      cy.mountCandidateSignupForm(props);

      const preferredContactField = cy.get(Selectors.contact.input);
      preferredContactField.click();
      cy.get('li[data-name=input-preferredContact-sms]').click();

      cy.get(Selectors.buttons.submit).click();
      cy.get('label[for=input-phone]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.label
      );

      cy.get(Selectors.phone.label).should(
        'have.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.label
      );
      const phoneErrorMessage = cy.get('#errorMessage-input-phone');
      phoneErrorMessage.should('exist');
      phoneErrorMessage.should('contain.text', ERROR_TEXT.required);
    });

    it('should make phone number required by selecting whatsapp contact method', () => {
      cy.mountCandidateSignupForm(props);

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
      cy.mountCandidateSignupForm(props);

      const preferredContactField = cy.get(Selectors.contact.input);
      preferredContactField.click();
      cy.get(Selectors.contact.options.email).click();

      cy.get(Selectors.buttons.submit).click();
      cy.get('label[for=input-phone]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.labelOptional
      );
      cy.get('#errorMessage-input-phone').should('not.exist');
    });

    it('should submit values - required only', () => {
      props.handleSubmit = cy.stub().as('submit');
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.name.input).type(name);
      cy.get(Selectors.email.input).type(email);
      cy.get(Selectors.searchStatus.input.active).click();
      cy.get(Selectors.contact.input).click();
      cy.get(Selectors.contact.options.email).click();
      cy.get(Selectors.privacy.input).click();
      cy.get(Selectors.terms.input).click();
      cy.get(Selectors.buttons.submit).click();

      cy.get('@submit').should(
        'be.calledOnceWithExactly',
        {
          acceptedPrivacy: true,
          acceptedTerms: true,
          email,
          followUpOptIn: '',
          name,
          phone: '',
          preferredContact: CONTACT_ENUM_OPTIONS[0],
          pronoun: '',
          searchStatus: SEARCH_STATUS_ENUM_OPTIONS[0],
        },
        ''
      );
    });

    it('should submit values - all values', () => {
      props.handleSubmit = cy.stub().as('submit');
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.name.input).type(name);
      cy.get(Selectors.email.input).type(email);
      cy.get(Selectors.pronoun.input).type(pronoun);
      cy.get(Selectors.searchStatus.input.passive).click();
      cy.get(Selectors.contact.input).click();
      cy.get(Selectors.contact.options.sms).click();
      cy.get(Selectors.phone.input).type(phone);
      cy.get(Selectors.privacy.input).click();
      cy.get(Selectors.terms.input).click();
      cy.get(Selectors.followUp.input).click();
      cy.get(Selectors.buttons.submit).click();

      cy.get('@submit').should(
        'be.calledOnceWithExactly',
        {
          acceptedPrivacy: true,
          acceptedTerms: true,
          email,
          followUpOptIn: true,
          name,
          phone: `1${phone}`,
          preferredContact: CONTACT_ENUM_OPTIONS[1],
          pronoun,
          searchStatus: SEARCH_STATUS_ENUM_OPTIONS[1],
        },
        ''
      );
    });

    it('should submit values - all values, last options', () => {
      props.handleSubmit = cy.stub().as('submit');
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.name.input).type(name);
      cy.get(Selectors.email.input).type(email);
      cy.get(Selectors.pronoun.input).type(pronoun);
      cy.get(Selectors.searchStatus.input.future).click();
      cy.get(Selectors.contact.input).click();
      cy.get(Selectors.contact.options.whatsapp).click();
      cy.get(Selectors.phone.input).type(phone);
      cy.get(Selectors.privacy.input).click();
      cy.get(Selectors.terms.input).click();
      cy.get(Selectors.followUp.input).click();
      cy.get(Selectors.buttons.submit).click();

      cy.get('@submit').should(
        'be.calledOnceWithExactly',
        {
          acceptedPrivacy: true,
          acceptedTerms: true,
          email,
          followUpOptIn: true,
          name,
          phone: `1${phone}`,
          preferredContact: CONTACT_ENUM_OPTIONS[2],
          pronoun,
          searchStatus: SEARCH_STATUS_ENUM_OPTIONS[2],
        },
        ''
      );
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
      cy.mountCandidateSignupForm(props);

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
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.buttons.submit)
        .click()
        .then(() => {
          expect(props.setIsTurnstileValid).to.be.calledOnceWithExactly(false);
          // TODO: Can we check turnstile ref is reset?
        });
    });

    it('should show privacy modal', () => {
      cy.stub(props, 'setShowPrivacyModal').as('privacyModalSpy');
      cy.mountCandidateSignupForm(props);

      cy.get('#candidate-sign-up__privacy-modal-trigger')
        .click()
        .then(() => {
          expect(props.setShowPrivacyModal).to.be.called.calledOnceWithExactly(
            true
          );
        });
    });

    it('should have correct terms link', () => {
      cy.mountCandidateSignupForm(props);

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
      props.user = {
        name,
        email,
      };
      props.isAuthenticated = true;
      cy.mountCandidateSignupForm(props);

      const nameInput = cy.get('[name=input-name]');
      nameInput.should('be.disabled');
      nameInput.should('have.value', name);
      const emailInput = cy.get('[name=input-email]');
      emailInput.should('be.disabled');
      emailInput.should('have.value', email);
    });

    it('should disable name and email with empty values if they are not present', () => {
      props.isAuthenticated = true;
      cy.mountCandidateSignupForm(props);

      const nameInput = cy.get('[name=input-name]');
      nameInput.should('be.disabled');
      nameInput.should('have.value', '');
      const emailInput = cy.get('[name=input-email]');
      emailInput.should('be.disabled');
      emailInput.should('have.value', '');
    });

    it('should display turnstile error if it is not valid', () => {
      props.isTurnstileValid = false;
      cy.mountCandidateSignupForm(props);

      cy.get('#candidate-form-turnstile__error-message').should('be.visible');
    });

    it('should submit values with turnstile token - required only', () => {
      const turnstileToken = 'XXXX.DUMMY.TOKEN.XXXX';

      props.handleSubmit = cy.stub().as('submit');
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.name.input).type(name);
      cy.get(Selectors.email.input).type(email);
      cy.get(Selectors.searchStatus.input.active).click();
      cy.get(Selectors.contact.input).click();
      cy.get(Selectors.contact.options.email).click();
      cy.get(Selectors.privacy.input).click();
      cy.get(Selectors.terms.input).click();

      // Have to wait for turnstile to be ready to submit
      cy.get('#turnstile-container').should(
        'have.attr',
        'data-turnstile-ready',
        'true'
      );

      cy.get(Selectors.buttons.submit).click();

      cy.get('@submit').should(
        'be.calledOnceWithExactly',
        {
          acceptedPrivacy: true,
          acceptedTerms: true,
          email,
          followUpOptIn: '',
          name,
          phone: '',
          preferredContact: CONTACT_ENUM_OPTIONS[0],
          pronoun: '',
          searchStatus: SEARCH_STATUS_ENUM_OPTIONS[0],
        },
        turnstileToken
      );
    });
  });
});
