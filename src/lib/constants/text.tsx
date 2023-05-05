import Link from 'next/link';

export const USDR_DISCLAIMER = (
  <div className="space-y-2">
    <div className="w-[103%] text-left text-p3-mobile text-black-text">
      {'By choosing “yes,” you consent to '}
      <a
        href="https://www.usdigitalresponse.org/about"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4"
      >
        {'U.S. Digital Response'}
      </a>
      {
        ' saving a copy of your CommonApp profile in its own database and sending you electronic communications. USDR may contact you about opportunities in state and local governments, and add you to their newsletter which contains government job opportunities.'
      }
    </div>
  </div>
);

export const ACCOUNT_LINK = '/account';
export const APPLICANT_EXPERIENCE_LINK =
  '/sign-up/applicants/experience-and-interests';
export const APPLICANT_SIGNUP_LINK = '/sign-up/applicants';
export const APPLICANT_SUCCESS_LINK = '/sign-up/applicants/success';
export const CONTACT_US_EMAIL_LINK = 'mailto:support@tekalo.org';
export const ORG_SIGNUP_LINK = '/sign-up/organizations';
export const PRIVACY_LINK = '/privacy-info';
export const SIGN_IN_LINK = '/sign-in';
export const TERMS_LINK = '/terms';

export const applicantFormHeader =
  'Join a network of impact-driven organizations to find your match.';

export const PRIVACY_DISCLAIMER = (
  setShowPrivacyModal: (_arg: boolean) => void
) => {
  return (
    <>
      By signing up, you acknowledge the{' '}
      <span
        className="cursor-pointer whitespace-nowrap text-blue-1 underline underline-offset-4"
        onClick={(e) => {
          e.preventDefault();
          setShowPrivacyModal(true);
        }}
      >
        Privacy info
      </span>
    </>
  );
};

export const TERMS_DISCLAIMER = (
  <>
    {'By signing up, you agree to the '}
    <span className="text-blue-1 underline underline-offset-4">
      <Link target="_blank" href={TERMS_LINK}>
        Terms of Service
      </Link>
    </span>
  </>
);

export const EEOC_LABEL = (
  <div className="space-y-2">
    <div className="w-[103%] text-left text-p3-mobile text-black-text">
      {
        'Please confirm that you are an Equal Opportunity Employer as defined by the '
      }
      <a
        href="https://www.eeoc.gov/employers"
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-4"
      >
        {'EEOC'}
      </a>
    </div>
  </div>
);

export const PRIVACY_MODAL_HEADER_TEXT = 'Privacy Info';
export const PRIVACY_MODAL_BODY_TEXT =
  'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.';
export const PRIVACY_MODAL_EXTRAS = (
  <div className="text-p3-desktop">
    See our&nbsp;
    <span className="text-blue-1 underline underline-offset-4">
      <Link target="_blank" href={PRIVACY_LINK}>
        Privacy FAQ
      </Link>
    </span>
    &nbsp;for more information
  </div>
);
