const APPLICANT_FORM_TEXT = {
  EDIT: {
    HEADER: 'Edit application',
    BACK_TO_ACCOUNT: 'Back to my account',
    SUBMIT_EDITS: 'Save edits',
    UNSAVED_WARNING: {
      TITLE: 'Unsaved changes',
      TEXT: 'Are you sure you want to leave? Changes you made will not be saved.',
      CANCEL_BTN: 'Cancel',
      CONFIRM_BTN: 'Leave page',
    },
  },
  HEADER: 'Join a network of impact-driven organizations to find your match.',
  NAVAWAY: 'Already have an account? ',
  SIGN_IN_LINK_COPY: 'Sign in',
  PRIVACY_DISCLAIMER: {
    text: 'I confirm that I have reviewed the ',
    linkText: 'Privacy Info',
  },
  TERMS_DISCLAIMER: {
    text: 'I agree to the ',
    linkText: 'Terms of Use',
  },
  SUCCESS: {
    title: 'Your application was submitted!',
    body: 'You will receive a confirmation email shortly. Your assigned Tekalo Talent Connector will review your application and contact you via your preferred contact method once matches are available. Thank you for applying to Tekalo.',
    cta: 'Done',
  },
  EXPERIENCE: 'Your experience',
  INTERESTS: 'Your interests',
  IFORG: ["If you're an organization, ", 'apply here'],
  FIELDS: {
    name: {
      label: 'Name',
      placeholder: 'Full name',
    },
    email: {
      label: 'Email',
      placeholder: 'Your email address',
      tooltipText:
        "Your email will be used to contact you about your application. It won't be used for marketing unless you opt in below.",
    },
    pronoun: {
      label: 'Pronouns (optional)',
      placeholder: 'E.g. she/her',
    },
    searchStatus: {
      label: 'Which describes you best?',
    },
    preferredContact: {
      label: 'Preferred contact method to receive matches',
      placeholder: 'Choose one',
    },
    phone: {
      label: 'Phone number',
      labelOptional: 'Phone number (optional)',
      placeholder: '+1 (555) 555-5555',
      tooltipText:
        "If you prefer not to share your phone number, choose email as your preferred contact method. If provided, your number will be used to contact you about your application. It won't be used for marketing unless you opt in below.",
    },
    followUpOptIn: {
      label:
        "I'd like to receive electronic communications with other opportunities, news, and updates from Schmidt Futures (optional)",
    },
  },
  BUTTONS: { submit: { label: 'Sign up' } },
};

export default APPLICANT_FORM_TEXT;
