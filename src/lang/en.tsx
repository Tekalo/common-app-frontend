import { GreenCircleCheck } from '@/lib/constants/svgs';
import { BasisTableData, ContentTableData, IFaqItem } from '@/lib/types';
import BasisTable from '@/modules/components/tables/BasisTable/BasisTable';
import Link from 'next/link';

// META
const META = {
  ALT_TEXT: 'Tekalo: Match to what matters; build a better world.',
  DESCRIPTION:
    'Tekalo is an initiative that matches tech talent with impact-driven organizations. Now more than ever, impact-driven orgs need tech talent that is passionate about solving the world’s most pressing problems.',
  TITLE: 'Tekalo | Do Good',
  TWITTER_HANDLE: '@schmidtfutures',
  IMAGE: `https://www.tekalo.org/images/tekalo_social.png`,
};

// TRACKING
const TRACKING = {
  CANDIDATE_APP_SUBMITTED: 'candidate_application_submitted',
  CANDIDATE_NEXT_BTN: 'candidate_your_experience_next_clicked',
  CANDIDATE_SIGNUP: 'candidate_signup_complete',
};

// NAV LINKS
const BASE_LINK = '/';
const ACCOUNT_LINK = '/account';
const PRIVACY_LINK = '/privacy-info';
const SIGN_IN_LINK = '/sign-in';
const SIGN_IN_REDIRECT = '/signin-action';
const TERMS_LINK = '/terms';
const APPLICANT_SIGNUP_LINK = '/sign-up/applicants';
const APPLICANT_EXPERIENCE_LINK =
  '/sign-up/applicants/experience-and-interests';
const APPLICANT_SUCCESS_LINK = '/sign-up/applicants/success';
const ORG_SIGNUP_LINK = '/sign-up/organizations';
const ORG_SUCCESS_LINK = '/sign-up/organizations/success';
const CONTACT_US_MAILTO_LINK = 'mailto:support@tekalo.org';

// Cookie consent
const COOKIE_CONSENT = {
  COPY: [
    'Tekalo, an initiative of Futures Action Network, uses cookies and similar technologies, including third-party cookies, to optimize the functionality of the services, analyze how you interact with our program, measure the effectiveness of our digital campaigns, and offer social media features. For more information, see our ',
    'privacy info',
    '.',
  ],
  ACCEPT_BTN: 'Accept',
  DECLINE_BTN: 'Decline',
};

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
  FOR_CANDIDATES: 'For candidates',
  FOR_ORGS: 'For organizations',
  FAQ: 'FAQs',
  HOW_IT_WORKS: 'How it works',
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
const NAV_LITE_FOOTER_TEXT = {
  RESERVED_RIGHTS: '2023. All Rights Reserved',
  LINK_BLOCKS: [
    { text: 'Privacy Info', href: PRIVACY_LINK },
    { text: 'Terms of Use', href: TERMS_LINK },
  ],
};
const NAV_LITE_HEADER_TEXT = {
  contactUs: 'Contact us',
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
  TITLE: 'How it works',
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
    "We will reach out to you promptly after we've identified a potential candidate match. We will generally continue to look for candidates for you until your opportunity is filled or you opt out of the platform. If you don't receive a match right away don't worry; we continue to receive new candidate applications weekly.",
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
    'Our matchmaking process is iterative; we will generally continue to look for matches for you until you have a job or let us know that you are no longer looking for opportunities. We will aim to conduct the first round of matchmaking within 6 weeks of receiving your application. Once we conclude each matchmaking round, we will send you a list of your top matches. If you don’t receive matches right away don’t worry; we continue to receive new opportunities weekly.',
  APPLICANT_QUESTION_7:
    'I am no longer looking for opportunities at this time. How do I pause further matches?',
  APPLICANT_ANSWER_7:
    'If you are no longer looking for opportunities, you can log in to your account by clicking "Sign in" at the top of this page, and choose to pause your matches. If you would like to be considered for opportunities again, you can simply sign in and click "resume my matches." If you would like to fully delete your account and data, see the FAQ titled ("How can I delete my account and data?").',
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
  WELCOME: 'Welcome back',
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
const ERROR_MODAL_TEXT = {
  emailExists: 'Email already exists',
  requestFailed: 'Request Failed',
  signIn: 'Please sign in',
  somethingWrong: 'Something went wrong. Please try again later.',
  okButton: 'Ok',
};
const PRIVACY_MODAL_TEXT = {
  HEADER: 'Privacy Info',
  BODY: 'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.',
  EXTRAS: ['See our ', 'Privacy FAQ', ' for more information'],
};
const SAVE_MODAL = {
  HEADER: (
    <>
      <div className="mr-2 inline-block pt-1 align-top">{GreenCircleCheck}</div>
      <div className="inline-block w-[80%]">Your progress has been saved!</div>
    </>
  ),
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
  BODY: 'Are you sure you want to permanently delete your account and data? This may take up to 30 days. Choose "delete account" to start deletion.',
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
const INTEREST_FORM_TEXT = {
  BUTTONS: {
    save: {
      label: 'Save your progress',
    },
    submit: {
      label: 'Submit',
    },
  },
  FIELDS: {
    interestEmploymentType: {
      label:
        'What type(s) of opportunities are you interested in? Choose all that apply',
      helperText:
        'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.',
    },
    interestWorkArrangement: {
      label:
        'What type of part-time or short-term opportunities are you interested in?',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Types selected',
      selectionLabelSingle: ' Type selected',
    },
    interestRoles: {
      label: 'What role(s) are you interested in?',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Roles selected',
      selectionLabelSingle: ' Role selected',
    },
    hoursPerWeek: {
      label: 'Hours per week you are able to commit (optional)',
      placeholder: 'Approximate number of hours',
    },
    currentLocation: {
      label: 'Current location',
      placeholder: 'City, state and/or country',
    },
    openToRelocate: {
      label: 'Open to relocating?',
      placeholder: 'Choose one',
    },
    openToRemote: {
      label: 'Prefer to be remote or in person?',
      placeholder: 'Choose one',
      selectionLabelMulti: ' Options selected',
      selectionLabelSingle: ' Option selected',
    },
    desiredSalary: {
      label: 'Desired salary (optional)',
      placeholder: 'Enter a range',
    },
    interestCauses: {
      selectLabel:
        'Which causes are you interested in hearing opportunities for?',
      rankLabel:
        'Rank the causes you would be interested in working on with 1 being the highest.',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Causes selected',
      selectionLabelSingle: ' Cause selected',
    },
    otherCauses: {
      label: 'Other causes (optional)',
      placeholder: 'Additional causes separated by commas',
    },
    workAuthorization: {
      label: 'Work authorization (optional)',
      placeholder: 'Choose one',
      tooltipText:
        'If you require U.S. visa sponsorship now or in the future, we can do our best to match you with opportunities that sponsor visas',
    },
    interestGovt: {
      label:
        'Are you interested in U.S. state or local government opportunities?',
      helperText: (
        <>
          <div className="space-y-2">
            <div className="w-[103%] text-left text-p3-mobile text-black-text">
              {'By choosing “yes,” you consent to '}
              <a
                href={US_DIGITAL_RESPONSE_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {'U.S. Digital Response'}
              </a>
              {
                ' saving a copy of your Tekalo profile in its own database and sending you electronic communications. USDR may contact you about opportunities in state and local governments, and add you to their newsletter which contains government job opportunities.'
              }
            </div>
          </div>
        </>
      ),
    },
    interestGovtEmplTypes: {
      label: 'Which opportunities from USDR are you interested in?',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Opportunity selected',
      selectionLabelSingle: ' Opportunities selected',
    },
    previousImpactExperience: {
      label:
        'Do you have previous experience working at a nonprofit or public service organization?',
      placeholder: '',
    },
    essayResponse: {
      label:
        'If you had unlimited resources what problem would you choose to solve and why?',
      placeholder: "Write as much as you'd like, suggested up to 250 words.",
      tooltipText:
        'This response will only be reviewed by Tekalo recruiters and will help them learn more about your interests.',
    },
    referenceAttribution: {
      label: 'How did you hear about Tekalo? (optional)',
      placeholder: 'Choose one',
    },
  },
};
const APPLICANT_EXPERIENCE_FORM_TEXT = {
  BUTTONS: {
    save: {
      label: 'Save your progress',
    },
    submit: {
      label: 'Next',
    },
  },
  FIELDS: {
    lastRole: {
      label: 'Current or most recent role',
      placeholder: 'Role',
    },
    lastOrg: {
      label: 'Current or most recent organization',
      placeholder: 'Name of organization',
    },
    yoe: {
      label: 'Current or most recent organization',
      placeholder: 'Name of organization',
    },
    skills: {
      label: 'Which of these skills apply to you? (optional)',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' Skills selected',
      selectionLabelSingle: ' Skill selected',
    },
    otherSkills: {
      label: 'Other skills (optional)',
      placeholder: 'Skills separated by commas',
    },
    linkedInUrl: {
      label: 'LinkedIn (optional)',
      placeholder: 'LinkedIn URL',
    },
    portfolioUrl: {
      label: 'Portfolio (optional)',
      placeholder: 'Portfolio URL',
    },
    portfolioPassword: {
      label: 'Portfolio password (optional)',
      placeholder: 'Password to view website',
      tooltipText:
        "If you maintain a website with a portfolio that is password-protected,  you may share your password here. Don't share any sensitive passwords as this field is not secure.",
    },
    githubUrl: {
      label: 'Github (optional)',
      placeholder: 'Github URL',
    },
    resumeUrl: {
      label: 'Link to resume (optional)',
      placeholder: 'Resume URL',
      tooltipText:
        'You may upload your resume to a file-sharing service such as Google Drive, Box, Dropbox and share the link here. As an alternative, make sure to include a link to your LinkedIn profile or similar above.',
    },
    resumePassword: {
      label: 'Resume password (optional)',
      placeholder: 'Password to view resume',
    },
  },
};
const ORG_SIGNUP_FORM_TEXT = {
  BUTTONS: {
    submit: {
      label: 'Next',
    },
  },
  FIELDS: {
    orgName: {
      label: 'Organization name',
      placeholder: "Organization's legal name",
    },
    orgType: {
      label: 'Organization type',
      placeholder: 'Choose one',
      tooltipText:
        'We accept applications from 501(c)(3) organizations. Other types of impact-driven organizations are welcome to submit opportunities and will be considered on a case by case basis.',
    },
    orgSize: {
      label: 'Organization size',
      placeholder: 'Choose one',
      tooltipText: '',
    },
    orgImpactAreas: {
      label: 'Impact area(s) the organization works on',
      placeholder: 'Choose all that apply',
      selectionLabelSingle: ' Area selected',
      selectionLabelMulti: ' Areas selected',
    },
    orgContactName: {
      label: 'Contact name',
      placeholder: 'Full name',
      tooltipText: '',
    },
    orgContactEmail: {
      label: 'Contact email',
      placeholder: 'Email address',
      tooltipText: '',
    },
    orgContactPhone: {
      label: 'Contact phone (optional)',
      placeholder: '+1 (555) 555-5555',
      tooltipText:
        "If provided, your number will be used to contact you about your application. It won't be used for marketing.",
    },
    orgEmploymentTypes: {
      label:
        'What type(s) of positions are you looking to fill? Choose all that apply.',
      placeholder: '',
      helperText:
        'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.',
    },
    orgEOE: {
      label: (
        <>
          <div className="space-y-2">
            <div className="w-[103%] text-left text-p3-mobile text-black-text">
              {
                'Please confirm that you are an Equal Opportunity Employer as defined by the '
              }
              <a
                href={EEOC_URL}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                {'EEOC'}
              </a>
            </div>
          </div>
        </>
      ),
      placeholder: 'Choose one',
    },
    referenceAttribution: {
      label: 'How did you hear about Tekalo? (optional)',
      placeholder: 'Choose one',
    },
    referenceOptional: {
      label: 'If you chose other, please specify (optional)',
      placeholder: 'How did you hear about Tekalo?',
    },
  },
};
const ORG_FORM_TEXT = {
  SUCCESS: {
    title: 'Your intake form was submitted!',
    body: 'You will receive a confirmation email shortly. Your assigned Tekalo Talent Connector will review your application and contact you once they have updates available. Thank you for applying to Tekalo.',
    cta: 'Done',
  },
  NAV: {
    title: 'Recruit qualified candidates from the Tekalo network',
    navawayText: "If you're a candidate looking for opportunities, ",
    navText: 'sign up here',
  },
  CONTACT: 'Contact',
  BREADCRUMB: 'Role',
  DELETE_ROLE: 'Delete this role',
};
const ORG_ROLE_FORM_TEXT = {
  BUTTONS: {
    addRole: {
      label: 'Add another role',
    },
    review: {
      label: 'Go to review',
    },
  },
  FIELDS: {
    paid: {
      label: 'Is this role paid or unpaid?',
    },
    roleType: {
      label: 'What type of role is this?',
      placeholder: 'Choose one',
    },
    employmentTypeSelect: {
      label: 'What type of opportunity is this?',
      placeholder: 'Choose one',
    },
    employmentTypeText: {
      label: 'If you chose other, please specify (optional)',
      placeholder: 'Type of opportunity',
    },
    positionTitle: {
      label: 'Position Title',
      placeholder: 'Position Title',
    },
    jdUrl: {
      label: 'Link to job description (optional)',
      placeholder: 'Job description URL',
    },
    salaryRange: {
      labelFte: 'Salary range',
      labelPte: 'Pay range',
      placeholder: 'Enter a range',
    },
    desiredHoursPerWeek: {
      label: 'Desired hours per week (optional)',
      placeholder: 'Approximate number of hours',
    },
    fullyRemote: {
      label: 'Is this role fully remote?',
      placeholder: '',
    },
    location: {
      label: 'Location(s) (optional)',
      placeholder: 'List all locations in "city, state" format',
    },
    visaSponsorship: {
      label: 'Do you offer Visa sponsorship?',
      placeholder: 'Choose one',
    },
    desiredStartDate: {
      label: 'Desired start date (optional)',
      placeholder: 'mm/dd/yyyy',
    },
    desiredEndDate: {
      label: 'Desired end date (optional)',
      placeholder: 'mm/dd/yyyy',
    },
    desiredYoe: {
      label: 'Desired years of experience',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' options selected',
      selectionLabelSingle: ' option selected',
    },
    desiredSkills: {
      label: 'Desired skills for the role (optional)',
      placeholder: 'Choose all that apply',
      selectionLabelMulti: ' options selected',
      selectionLabelSingle: ' option selected',
    },
    desiredOtherSkills: {
      label: 'Other desired skills if not listed above (optional)',
      placeholder: 'Desired skills separated by commas',
    },
    similarStaffed: {
      label: 'Are there employees on staff with the same or similar role?',
      placeholder: '',
    },
    desiredImpactExp: {
      label:
        'Desired impact-related experience or passion that you are looking for in a candidate (optional)',
      placeholder: 'Your answer here. Maximum 200 words.',
    },
    pitchEssay: {
      label: 'How would you pitch this role in a few sentences?',
      placeholder: 'Your answer here. Maximum 200 words.',
    },
  },
};
const REVIEW_FORM_TEXT = {
  HEADER: 'Review your intake form',
  ORG_DETAIL: {
    title: 'Contact and organization',
  },
  PRIVACY_DISCLAIMER: {
    text: 'I confirm that I have reviewed the ',
    linkText: 'Privacy Info',
  },
  BUTTONS: {
    submit: {
      label: 'Submit',
    },
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
  partTime: 'Part-time/short-term opportunities',
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
  noAnswer: 'No option selected',
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
const ORG_SIZE_LABEL_TEXT = {
  employees: ' employees',
};

/** APP TEXT CONSTS */
const HEAD_TEXT = {
  candidates: 'Tekalo | Candidates',
  organizations: 'Tekalo | Organizations',
  home: 'Tekalo | Do Good',
};
const ERROR_TEXT = {
  chooseOne: 'Choose at least one',
  currentLocation: 'Current location is required',
  eoeRequired:
    'Tekalo only works with Equal Opportunity Employers as defined by the EEOC.',
  fallbackError:
    'An error occurred. Please try again later or contact support. Error:',
  impactAreasRequired: 'You must select at least one impact area',
  interestCauses: 'You must select at least one cause',
  interestRoles: 'You must select at least one role',
  invalidDate: 'Invalid date',
  invalidEmail: 'This must be a valid email address',
  invalidPhone: 'This must be a valid phone number',
  notFoundCode: '404',
  notFoundText: "Sorry, we couldn't find this page.",
  orgRequired: 'Organization is required',
  privacyRequired: 'You must confirm that you have reviewed the Privacy Info',
  required: 'This is a required field',
  requiredSelectGroup: 'You must select at least one option',
  roleRequired: 'Role is required',
  somethingWrong: 'Something went wrong - please try again',
  termsRequired: 'You must agree to the Terms of Use',
  unhandledCode: '500',
  unhandledText: 'Oops something went wrong. Please try again later.',
  unknownError: 'An unknown error has occurred',
  userAlreadyExists: 'This account already exists, please sign in',
};

/** ENUM TEXT CONSTANTS */
const TURNSTILE_ENUM_OPTIONS = {
  error: 'error',
  expired: 'expired',
  solved: 'solved',
};
const ORG_TYPE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '501(c)(3)',
  '501(c)(4)',
  'llc',
  'b corp',
  'other',
];
const ORG_SIZE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '<20',
  '20-50',
  '51-100',
  '101-200',
  '201-500',
  '500+',
];
const EMPLOYMENT_TYPE_TEXT = {
  fte: 'full-time employee',
  volunteer: 'volunteer',
  contractor: 'contractor',
  consultant: 'consultant',
  advisor: 'advisor',
  internship: 'internship',
  other: 'other',
};
const EMPLOYMENT_TYPE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  EMPLOYMENT_TYPE_TEXT.fte,
  EMPLOYMENT_TYPE_TEXT.volunteer,
  EMPLOYMENT_TYPE_TEXT.contractor,
  EMPLOYMENT_TYPE_TEXT.consultant,
  EMPLOYMENT_TYPE_TEXT.advisor,
  EMPLOYMENT_TYPE_TEXT.internship,
  EMPLOYMENT_TYPE_TEXT.other,
];
const COMMITMENT_ENUM_TEXT = {
  full: 'full',
  part: 'part',
};
const COMMITMENT_ENUM_OPTIONS: readonly [string, ...string[]] = [
  COMMITMENT_ENUM_TEXT.full,
  COMMITMENT_ENUM_TEXT.part,
];
const PAID_ENUM_OPTIONS: readonly [string, ...string[]] = ['paid', 'unpaid'];
const YOE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '<1',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '>11',
];
const YOE_RANGE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '0-2',
  '2-4',
  '4-8',
  '8-12',
  '12-15',
  '15+',
];
const BOOL_ENUM_OPTIONS: readonly [string, ...string[]] = ['true', 'false'];
const SKILL_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'react',
  'javascript',
  'python',
  'java',
  'sql',
  'privacy',
  'security',
  'devops',
  'figma',
  'sketch',
  'prototyping',
  'user research',
  'product development',
  'project management',
];
const ROLE_ENUM_TEXT = {
  dataAnalyst: 'data analyst',
  dataScientist: 'data scientist',
  engManager: 'engineering manager',
  pd: 'product designer',
  pm: 'product manager',
  swe: 'software engineer',
  sweBackend: 'software engineer - backend',
  sweFrontend: 'software engineer - frontend',
  ux: 'ux/ui designer',
  uxResearcher: 'ux researcher',
  vpEng: 'vp of engineering (or similar)',
  vpProduct: 'vp of product (or similar)',
  other: 'other',
};
const ROLE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  ROLE_ENUM_TEXT.dataAnalyst,
  ROLE_ENUM_TEXT.dataScientist,
  ROLE_ENUM_TEXT.pm,
  ROLE_ENUM_TEXT.vpProduct,
  ROLE_ENUM_TEXT.swe,
  ROLE_ENUM_TEXT.sweBackend,
  ROLE_ENUM_TEXT.sweFrontend,
  ROLE_ENUM_TEXT.engManager,
  ROLE_ENUM_TEXT.vpEng,
  ROLE_ENUM_TEXT.pd,
  ROLE_ENUM_TEXT.ux,
  ROLE_ENUM_TEXT.uxResearcher,
  ROLE_ENUM_TEXT.other,
];
const CAUSE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'climate change',
  'environment',
  'human rights & social justice',
  'international development',
  'education',
  'health & well being',
  'government tech',
  'tech policy',
  'trust & safety',
  'other',
];
const VISA_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'yes',
  'no',
  'sometimes',
];
const RELOCATION_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'yes',
  'no',
  'not sure',
];
const REMOTE_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'remote',
  'in-person',
  'hybrid',
  'not sure',
];
const WORKAUTH_ENUM_OPTIONS: readonly [string, ...string[]] = [
  '',
  'authorized',
  'sponsorship',
];
const REF_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'linkedIn',
  'other social media',
  'partner organization - all tech is human',
  'partner organization - fast forward',
  'partner organization - USDR',
  'career fair or other event',
  'other',
  '',
];
const CONTACT_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'email',
  'sms',
  'whatsapp',
];
const SEARCH_STATUS_ENUM_OPTIONS: readonly [string, ...string[]] = [
  'active',
  'passive',
  'future',
];

/** PRIVACY INFO TEXT CONSTANTS */
const APPLICANT_CONTENT_TABLE_TEXT: ContentTableData = {
  headers: [
    {
      heading: '',
      subheading: '',
    },
    {
      heading: 'Data Type',
      subheading: '(what info do you collect?)',
    },
    {
      heading: 'Uses',
      subheading: '(how do you use my info?)',
    },
    {
      heading: 'Third Parties',
      subheading: '(who can see my info?)',
    },
  ],
  content: [
    {
      heading: 'Info You provide',
      bullets: [
        [
          'Personal Info',
          'Application Materials',
          'Communications',
          'Surveys, feedback',
        ],
        [
          'Identify You and Operate Tekalo',
          'Conduct Research and Improve Tekalo',
        ],
        ['Talent Connectors', 'Organizations', 'Service Providers'],
      ],
    },
    {
      heading: 'Info we observe',
      bullets: [
        [
          'Technical Info (e.g. browser, device, IP, trackers, server logs)',
          'Tekalo Usage and Application Outcomes',
        ],
        [
          'Quality of Service',
          'Security',
          'Ads',
          'Conduct Research and Improve Tekalo',
        ],
        ['Service Providers'],
      ],
    },
    {
      heading: 'Other sources',
      bullets: [
        ['Data from other programs run by Schmidt Futures or third parties'],
        ['Enable Applicants to Other Programs to Utilize Tekalo'],
        ['Talent Connectors', 'Organizations', 'Service Providers'],
      ],
    },
  ],
};
const ORG_CONTENT_TABLE_TEXT: ContentTableData = {
  headers: [
    {
      heading: '',
      subheading: '',
    },
    {
      heading: 'Data Type',
      subheading: '(what info do you collect?)',
    },
    {
      heading: 'Uses',
      subheading: '(how do you use my info?)',
    },
    {
      heading: 'Third Parties',
      subheading: '(who can see my info?)',
    },
  ],
  content: [
    {
      heading: 'Info You provide',
      bullets: [
        [
          'Personal Info',
          'Professional Info',
          'Communications',
          'Surveys, feedback',
        ],
        [
          'Identify You and Operate Tekalo',
          'Conduct Research and Improve Tekalo',
        ],
        [
          'Users',
          'Other Talent Connectors and Organizations',
          'Service Providers',
        ],
      ],
    },
    {
      heading: 'Info we observe',
      bullets: [
        [
          'Technical Info (e.g. browser, device, IP, trackers, server logs)',
          'Usage and Outcomes',
        ],
        [
          'Quality of Service',
          'Security',
          'Ads',
          'Conduct Research and Improve Tekalo',
        ],
        ['Service Providers'],
      ],
    },
    {
      heading: 'Other sources',
      bullets: [
        [
          'Publicly available information (e.g. from review sites, news articles, and social networking sites)',
        ],
        [
          'Understand the workplace environment and other details of Organizations',
        ],
        ['Users', 'Talent Connectors', 'Service Providers'],
      ],
    },
  ],
};
const BASIS_TABLE_TEXT: BasisTableData = {
  headers: ['Data processing activity', 'Lawful Basis'],
  content: [
    {
      activity: 'Identify You and Operate Tekalo',
      basis: (
        <>
          Contractual necessity
          <br />
          (You agree to our Terms of Use, whereby we collect your info, review
          it, and connect you with the opportunities you’ve requested.)
        </>
      ),
    },
    {
      activity: 'Conduct Research and Improve Tekalo',
      basis: (
        <>
          Legitimate Interests
          <br />
          (We collect feedback and perform analytics so that we can measure our
          impact and improve Tekalo.)
        </>
      ),
    },
    {
      activity: 'Maintain Quality of Service and Security',
      basis: (
        <>
          Legitimate Interests
          <br />
          (We use data to help provide a secure and well-running service.)
        </>
      ),
    },
    {
      activity: 'Target / Measure Ads Promoting Tekalo',
      basis: (
        <>
          Legitimate Interests / Consent
          <br />
          (We may use data and technologies such as pixels to help target ads
          promoting Tekalo and to measure the effectiveness of those ads.)
        </>
      ),
    },
    {
      activity: 'Send Marketing Emails',
      basis: (
        <>
          Consent
          <br />
          (We’ll only send you emails unrelated to Tekalo if you opt in.)
        </>
      ),
    },
    {
      activity: 'Share Your Info with Talent Connectors and Service Providers',
      basis: (
        <>
          Legitimate Interests
          <br />
          (We share your info with vetted non-profit entities and vendors, with
          whom we have appropriate contracts, to help us operate Tekalo.)
        </>
      ),
    },
    {
      activity: 'Share Your Info with Organizations',
      basis: (
        <>
          Consent
          <br />
          (We ask for your permission to share your info with Organizations so
          that you’re only contacted by ones you’re actually interested in.)
        </>
      ),
    },
    {
      activity: 'Others',
      basis: (
        <>
          We can’t imagine every possible scenario, so if we need to use your
          data for another purpose, we’ll let you know!
        </>
      ),
    },
  ],
};
const ORG_FAQ_TEXT: Array<IFaqItem> = [
  {
    questionText:
      'What are Talent Connectors, Organizations, and Service Providers?',
    answerText: (
      <>
        <b>Talent Connectors</b> are entities who work with us to help review
        applications and connect individuals with Organizations that might be a
        good fit. <b>Organizations</b> are entities that are looking for
        talented individuals. <b>Service Providers</b> are vendors who provide
        services that support Tekalo such as web hosting, cloud services,
        analytics, and email marketing.
      </>
    ),
  },
  {
    questionText:
      'How do you decide which Organizations to share my info with?',
    answerText: (
      <>
        Talent Connectors from Schmidt Futures and our collaborating
        organizations, such as All Tech Is Human, US Digital Response, and Fast
        Forward, will review applications and identify potential candidates.
        They will then reach out to you to share those potential opportunities
        and seek your permission to make your info available to the relevant
        Organizations
      </>
    ),
  },
  {
    questionText: 'Do you show ads?',
    answerText: (
      <>
        We don’t show any ads on Tekalo! We only promote Tekalo itself via
        things like social media ads and email marketing, and we use tracking
        technologies such as cookies, pixels, and beacons to measure their
        performance.
      </>
    ),
  },
  {
    questionText: 'What rights do I have to respect to my data?',
    answerText: (
      <>
        We offer everyone the right to <b>delete</b> their data, <b>access</b> a
        copy of their data, <b>withdraw consent</b> to data processing,{' '}
        <b>object to</b> data processing, and <b>rectify</b>
        {
          " their data (correct inaccuracies or supplement incomplete info). For your protection, we have to verify your identity before taking action. Also, we can't always fully comply with a request, such as when doing so would reveal someone else's info, or when we're legally required to retain info. Candidates can submit a deletion request through their account settings. Organizations can reach out to "
        }
        <a
          href={'mailto:privacy@tekalo.org'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          privacy@Tekalo.org
        </a>
        {'. Please contact us at '}
        <a
          href={'mailto:privacy@tekalo.org'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          privacy@Tekalo.org
        </a>
        {
          ' to submit other requests or if you have any other data privacy questions.'
        }
      </>
    ),
  },
  {
    questionText: 'Where Is My Data Stored?',
    answerText: (
      <>
        All of our Talent Connectors and Service Providers who store data are
        located in the United States.
      </>
    ),
  },
  {
    questionText: 'What are your legal bases for processing?',
    answerText: (
      <>
        Please see below. Note that “Legitimate Interests” refers to something
        that (i) we think is desirable to us or someone else (including you),
        (ii) reasonably expected given the nature of our services, and (iii)
        doesn’t create any undue risk to you.
      </>
    ),
    extras: <BasisTable tableData={BASIS_TABLE_TEXT} />,
  },
];
const CANDIDATE_FAQ_TEXT: Array<IFaqItem> = [
  {
    questionText:
      'What are Talent Connectors, Organizations, and Service Providers?',
    answerText: (
      <>
        <b>Talent Connectors</b> are entities who work with us to help review
        applications and connect individuals with Organizations that might be a
        good fit. <b>Organizations</b> are entities that are looking for
        talented individuals. <b>Service Providers</b> are vendors who provide
        services that support Tekalo such as web hosting, cloud services,
        analytics, and email marketing.
      </>
    ),
  },
  {
    questionText:
      'How do you decide which Organizations to share my info with?',
    answerText: (
      <>
        Talent Connectors from Schmidt Futures and our collaborating
        organizations, such as All Tech Is Human, US Digital Response, and Fast
        Forward, will review applications and identify potential candidates.
        They will then reach out to you to share those potential opportunities
        and seek your permission to make your info available to the relevant
        Organizations
      </>
    ),
  },
  {
    questionText: 'Do you show ads?',
    answerText: (
      <>
        We don’t show any ads on Tekalo! We only promote Tekalo itself via
        things like social media ads and email marketing, and we use tracking
        technologies such as cookies, pixels, and beacons to measure their
        performance.
      </>
    ),
  },
  {
    questionText: 'What rights do I have to respect to my data?',
    answerText: (
      <>
        We offer everyone the right to <b>delete</b> their data, <b>access</b> a
        copy of their data, <b>withdraw consent</b> to data processing,{' '}
        <b>object to</b> data processing, and <b>rectify</b>
        {
          " their data (correct inaccuracies or supplement incomplete info). For your protection, we have to verify your identity before taking action. Also, we can't always fully comply with a request, such as when doing so would reveal someone else's info, or when we're legally required to retain info. Candidates can submit a deletion request through their account settings. Organizations can reach out to "
        }
        <a
          href={'mailto:privacy@tekalo.org'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          privacy@Tekalo.org
        </a>
        {'. Please contact us at '}
        <a
          href={'mailto:privacy@tekalo.org'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          privacy@Tekalo.org
        </a>
        {
          ' to submit other requests or if you have any other data privacy questions.'
        }
      </>
    ),
  },
  {
    questionText: 'Where Is My Data Stored?',
    answerText: (
      <>
        All of our Talent Connectors and Service Providers who store data are
        located in the United States.
      </>
    ),
  },
  {
    questionText: 'What are your legal bases for processing?',
    answerText: (
      <>
        Please see below. Note that “Legitimate Interests” refers to something
        that (i) we think is desirable to us or someone else (including you),
        (ii) reasonably expected given the nature of our services, and (iii)
        doesn’t create any undue risk to you.
      </>
    ),
    extras: <BasisTable tableData={BASIS_TABLE_TEXT} />,
  },
];
const PRIVACY_TEXT = {
  toggleHeaders: ['For candidates', 'For organizations'],
  title: 'Tekalo Privacy Info',
  faq: 'Frequently Asked Questions ',
};

/** TERMS TEXT CONSTANTS */
const TERMS_TEXT = {
  title: 'Futures Engine Terms of Use',
  lastUpdate: 'Last Updated: May 12, 2023',
  aboutTitle: 'About This Document',
  aboutSummary:
    'Summary: This is a binding agreement, and it includes an arbitration clause.',
  aboutText: (
    <>
      <p>
        THESE TERMS SET FORTH A LEGALLY BINDING AGREEMENT BETWEEN YOU AND
        FUTURES ACTION NETWORK, LLC THAT GOVERNS YOUR ACCESS TO AND USE OF ALL
        INFORMATION, WEBSITES, SERVICES, EVENTS AND CONTENT (COLLECTIVELY,
        “SERVICES”) PROVIDED IN CONNECTION WITH FUTURES ENGINE. BY ACCEPTING
        THESE TERMS, ACCESSING AND USING SERVICES, OR OTHERWISE INTERACTING WITH
        US IN CONNECTION THEREWITH, YOU:
      </p>
      <p>
        (1) AGREE TO THESE TERMS PERSONALLY AND ON BEHALF OF ANY COMPANY OR
        OTHER LEGAL ENTITY YOU REPRESENT WHEN USING THE SERVICES, AND
      </p>
      <p>
        (2) YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND
        CAPACITY TO ENTER INTO THESE TERMS (AND TO BIND YOUR ENTITY, IF
        APPLICABLE, TO THESE TERMS).
      </p>
      <p>
        IF YOU DO NOT AGREE TO THESE TERMS, YOU ARE NOT PERMITTED TO ACCESS OR
        USE THE SERVICES.
      </p>
      <p>
        ARBITRATION NOTICE: THESE TERMS CONTAIN A BINDING ARBITRATION AGREEMENT
        INCLUDING A WAIVER OF ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT
        OR CLASS-WIDE ARBITRATION. PLEASE SEE THE{' '}
        <Link
          href={'#arbitration-agreement'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          ARBITRATION AGREEMENT AND CLASS ACTION WAIVER
        </Link>{' '}
        SECTION BELOW FOR ADDITIONAL DETAILS.
      </p>
    </>
  ),
  minAgeTitle: 'Minimum Age',
  minAgeSummary: 'Summary: You must be 18 or older to use Futures Engine.',
  minAgeText:
    'You represent that you are at least 18 years of age (or the age of majority in the jurisdiction in which you reside). The Services are not intended for anyone under 18, and you may not use the Services if you are under 18.',
  privacyInfoTitle: 'Privacy Notice',
  privacyInfoText: [
    'Please review our ',
    'Privacy Info',
    ', which applies to personal information processed about you in connection with the Services.',
  ],
  accountTitle: 'Your Account',
  accountSummary:
    'Summary: Do not share your login credentials. We may disable your account.',
  accountText: (
    <>
      <p>
        You may be required to create an account to access certain portions of
        the Services. You are not permitted to share, sell, distribute or
        otherwise transfer your account information or allow your login
        credentials to be used by any other person.
      </p>
      <p>
        We may terminate your account and/or suspend your use of the Services
        without notice if we suspect that your account is being used in an
        unauthorized manner or if you violate these Terms.
      </p>
    </>
  ),
  futuresEngineTitle: 'Futures Engine Content',
  futuresEngineSummary:
    "Summary: Futures Engine content belongs to others; don't steal it.",
  futuresEngineText:
    'All information, content, images, logos, trademarks, graphics, software, and other materials made available by us in connection with Futures Engine (collectively, the “Content”) are the sole property of the owners or licensors of such Content, and are protected by copyright, trademark, and other laws. You may not reproduce, modify, republish, distribute, resell, broadcast, reverse-engineer, create derivative works from or otherwise exploit in any manner, in whole or in part, the Content, except to the extent expressly permitted by us. We do not convey any interest in or to the Content. All rights not expressly granted herein are reserved by the owners or licensors of the Content. For the sake of clarity, the Services include the Content.',
  userMaterialTitle: 'User Material',
  userMaterialSummary: [
    'Summary: You own your User Material, but you permit us to use it in connection with providing the Services. Your information is not confidential; it will be seen by third parties who review applications or to whom you choose to share your info. ',
    'Read more',
    '. We may remove User Material from Futures Engine in our discretion. Submit your User Material at your own risk. If you give us any Feedback, we can use it for any purpose.',
  ],
  userMaterialText: (
    <>
      <p>
        We may allow you to submit content, including but not limited to your
        application responses, answers, comments, ideas, and other information
        and materials (collectively, “User Material”).
      </p>
      <p>
        As between you and us, you retain ownership of any and all intellectual
        property rights you may hold in your User Material. You grant us the
        following license to your User Material: the non-exclusive,
        royalty-free, worldwide, sublicensable, transferable, perpetual and
        irrevocable right to store, host, modify, translate, publish, transmit,
        copy, display, disseminate, and use your User Material, in all media and
        formats now known or hereafter invented, solely for the purposes of
        providing, supporting, and promoting the Services.
      </p>
      <p>
        You represent and warrant that you own or have the necessary rights and
        permissions to provide your User Material to us, and to authorize us to
        use such User Material in the manner contemplated by these Terms.
      </p>
      <p>
        Applying to Futures Engine requires you to submit your User Material for
        review by us and third-parties with whom we’ve contracted. Under no
        circumstances will we be required to treat your User Material as
        confidential. For the avoidance of doubt, we will not be liable to you
        or any other person as a result of any similarities to the User Material
        that may appear in any future products or services of us or our
        affiliates.
      </p>
      <p>
        Please note that the license you grant us to your User Material and the
        statement above regarding non-confidentiality apply to intellectual
        property only, and do not expand or alter our use or disclosure of your
        personal information as set forth in our Privacy Notice.
      </p>
      <p>
        While we may not review or monitor User Material, we reserve the right
        to block, refuse, delete, remove or edit, in whole or in part, any User
        Material that violates these Terms or is otherwise objectionable, as
        determined in our sole discretion. You are solely responsible and assume
        all risks associated with any User Material you submit or that is
        submitted through your account. We assume no liability in connection
        with any damage, loss, or harm you may suffer from submitting, viewing,
        or using any User Material.
      </p>
      <p>
        If you provide or disclose to us any suggestions, ideas, or feedback
        (collectively, “Feedback”) with respect to the Services or other
        potential products and services, you hereby grant us and our affiliates,
        a worldwide, perpetual, irrevocable, transferable, nonexclusive,
        royalty-free license, with the right to sublicense, to use and exploit
        the Feedback for any purpose.
      </p>
    </>
  ),
  submissionGuideTitle: 'Submission Guidelines',
  submissionGuideSummary:
    'Summary: Your Submission must comply with the guidelines below, and if it does not, we can reject or remove it.',
  submissionGuideText: (
    <>
      <p>
        All information and content submitted in support of your application
        (“Submission”) must adhere to the following guidelines (collectively the
        “Submission Guidelines”):
      </p>
      <ol className="list-decimal pl-4">
        <li>The Submission must be in the English language;</li>
        <li>
          The Submission and all components thereof, including all ideas,
          creative elements and any other materials and information contained in
          the Submission must be wholly original and created by you alone, and
          must not duplicate any previous Submission;
        </li>
        <li>
          The Submission must not contain material that is unlawful or that
          violates or infringes another’s rights, including but not limited to
          privacy, publicity, confidentiality, copyright, trademark, patent, or
          other proprietary intellectual property rights;
        </li>
        <li>
          The Submission must not contain material that is derogatory,
          disparaging, hateful, obscene, inappropriate, indecent, tortious,
          defamatory, slanderous or libelous, as determined in our sole
          discretion;
        </li>
        <li>
          The Submission must not contain material that promotes bigotry,
          racism, hatred or harm against any group or individual, or that
          promotes discrimination based on race, gender, religion, nationality,
          disability, sexual orientation or age; and
        </li>
        <li>
          The Submission must not contain personal information pertaining to any
          third party unless you have obtained their prior written permission.
        </li>
      </ol>
      <p>
        We reserve the right to make such changes to any Submission as are
        necessary to make it compliant, or to require you to do so.
      </p>
      <p>
        You should retain a copy of all portions of your Submission. We are not
        responsible for, and you specifically release us from, any claims or
        liability relating to, any loss or damage to your Submission.
      </p>
      <p>
        We may, in our sole and absolute discretion, reject Submissions or parts
        of Submissions that: (i) fail to meet any Submission Guideline, (ii) are
        not reasonably pertinent to the subject matter of Futures Engine, (iii)
        are illegible, incomplete, forged, altered or mechanically produced or
        reproduced, or (iv) are otherwise in violation of or non-compliance with
        these Terms of Use.
      </p>
    </>
  ),
  warrantyTitle: 'Representations and Warranties',
  warrantySummary:
    "Summary: You confirm that your Submission is your original work, accurate and truthful, and does not violate any law, these Terms, or any other person's rights.",
  warrantyText: (
    <>
      <p>By submitting an application, you represent and warrant that:</p>

      <ol className="list-decimal pl-4">
        <li>Your Submission complies with the Submission Guidelines;</li>
        <li>
          No other party has any actual or potential right, title, claim or
          interest in your Submission (including intellectual property rights),
          or if they do, you have secured all rights and permissions necessary
          to submit such materials to us;
        </li>
        <li>
          You have the unconditional right and authority to submit the
          Submission to us and to grant the rights set forth herein;
        </li>
        <li>
          Your Submission is accurate and truthful to the best of your
          knowledge;
        </li>
        <li>
          Your Submission does not violate any applicable law, rule or
          regulation, and your use of the Services is not prohibited by any
          applicable law, rule or regulation in the country in which you reside;
        </li>
        <li>
          Our use of your Submission will not infringe or involve the
          misappropriation of any third-party rights, and you agree to indemnify
          and hold harmless us and our affiliates from and against any breach of
          this representation and warranty;
        </li>
        <li>
          You have the right to make the Submission as contemplated hereunder
          without the need of any consent of any third party or if you do need
          such consent, you have obtained it;
        </li>
        <li>
          You and your Submission do and will comply with these Terms of Use and
          all applicable laws and regulations; and
        </li>
        <li>
          You are under no obligation or disability, created by law or
          otherwise, which would in any manner or to any extent prevent or
          restrict making a Submission.
        </li>
        <li>
          You are not on any sanctions or restricted party list maintained by
          any agency of the United States Government, including but not limited
          to the Departments of the Treasury, Commerce, and State (e.g., the
          Specially Designated Nationals and Blocked Persons List maintained by
          the U.S. Office of Foreign Asset Control (OFAC)), whether currently
          listed, or subsequently listed at any time during your use of the
          Services.
        </li>
      </ol>
    </>
  ),
  disclaimerTitle: 'Termination of Services; Disclaimers',
  disclaimerSummary:
    'Summary: We may terminate or modify the Services for any reason, including if you violate these Terms. We are not responsible for errors that may affect the Services or the processing and review of your application.',
  disclaimerText: (
    <>
      <p>
        We reserve the right at our sole discretion and at any time to terminate
        these Terms and your right to use the Services if you violate or fail to
        comply with the Terms, tamper with the application process, and/or act
        in any way that would, in any way, discredit or harm the reputation of
        us or our affiliates or partners, and/or to cancel, modify or suspend
        the Services should fraud or misconduct or other causes beyond our
        control corrupt the administration, integrity, security or proper
        operation of the Services.
      </p>
      <p>
        Notwithstanding anything contained herein to the contrary, we reserve
        the right, in our sole discretion, at any future time to terminate,
        modify or suspend the Services for any reason, including any of the
        following: act of God; unavoidable accident; epidemic; fire; blackout;
        act of public enemy; war, riot or civil commotion; enactment, rule,
        order or act of government or governmental instrumentality or tribunal;
        strike, lockout or other labor dispute; inclement weather; failure,
        malfunction, or other issues with technology, software, networks,
        connectivity or technical facilities; failure of essential production or
        technical personnel to appear or be available; or other cause beyond our
        control.
      </p>
      <p>
        We are not responsible for lost, late, illegible, incomplete, damaged,
        mutilated, misdirected, misdelivered, or delayed Submissions, or for
        technical or human errors or failures of any kind in connection with
        Submissions, transmission, processing or review of Submissions,
        including without limitation any malfunctions or failures of computer
        hardware, computer software, networks or telephone equipment or any
        technical problems or traffic congestion on the Internet or at any
        website or any combination thereof.
      </p>
      <p>
        We are not responsible for any typographical or other error in the
        Services.
      </p>
    </>
  ),
  otherTitle: 'Other Services and Features',
  otherSummary:
    'Summary: We are not responsible for third-party services that we may invite you to use in connection with Futures Engine.',
  otherText:
    'For your convenience and information, the Services may provide links to other services and features, including apps, tools, widgets, activities and plugins, which may be operated by entities not affiliated with us. We make no representations or warranties regarding any such service or feature. If you choose to access any link to other services or features, you understand that you are connecting directly to that service or feature and will be subject to any terms of use, policies and privacy practices of the party that operates the service or feature.',
  copyrightTitle: 'Digital Millennium Copyright Act',
  copyrightSummary:
    'Summary: If you have a copyright infringement complaint, please follow the procedures below.',
  copyrightText: (
    <>
      <p>
        We endeavor to observe the requirements of the Digital Millennium
        Copyright Act. In the event you believe that any Content or User
        Material (defined below) infringes your copyright or other intellectual
        property right, you may notify our designated agent by email at
        dmca@schmidtfutures.com or by mail to 155 W. 23rd St., 5th Floor, New
        York, NY 10011, Attn: Futures Engine.
      </p>
      <p>You must include the following information in your complaint:</p>
      <ul className="list-disc pl-4">
        <li>
          a description of the copyrighted work or other intellectual property
          that you claim has been infringed;
        </li>
        <li>
          a description of the material that you claim is infringing with
          respect to the Services;
        </li>
        <li>your email address, mailing address and telephone number;</li>
        <li>
          a statement by you that you have a good faith belief that the use of
          the material on the Services is not authorized by the copyright owner,
          the copyright owner’s agent or law;
        </li>
        <li>
          a statement by you that the above information in your notice is
          accurate and, under penalty of perjury, that you are the copyright
          owner or authorized to act on the copyright owner’s behalf; and
        </li>
        <li>
          an electronic or physical signature of the copyright owner or person
          authorized to act on behalf of the copyright owner.
        </li>
      </ul>
    </>
  ),
  warrantyDisclaimerTitle: 'Warranty Disclaimer',
  warrantyDisclaimerSumary:
    "Summary: We don't make any promises that the Services are perfect or will help you achieve any particular result.",
  warrantyDisclaimerText: (
    <>
      <p>
        THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. WE
        MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND THAT THE SERVICES
        WILL: MEET YOUR REQUIREMENTS, BE TIMELY, SECURE, ERROR FREE OR
        UNINTERRUPTED, BE FREE OF MALWARE OR OTHER HARMFUL CODE, OR BE ACCURATE,
        COMPLETE, OR RELIABLE.
      </p>
      <p>
        WE AND OUR AFFILIATES AND LICENSORS DISCLAIM ALL WARRANTIES, EXPRESS OR
        IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE
        IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS FOR
        A PARTICULAR PURPOSE.
      </p>
      <p>
        CERTAIN JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES
        AND, ACCORDINGLY, THE LIMITATIONS IN THIS SECTION MAY NOT APPLY TO YOU.
        IF YOU ARE A CONSUMER, ANY STATUTORY RIGHTS THAT CANNOT BE WAIVED BY YOU
        ARE UNAFFECTED BY THIS SECTION.
      </p>
    </>
  ),
  liabilityTitle: 'Limitation of Liability',
  liabilitySummary:
    ' Summary: We will not be responsible for certain extra damages that are typically excluded from consumer agreements.',
  liabilityText: (
    <>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL WE
        OR OUR AFFILIATES OR LICENSORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR
        ANY DIRECT, INCIDENTAL, INDIRECT, EXEMPLARY, PUNITIVE, SPECIAL, OR
        CONSEQUENTIAL DAMAGES, OR LOST REVENUES, PROFITS CAPITAL OR OVERHEAD,
        ARISING OUT OF OR RELATED TO YOUR ACCESS TO OR USE OF THE SERVICES,
        WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), DELICT
        OR ANY OTHER LEGAL THEORY AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        BECAUSE SOME JURISDICTIONS DO NOT ALLOW FOR THE EXCLUSION OF DAMAGES,
        OUR LIABILITY IN SUCH JURISDICTIONS SHALL BE LIMITED TO THE MAXIMUM
        EXTENT PERMITTED BY THE LAWS OF SUCH JURISDICTION.
      </p>
    </>
  ),
  indemnityTitle: 'Indemnity',
  indemnitySummary:
    'Summary: If we face claims or liabilities based on actions or omissions within your control, you will defend us and cover any resulting damages.',
  indemnityText: (
    <>
      <p>
        You agree to indemnify, defend and hold harmless us and our affiliates,
        successors and assigns, and each of their respective trustees, officers,
        directors, employees, agents, suppliers and representatives, from and
        against all claims, liabilities, actions, suits, proceedings,
        assessments, judgments, decrees, losses, expenses, damages, settlement
        funds, fines, penalties and associated costs and expenses, including
        reasonable attorneys’ fees, arising out of or related to (1) your use or
        misuse of the Services; (2) your breach of these Terms; (3) any User
        Materials submitted or provided to us; or (4) our use of your User
        Materials and/or the exercise of any rights granted to us, including
        without limitation claims based on rights of privacy, rights of
        publicity, false light, defamation, copyright, patent and/or trademark
        infringement relating to your User Material. We reserve the right to
        assume the exclusive defense and control of any matter that is subject
        to indemnification under this section, in which event you agree to
        cooperate with any reasonable requests assisting our defense of such
        matter.
      </p>
    </>
  ),
  releaseTitle: 'Release of Claims',
  releaseSummary:
    "Summary: You will not bring claims against us if we exercise the rights you've granted us under these Terms.",
  releaseText: (
    <>
      <p>
        You hereby release us and our affiliates, successors and assigns, and
        each of their respective trustees, officers, directors, employees,
        agents, suppliers and representatives from and against the full amount
        of all claims, liabilities, actions, suits, proceedings, assessments,
        judgments, decrees, losses, fees, damages, settlement funds, and
        associated costs and expenses including attorney’s fees arising from or
        in connection with your use of the Services, any use of User Material,
        and/or the exercise of any rights granted to us, including without
        limitation claims based on rights of privacy, rights of publicity, false
        light, defamation, copyright, patent and/or trademark infringement
        relating to your User Material.
      </p>
    </>
  ),
  governingTitle: 'Governing Law',
  governingSummary: 'Summary: New York law applies to these Terms.',
  governingText: (
    <>
      <p>
        All questions concerning the construction, validity, enforcement and
        interpretation of these Terms shall be governed by and construed in
        accordance with the domestic laws of the State of New York, without
        giving effect to any choice of law or conflict of law.
      </p>
    </>
  ),
  arbitrationTitle: 'Binding Arbitration and Class Action Waiver',
  arbitrationSummary:
    'Summary: We are agreeing to use arbitration, instead of litigation in court, to resolve any legal disputes that may arise.',
  arbitrationTextCaps: (
    <>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND WE AGREE TO ARBITRATE
        ANY CONTROVERSY, CLAIM OR DISPUTE ARISING OUT OF OR IN ANY WAY RELATED
        TO YOUR USE OF THE SERVICES, INCLUDING BUT NOT LIMITED TO CLAIMS BASED
        ON CONTRACT, TORT, NEGLIGENCE, STATUTORY OR REGULATORY PROVISIONS. EACH
        PARTY IS GIVING UP ITS RIGHT TO SUE IN COURT AND TO HAVE ANY
        CONTROVERSY, CLAIM OR DISPUTE HEARD BY A JUDGE OR JURY.
      </p>
      <p>
        THIS AGREEMENT TO ARBITRATE ALSO APPLIES TO THRESHOLD ARBITRABILITY
        ISSUES, INCLUDING ISSUES RELATED TO WHETHER THIS AGREEMENT TO ARBITRATE
        IS UNCONSCIONABLE OR ILLUSORY AND ANY DEFENSE TO ARBITRATION. YOU ALSO
        AGREE THAT ANY ARBITRATION MAY ONLY BE BROUGHT IN YOUR AND OUR
        INDIVIDUAL CAPACITIES, NOT AS A CLASS, PURPORTED CLASS OR REPRESENTATIVE
        ACTION. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE INDIVIDUAL OR
        ENTITY’S CLAIMS, AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A
        REPRESENTATIVE OR CLASS PROCEEDING.
      </p>
    </>
  ),
  arbitrationTextRegular: (
    <>
      <p>
        The mutual promise by you and us to arbitrate any and all disputes, and
        to do so on an individual basis, rather than to litigate before the
        courts or other bodies, provides the mutual consideration for this
        agreement to arbitrate.
      </p>
      <p>
        Either party may exercise the right to arbitrate by providing the other
        party with written notice of any and all claims forming the basis of
        such right in sufficient detail to inform the other party of the
        substance of such claims. In no event shall the request for arbitration
        be made after the date when institution of legal or equitable
        proceedings based on such claims would be barred by the applicable
        statute of limitations.
      </p>
      <p>
        Unless you and we otherwise agree, the arbitration will be conducted in
        the county where you reside by a single neutral arbitrator and in
        accordance with the then-current rules for resolution of disputes of the
        American Arbitration Association (AAA) (available online at{' '}
        <a
          rel="noreferrer"
          target="_blank"
          className="text-blue-1 underline underline-offset-4"
          href="http://www.adr.org"
        >
          www.adr.org
        </a>{' '}
        or by calling 1-800-778-7879). The parties are entitled to
        representation by an attorney or other representative of their choosing.
        The parties agree to abide by and perform any award rendered by the
        arbitrator. The arbitrator shall issue the award in writing and therein
        state the essential findings and conclusions on which the award is
        based. Judgment on the award may be entered in any court having
        jurisdiction thereof. Payment of all filing, administration and
        arbitrator fees will be governed by the AAA’s rules.
      </p>
      <p>
        If this arbitration clause is held unenforceable or arbitration is for
        any other reason not available, any disputes under these Terms shall be
        heard in a court of competent jurisdiction in New York, New York.
      </p>
    </>
  ),
  generalTitle: 'General',
  generalSummary:
    'Summary: This clause contains common general provisions, such as how the contract will be interpreted and enforced, and whether it can be assigned.',
  generalText: (
    <>
      <p>
        You shall be deemed an independent contractor and nothing contained
        herein shall constitute this arrangement to be employment, a joint
        venture, or a partnership. You will not represent yourself to be or hold
        yourself out as our employee. You further acknowledge that, other than
        the Services, no goods or services are, have been, or will be exchanged
        under these Terms and therefore no consideration other than your ability
        to access and use the Services is due to you. No failure to enforce
        these Terms shall constitute a waiver of any provision contained herein.
        To the extent any portion of these Terms is determined to be
        unenforceable by a court of competent jurisdiction, such portion will be
        modified solely to the extent necessary to cause such portion to be
        enforceable, and these Terms, as modified, will remain in full force and
        effect. This is the entire agreement between you and us relating to the
        subject matter herein and shall supersede all prior discussions,
        agreements and understandings of any kind between us. We may assign our
        rights and obligations under these Terms without your consent in the
        event of a reorganization, consolidation, or merger, or a transfer of
        all or substantially all of our assets or business operations to a
        successor entity. These Terms shall inure to the benefit of and be
        binding upon you, us, and our successors and assigns. The word
        “including” as used in these Terms shall be read to mean “including but
        not limited to.”
      </p>
    </>
  ),
  modificationsTitle: 'Modifications',
  modificationsSummary:
    'Summary: We may make changes to the Services and to these Terms.',
  modificationsText: (
    <>
      <p>
        We reserve the right to modify and update any aspect of the Services, at
        any time in our sole discretion. These Terms may be updated periodically
        for clarity or to reflect changes in the Services. We indicate at the
        top of this document when it was most recently updated. We encourage you
        to check this page frequently to review any changes. If we make changes,
        we will notify you via the change log below. In some cases, we may
        provide additional notice such as a statement on our homepage or an
        email. Your continued access to or use of the Services will constitute
        your acceptance of any modifications or updates.
      </p>
      <p>Change log</p>
    </>
  ),
  modificationsChangelog: ['May 12, 2023 - Terms of Use first published.'],
  electronicTitle: 'Electronic Communications',
  electronicSummary:
    'Summary: We are agreeing to communicate and enter into this contract via electronic means (i.e. there will be no signed paper copy).',
  electronicText: (
    <>
      <p>
        These Terms and any other documentation, agreements, notices, or
        communications between you and us may be provided to you electronically
        to the extent permissible by law. Please print or otherwise save a copy
        of all documentation, agreements, notices, and other communications for
        your reference.
      </p>
    </>
  ),
  contactTitle: 'How To Contact Us',
  contactSummary: '',
  contactText: (
    <>
      <p>
        If you have any questions about these Terms, please email us at
        support@tekalo.org. You also may write to: 155 W. 23rd St., 5th Floor,
        New York, NY 10011, Attn: Futures Engine.
      </p>
    </>
  ),
};

export { COOKIE_CONSENT };
// META
export { META, TRACKING };
// PRIVACY & TERMS EXPORTS
export {
  APPLICANT_CONTENT_TABLE_TEXT,
  BASIS_TABLE_TEXT,
  CANDIDATE_FAQ_TEXT,
  ORG_CONTENT_TABLE_TEXT,
  ORG_FAQ_TEXT,
  PRIVACY_TEXT,
  TERMS_TEXT,
};
// ENUM EXPORTS
export {
  BOOL_ENUM_OPTIONS,
  CAUSE_ENUM_OPTIONS,
  COMMITMENT_ENUM_OPTIONS,
  COMMITMENT_ENUM_TEXT,
  CONTACT_ENUM_OPTIONS,
  EMPLOYMENT_TYPE_ENUM_OPTIONS,
  EMPLOYMENT_TYPE_TEXT,
  ORG_SIZE_ENUM_OPTIONS,
  ORG_TYPE_ENUM_OPTIONS,
  PAID_ENUM_OPTIONS,
  REF_ENUM_OPTIONS,
  RELOCATION_ENUM_OPTIONS,
  REMOTE_ENUM_OPTIONS,
  ROLE_ENUM_OPTIONS,
  ROLE_ENUM_TEXT,
  SEARCH_STATUS_ENUM_OPTIONS,
  SKILL_ENUM_OPTIONS,
  TURNSTILE_ENUM_OPTIONS,
  VISA_ENUM_OPTIONS,
  WORKAUTH_ENUM_OPTIONS,
  YOE_ENUM_OPTIONS,
  YOE_RANGE_ENUM_OPTIONS,
};
// APP EXPORTS
export { ERROR_TEXT, HEAD_TEXT };
// SELECT EXPORTS
export {
  COMMITMENT_TEXT,
  CONTACT_OPTION_TEXT,
  ORG_SIZE_LABEL_TEXT,
  PAID_TEXT,
  REMOTE_OPTION_TEXT,
  ROLE_TEXT,
  SEARCH_STATUS_TEXT,
  USDR_TEXT,
  VISA_SPONSOR_TEXT,
  WORK_AUTHORIZATION_TEXT,
  YES_NO_TEXT,
  YOE_OPTION_TEXT,
};
// INTERNAL LINK EXPORTS
export {
  ACCOUNT_LINK,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  APPLICANT_SUCCESS_LINK,
  BASE_LINK,
  CONTACT_US_MAILTO_LINK,
  ORG_SIGNUP_LINK,
  ORG_SUCCESS_LINK,
  PRIVACY_LINK,
  SIGN_IN_LINK,
  SIGN_IN_REDIRECT,
  TERMS_LINK,
};
// EXTERNAL LINK EXPORTS
export {
  ALL_TECH_IS_HUMAN_URL,
  EEOC_URL,
  FAST_FORWARD_URL,
  SCHMIDT_FUTURES_URL,
  US_DIGITAL_RESPONSE_URL,
};
// NAV EXPORTS
export {
  NAV_BAR_TEXT,
  NAV_FOOTER_TEXT,
  NAV_LITE_FOOTER_TEXT,
  NAV_LITE_HEADER_TEXT,
};
// HOME PAGE EXPORTS
export {
  HOME_ABOUT_TEXT,
  HOME_CONTACT_TEXT,
  HOME_FAQ_TEXT,
  HOME_HERO_TEXT,
  HOME_HOW_TEXT,
  HOME_ORG_TEXT,
};
// ACCOUNT PAGE EXPORTS
export { ACCOUNT_PAGE_TEXT };
// FORM EXPORTS
export {
  APPLICANT_EXPERIENCE_FORM_TEXT,
  APPLICANT_FORM_TEXT,
  INTEREST_FORM_TEXT,
  ORG_FORM_TEXT,
  ORG_ROLE_FORM_TEXT,
  ORG_SIGNUP_FORM_TEXT,
  REVIEW_FORM_TEXT,
};
// MODAL EXPORTS
export {
  CONFIRM_MODAL,
  DELETE_MODAL,
  ERROR_MODAL_TEXT,
  PAUSE_MODAL,
  PRIVACY_MODAL_TEXT,
  RESUME_MODAL,
  SAVE_MODAL,
};
