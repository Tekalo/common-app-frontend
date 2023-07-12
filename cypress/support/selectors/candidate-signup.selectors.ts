export const CandidateSignupSelectors = {
  name: {
    input: 'input[name=input-name]',
  },
  email: {
    input: 'input[name=input-email]',
  },
  pronoun: {
    input: 'input[name=input-pronoun]',
  },
  searchStatus: {
    input: {
      active: 'input[name=input-searchStatus-active]',
      passive: 'input[name=input-searchStatus-passive]',
      future: 'input[name=input-searchStatus-future]',
    },
  },
  contact: {
    input: 'button[name=input-preferredContact]',
  },
  phone: {
    input: 'input[name=input-phone]',
  },
  privacy: {
    input: 'input[name=input-acceptedPrivacy]',
  },
  terms: {
    input: 'input[name=input-acceptedTerms]',
  },
  followUp: {
    input: 'input[name=input-followUpOptIn]',
  },
  turnstile: {
    input: '#candidate-form-turnstile',
  },
  buttons: {
    submit: 'button#submit-candidate-sign-up',
  },
};
