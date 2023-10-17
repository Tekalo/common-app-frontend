import { voidFn } from '@/cypress/fixtures/mocks';
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
  cy.mount(
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

describe('<Applicant SignupForm />', () => {
  const name = 'Test Name';
  const email = 'test-email@schmidtfutures.com';
  const pronoun = 'they/them';
  const phone = '8101110001';

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

      cy.get(Selectors.buttons.submit).fastClick();

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
      preferredContactField.fastClick();
      cy.get('li[data-name=input-preferredContact-sms]').fastClick();

      cy.get(Selectors.buttons.submit).fastClick();
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
      preferredContactField.fastClick();
      cy.get('li[data-name=input-preferredContact-whatsapp]').fastClick();

      cy.get(Selectors.buttons.submit).fastClick();
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
      preferredContactField.fastClick();
      cy.get(Selectors.contact.options.email).fastClick();

      cy.get(Selectors.buttons.submit).fastClick();
      cy.get('label[for=input-phone]').should(
        'contain.text',
        APPLICANT_FORM_TEXT.FIELDS.phone.labelOptional
      );
      cy.get('#errorMessage-input-phone').should('not.exist');
    });

    it('should submit values - required only', () => {
      props.handleSubmit = cy.stub().as('submit');
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.name.input).fastType(name);
      cy.get(Selectors.email.input).fastType(email);
      cy.get(Selectors.searchStatus.input.active).fastClick();
      cy.get(Selectors.contact.input).fastClick();
      cy.get(Selectors.contact.options.email).fastClick();
      cy.get(Selectors.privacy.input).fastClick();
      cy.get(Selectors.terms.input).fastClick();
      cy.get(Selectors.buttons.submit).fastClick();

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

      cy.get(Selectors.name.input).fastType(name);
      cy.get(Selectors.email.input).fastType(email);
      cy.get(Selectors.pronoun.input).fastType(pronoun);
      cy.get(Selectors.searchStatus.input.passive).fastClick();
      cy.get(Selectors.contact.input).fastClick();
      cy.get(Selectors.contact.options.sms).fastClick();
      cy.get(Selectors.phone.input).wait(50).type(phone);
      cy.get(Selectors.privacy.input).fastClick();
      cy.get(Selectors.terms.input).fastClick();
      cy.get(Selectors.followUp.input).fastClick();
      cy.get(Selectors.buttons.submit).fastClick();

      cy.get('@submit')
        .invoke('getCall', 0)
        .its('args')
        .then((args) => {
          const formBody = args[0];
          expect(formBody).to.deep.include({
            acceptedPrivacy: true,
            acceptedTerms: true,
            email,
            followUpOptIn: true,
            name,
            phone: `1${phone}`,
            preferredContact: 'sms',
            pronoun: 'they/them',
            searchStatus: 'passive',
          });
        });
    });

    it('should submit values - all values, last options', () => {
      props.handleSubmit = cy.stub().as('submit');
      cy.mountCandidateSignupForm(props);

      cy.get(Selectors.name.input).fastType(name);
      cy.get(Selectors.email.input).fastType(email);
      cy.get(Selectors.pronoun.input).fastType(pronoun);
      cy.get(Selectors.searchStatus.input.future).fastClick();
      cy.get(Selectors.contact.input).fastClick();
      cy.get(Selectors.contact.options.whatsapp).fastClick();
      cy.get(Selectors.phone.input).type(phone);
      cy.get(Selectors.privacy.input).fastClick();
      cy.get(Selectors.terms.input).fastClick();
      cy.get(Selectors.followUp.input).fastClick();
      cy.get(Selectors.buttons.submit).fastClick();

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

    it('should display user info if already authenticated and it is present', () => {
      props.user = {
        name,
        email,
      };
      props.isAuthenticated = true;
      cy.mountCandidateSignupForm(props);

      cy.get('[name=input-name]')
        .should('be.disabled')
        .should('have.value', name);
      cy.get('[name=input-email]')
        .should('be.disabled')
        .should('have.value', email);
    });

    it('should disable name and email with empty values if they are not present', () => {
      props.isAuthenticated = true;
      cy.mountCandidateSignupForm(props);

      cy.get('[name=input-name]')
        .should('be.disabled')
        .should('have.value', '');
      cy.get('[name=input-email]')
        .should('be.disabled')
        .should('have.value', '');
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

      cy.get(Selectors.name.input).fastType(name);
      cy.get(Selectors.email.input).fastType(email);
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
