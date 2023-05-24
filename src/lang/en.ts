// NAV LINKS
const ACCOUNT_LINK = '/account';
const PRIVACY_LINK = '/privacy-info';
const SIGN_IN_LINK = '/sign-in';
const TERMS_LINK = '/terms';
const APPLICANT_SIGNUP_LINK = '/sign-up/applicants';
const APPLICANT_EXPERIENCE_LINK =
  '/sign-up/applicants/experience-and-interests';
const APPLICANT_SUCCESS_LINK = '/sign-up/applicants/success';
const ORG_SIGNUP_LINK = '/sign-up/organizations';
const ORG_SUCCESS_LINK = '/sign-up/organizations/success';
const CONTACT_US_MAILTO_LINK = 'mailto:support@tekalo.org';

// EXTERNAL URLS
const SCHMIDT_FUTURES_URL = 'https://www.schmidtfutures.com/';
const ALL_TECH_IS_HUMAN_URL = 'https://alltechishuman.org/';
const FAST_FORWARD_URL = 'https://www.ffwd.org/';
const US_DIGITAL_RESPONSE_URL = 'https://www.usdigitalresponse.org/about';
const EEOC_URL = 'https://www.eeoc.gov/employers';

// NAV BAR TEXT CONSTANTS
const NAV_BAR_TEXT = {
  POWERED_BY: 'Powered by Futures Engine',
  SIGN_IN: 'Sign in',
  SIGN_OUT: 'Sign out',
  MY_ACCOUNT: 'My account',
  GET_STARTED_CTA: 'Get started',
};
const NAV_FOOTER_TEXT = {
  COPYRIGHT: '© Futures Action Nework, LLC',
  RESERVED_RIGHTS: '2023. All Rights Reserved.',
  LINK_BLOCKS: [
    {
      header: 'Candidates',
      links: [
        { title: 'Get started', href: APPLICANT_SIGNUP_LINK },
        { title: 'Sign in', href: SIGN_IN_LINK },
      ],
    },
    {
      header: 'Organizations',
      links: [{ title: 'Apply', href: ORG_SIGNUP_LINK }],
    },
    {
      header: 'About',
      links: [
        { title: 'Contact Us', href: CONTACT_US_MAILTO_LINK },
        { title: 'Privacy Info', href: PRIVACY_LINK },
        { title: 'Terms of Use', href: TERMS_LINK },
      ],
    },
  ],
};

// HOME PAGE TEXT CONSTANTS
const HOME_HERO_TEXT = {
  HEADER: 'Match to what matters, build a better world',
  BODY: 'An initiative that matches tech talent with impact-driven organizations.',
  MOBILE_BODY: 'Powered by Futures Engine',
  APPLICANT_CTA: 'For candidates',
  ORG_CTA: 'For organizations',
};
const HOME_ABOUT_TEXT = {
  SPONSOR_HEADER: 'TEKALO is supported by',
  HEADER:
    'Tekalo aims to bridge the gap between tech talent and impact-driven opportunities.',
  BODY: "Now more than ever, impact-driven organizations need tech talent that is passionate about solving some of the world's most pressing problems.",
  PRONUNCIATION_TE: 'TE',
  PRONUNCIATION_KALO: '•ka•lo',
  PRONUNCIATION_DEFINITION: "Tech + Kalo ('good' in Greek)",
  PRONUNCIATION_GOAL:
    'Tekalo refers to using technology to build a better world.',
  GOAL_HEADER: 'Through Tekalo we want to:',
  GOAL_1:
    'Empower tech talent to follow non-traditional paths, and work on causes that they care about (full-time or part-time)',

  GOAL_2: 'Simplify the application process with a single form',
  GOAL_3: 'Provide impact-driven organizations a list of top candidate matches',
  ROLE_HEADER: 'Full-time and part-time roles listed on Tekalo',
};
const HOME_HOW_TEXT = {
  ORG_TITLE_1: 'Submit an opportunity',
  ORG_CONTENT_1:
    'Share open tech-related opportunities (part-time or full-time) at your organization using one simple application. Next, your assigned Talent Connector reviews your application to make sure that it’s a good fit.',
  ORG_TITLE_2: 'Intro call',
  ORG_CONTENT_2:
    'Next, your assigned Talent Connector works with you to further define your ideal candidate profile.',
  ORG_TITLE_3: 'Connect with your matched candidates',
  ORG_CONTENT_3:
    'Your Talent Connector will identify interested candidates and share their profiles. If it’s a good match, you will be introduced to the candidates!',
  CANDIDATE_TITLE_1: 'Submit a single application',
  CANDIDATE_CONTENT_1:
    'Tell us about your experience and interests by submitting the Tekalo application.',
  CANDIDATE_TITLE_2: 'Receive a list of potential matches',
  CANDIDATE_CONTENT_2:
    'Your assigned Talent Connector reviews your application and matches you with opportunities at impact-driven organizations that best fit your interests and profile. You will continue to receive potential matches, if available, every few weeks until you get hired or opt out of Tekalo.',
  CANDIDATE_TITLE_3: 'Intro call',
  CANDIDATE_CONTENT_3:
    'Next, your Talent Connector will schedule a one-time call to share more information about your potential matches and ask you additional questions about your experience and interests.',
  CANDIDATE_TITLE_4: 'Connect to your matched organizations',
  CANDIDATE_CONTENT_4:
    'Your Talent Connector will share your profile with the organization(s) that you agree to be connected to. If mutual, your Talent Connector will make an introduction!',
};
const HOME_ORG_TEXT = {
  HEADER: 'ORGANIZATIONS THAT RECRUIT USING TEKALO',
  SEE_MORE_CTA: 'See more',
  CTA_TITLE: 'Find candidates aligned with your mission.',
  CTA_BODY:
    'Instead of sorting through hundreds of applications and conducting endless screening calls, discover top tech talent through Tekalo. Applications are currently open to all 501(c)(3) organizations. Other types of organizations are welcome to apply and will be considered on a case by case basis.',
  CTA_BUTTON: 'Apply as an organization',
};
const HOME_FAQ_TEXT = {
  HEADER: 'Frequently Asked Questions',
  CANDIDATE_TOGGLE: 'For candidates',
  ORG_TOGGLE: 'For organizations',
  ORG_QUESTION_1: 'What types of organizations can apply?',
  ORG_ANSWER_1:
    'All organizations must be impact-driven and based in the United States. We accept applications from 501(c)(3) organizations. Other types of organizations are welcome to submit opportunities and will be considered on a case by case basis. All organizations must go through our vetting process. Every organization has to be an Equal Opportunity Employer (as defined by the EEOC).',
  ORG_QUESTION_2: 'What types of roles can Tekalo help me recruit for?',
  ORG_ANSWER_2:
    'We can currently help you recruit software engineers, product managers, UI/UX and product designers, as well as data analysts. If you are looking to recruit for a different type of technical role we would love to hear from you! You may contact us using the "Contact Us" form at the bottom of this page.',
  ORG_QUESTION_3: 'What types of positions can Tekalo help me recruit for?',
  ORG_ANSWER_3:
    'You can submit paid and unpaid positions, including full-time and part-time employment, contract, advisory and volunteering opportunities.',
  ORG_QUESTION_4: 'What types of candidates may I be connected to?',
  ORG_ANSWER_4: [
    'Candidates from around the world who meet the eligibility requirements (see the ',
    'Terms of Use',
    '), from all backgrounds, career paths and experience levels are welcome to apply. In your application you can specify what candidates you are looking for and your assigned Talent Connector will help you further define your ideal candidate profile during your call.',
  ],
  ORG_QUESTION_5: 'When will I receive my matches?',
  ORG_ANSWER_5:
    "We will reach out to you promptly after we've identified a potentialcandidate match. We will generally continue to look for candidates for you until your opportunity is filled or you opt out of the platform. If you don't receive a match right away don't worry; we continue to receive new candidate applications weekly.",
  ORG_QUESTION_6:
    'I am no longer looking for candidates. How do I opt out of Tekalo?',
  ORG_ANSWER_6:
    'If your opportunity is filled or you are no longer looking for candidates for a different reason, you can simply reach out to your assigned Talent Connector who will remove your opportunity from Tekalo.',
  ORG_QUESTION_7: 'What is Tekalo’s approach?',
  ORG_ANSWER_7: [
    {
      title: 'Equity:',
      text: ' strive to make the matchmaking process equitable for candidates and organizations',
    },
    {
      title: 'Connections:',
      text: ' connect talent to opportunities that may be inaccessible or not easily discovered',
    },
    {
      title: 'Transparent:',
      text: ' be transparent throughout the process, including our matchmaking policy, data privacy information, and the list of partner organizations',
    },
    {
      title: 'Seamless user experience:',
      text: ' design an experience that is seamless and accessible for all',
    },
    {
      title: 'Scalability: ',
      text: 'match more open impact-driven opportunities with tech talent to build a better world',
    },
  ],
  ORG_QUESTION_8: 'Who runs the review and matchmaking process?',
  ORG_ANSWER_8: {
    text: 'The review and matchmaking process is currently conducted by Talent Connectors at ',
    partners: [
      {
        name: 'Schmidt Futures',
        url: SCHMIDT_FUTURES_URL,
      },
      {
        name: 'All Tech Is Human',
        url: ALL_TECH_IS_HUMAN_URL,
      },
      {
        name: 'Fast Forward',
        url: FAST_FORWARD_URL,
      },
      {
        name: 'U.S. Digital Response',
        url: US_DIGITAL_RESPONSE_URL,
      },
    ],
  },
  ORG_QUESTION_9: 'How will my personal information be used or shared?',
  ORG_ANSWER_9: {
    text: 'You can find more details on our ',
    urlText: 'Privacy Info Page',
  },
  ORG_QUESTION_10: 'I would like for my account and data to be deleted.',
  ORG_ANSWER_10: [
    'You can submit a deletion request by simply emailing ',
    'privacy@tekalo.org',
    ' and request that your data be deleted. Please note that we have to retain some information for legal and technical purposes, such as your agreement with us and that we deleted your data.',
  ],
  APPLICANT_QUESTION_1:
    'What types of organizations are recruiting through Tekalo?',
  APPLICANT_ANSWER_1: [
    'You can see a list of organizations with open opportunities on Tekalo ',
    'here',
    '. We only collaborate with impact-driven organizations, and every organization goes through our vetting process. Organizations on Tekalo focus on cause areas ranging from climate change to human rights. At this time, we are only able to include organizations that are based in the United States.',
  ],
  APPLICANT_QUESTION_2: 'What types of roles can I find on Tekalo?',
  APPLICANT_ANSWER_2:
    'Right now, we are focusing on software engineers, product managers, UI/UX and product designers, as well as data analysts. If you are interested in a role currently not listed on our platform, we would love to hear from you! You may contact us using the “Contact Us” form at the bottom of this page.',
  APPLICANT_QUESTION_3: 'What types of opportunities might I find on Tekalo?',
  APPLICANT_ANSWER_3:
    'On Tekalo, there will be many types of opportunities including: full-time or part-time, paid or unpaid positions, including part-time employment, contract, advisory and volunteer.',
  APPLICANT_QUESTION_4: 'Who can apply?',
  APPLICANT_ANSWER_4: [
    'The application is open to everyone around the world who meets the eligibility requirements (',
    'see the terms',
    ')! We welcome candidates from all backgrounds, career paths and experience levels to apply.',
  ],
  APPLICANT_QUESTION_5: 'Who will review and have access to my application?',
  APPLICANT_ANSWER_5:
    'Your assigned Tekalo Talent Connector will be the one reviewing your application. Other key members of the Tekalo team will also have access to your application. If you indicated an interest in state and local government opportunities, a team at U.S. Digital Response will also receive your application details. We will never share your application with any organization/ employer unless you explicitly agree by communicating to your Talent Connector that your info may be shared with that specific organization.',
  APPLICANT_QUESTION_6: 'When will I receive my matches?',
  APPLICANT_ANSWER_6:
    "Our matchmaking process is iterative; we will generally continue to look for matches for you until you have a job or let us know that you are no longer looking for opportunities. We will aim to conduct the first round of matchmaking within 6 weeks of receiving your application. Once we conclude each matchmaking round, we will send you a list of your top matches. If you don't receive matches right away don't worry; we continue to receive new opportunities weekly.",
  APPLICANT_QUESTION_7:
    'I am no longer looking for opportunities at this time. How do I pause further matches?',
  APPLICANT_ANSWER_7:
    'If you are no longer looking for opportunities, you can log in to youraccount by clicking "Sign in" at the top of this page, and choose to pause your matches. If you would like to be considered for opportunities again, you can simply sign in and click "resume my matches." If you would like to fully delete your account and data, see the FAQ titled ("How can I delete my account and data?").',
  APPLICANT_QUESTION_8: 'Is Tekalo free?',
  APPLICANT_ANSWER_8:
    'Yes! Tekalo is a free resource. We will never ask you for payment information.',
  APPLICANT_QUESTION_9: 'What is Tekalo’s approach?',
  APPLICANT_QUESTION_10: 'Who runs the review and matchmaking process?',
  APPLICANT_QUESTION_11: 'How will my personal information be used or shared?',
  APPLICANT_QUESTION_12: 'How can I delete my account and data?',
  APPLICANT_ANSWER_12:
    'You can simply click “Sign in” at the top of this page and then once you are logged in select “Delete my account and data.” Please note that we have to retain some information for legal and technical purposes, such as your agreement with us and that we deleted your data.',
};
const HOME_CONTACT_TEXT = {
  HEADER: 'Get in touch',
  BODY: 'We want to hear from you and answer your questions',
  CTA: 'Contact us',
};

// ACCOUNT PAGE TEXT CONSTANTS
const ACCOUNT_PAGE_TEXT = {
  WELCOME: 'Welcome back,',
  MANAGE: 'Manage your settings',
  ACCOUNT: 'Your Account',
  APP_SUBMITTED: ' Application submitted',
  APP_SUBMITTED_BODY:
    "You're all set. We'll contact you via your preferred method.",
  APP_CONTINUE: 'Continue my application >',
  APP_CONTINUE_BODY: 'Your application has not been submitted yet',
  APP_OPT_IN_TITLE: 'Opt back in for matches >',
  APP_OPT_IN_BODY: 'Your matches are paused until you opt back in.',
  APP_PAUSE_TITLE: 'Pause my matches >',
  APP_PAUSE_BODY:
    "If you're not looking for matches now, we'll stop contacting you until you opt back in.",
  APP_DELETE_TITLE: 'Delete my account and data >',
  APP_DELETE_BODY: 'Permanently delete your account and saved data.',
};

/** MODAL TEXT CONSTANTS */
const PRIVACY_MODAL_TEXT = {
  HEADER: 'Privacy Info',
  BODY: 'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.',
  EXTRAS: ['See our ', 'Privacy FAQ', ' for more information'],
};
const SAVE_MODAL = {
  HEADER: 'Your progress has been saved!',
  BODY: 'If you need to leave, you can click “Sign in” from the homepage, then return to the application.',
  CTA: 'Ok',
};
const CONFIRM_MODAL = {
  HEADER: 'Delete this role',
  BODY: "Are you sure you want to delete this role? You won't be able to undo this.",
  CTA_CANCEL: 'Cancel',
  CTA_CONFIRM: 'Delete role',
};
const DELETE_MODAL = {
  CTA_CONFIRM: 'Delete account',
  CTA_CANCEL: 'Cancel',
  HEADER: 'Permanently delete your account and data',
  BODY: 'Are you sure you want to permanently delete you account and data? This may take up to 30 days. Choose "delete account" to start deletion.',
};
const PAUSE_MODAL = {
  CTA_CONFIRM: 'Pause matches',
  CTA_CANCEL: 'Cancel',
  HEADER: 'Pause your matches',
  BODY: 'Are you sure you want to pause your matches?',
};
const RESUME_MODAL = {
  CTA_CONFIRM: 'Resume matches',
  CTA_CANCEL: 'Cancel',
  HEADER: 'Resume your matches',
  BODY: 'Are you sure you want to resume your matches?',
};

/** FORM TEXT CONSTANTS */
const APPLICANT_FORM_TEXT = {
  HEADER: 'Join a network of impact-driven organizations to find your match.',
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
};
const ORG_FORM_TEXT = {
  SUCCESS: {
    title: 'Your intake form was submitted!',
    body: 'You will receive a confirmation email shortly. Your assigned Tekalo recruiting liaison will review your application and contact you. This process may take up to 6 weeks. Thank you for applying to Tekalo.',
    cta: 'Done',
  },
};
const INTEREST_FORM_TEXT = {
  USDR: [
    'By choosing “yes,” you consent to ',
    'U.S. Digital Response',
    ' saving a copy of your Tekalo profile in its own database and sending you electronic communications. USDR may contact you about opportunities in state and local governments, and add you to their newsletter which contains government job opportunities.',
  ],
};
const ORG_SIGNUP_FORM_TEXT = {
  EEOC: {
    text: 'Please confirm that you are an Equal Opportunity Employer as defined by the ',
    linkText: 'EEOC',
  },
};
const REVIEW_FORM_TEXT = {
  PRIVACY_DISCLAIMER: {
    text: 'I confirm that I have reviewed the ',
    linkText: 'Privacy Info',
  },
};

/** Select Options Texts */
const YOE_OPTION_TEXT = {
  lt1: 'Less than 1',
  gt11: '11+',
};
const VISA_SPONSOR_TEXT = {
  yes: 'Yes, we sponsor U.S. visas',
  no: 'No, we do not sponsor U.S. visas',
  sometimes: 'We sponsor U.S. visas in some cases',
};
const COMMITMENT_TEXT = {
  fullTime: 'Full-time employment',
  partTime: 'Part-time/short term opportunities',
};
const ROLE_TEXT = {
  uxResearcher: 'UX researcher',
  uxDesigner: 'UX/UI designer',
};
const YES_NO_TEXT = {
  yes: 'Yes',
  no: 'No',
};
const PAID_TEXT = {
  paid: 'Paid',
  unpaid: 'Unpaid',
};
const USDR_TEXT = {
  paid: 'Paid government jobs with local & state governments',
  unpaid: 'Volunteer (unpaid) roles with USDR to support government partners',
};
const WORK_AUTHORIZATION_TEXT = {
  authorized: 'I am authorized to work in the U.S.',
  sponsorship:
    'I will now or in the future require sponsorship to work in the U.S.',
};
const SEARCH_STATUS_TEXT = {
  active: "I'm actively looking for a new role",
  passive: "I'm flexible, casually looking for opportunities",
  future: 'I want to stay in touch for opportunities in the future',
};
const CONTACT_OPTION_TEXT = {
  email: 'Email',
  sms: 'Text message',
  whatsapp: 'WhatsApp message',
};
const REMOTE_OPTION_TEXT = {
  remoteOnly: 'Only open to remote',
  notRemote: 'Not open to remote',
  both: 'Open to remote or in-person',
};
const ORG_SIZE_TEXT = {
  employees: ' employees',
};

// SELECT EXPORTS
export {
  YOE_OPTION_TEXT,
  VISA_SPONSOR_TEXT,
  COMMITMENT_TEXT,
  ROLE_TEXT,
  YES_NO_TEXT,
  PAID_TEXT,
  USDR_TEXT,
  WORK_AUTHORIZATION_TEXT,
  SEARCH_STATUS_TEXT,
  CONTACT_OPTION_TEXT,
  REMOTE_OPTION_TEXT,
  ORG_SIZE_TEXT,
};
// INTERNAL LINK EXPORTS
export {
  ACCOUNT_LINK,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  APPLICANT_SUCCESS_LINK,
  CONTACT_US_MAILTO_LINK,
  ORG_SIGNUP_LINK,
  ORG_SUCCESS_LINK,
  PRIVACY_LINK,
  SIGN_IN_LINK,
  TERMS_LINK,
};
// EXTERNAL LINK EXPORTS
export {
  SCHMIDT_FUTURES_URL,
  ALL_TECH_IS_HUMAN_URL,
  FAST_FORWARD_URL,
  US_DIGITAL_RESPONSE_URL,
  EEOC_URL,
};
// NAV EXPORTS
export { NAV_BAR_TEXT, NAV_FOOTER_TEXT };
// HOME PAGE EXPORTS
export {
  HOME_HERO_TEXT,
  HOME_ABOUT_TEXT,
  HOME_HOW_TEXT,
  HOME_ORG_TEXT,
  HOME_FAQ_TEXT,
  HOME_CONTACT_TEXT,
};
// ACCOUNT PAGE EXPORTS
export { ACCOUNT_PAGE_TEXT };
// FORM EXPORTS
export {
  APPLICANT_FORM_TEXT,
  INTEREST_FORM_TEXT,
  REVIEW_FORM_TEXT,
  ORG_SIGNUP_FORM_TEXT,
  ORG_FORM_TEXT,
};
// MODAL EXPORTS
export {
  PRIVACY_MODAL_TEXT,
  SAVE_MODAL,
  CONFIRM_MODAL,
  PAUSE_MODAL,
  RESUME_MODAL,
  DELETE_MODAL,
};
