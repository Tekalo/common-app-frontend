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

export const PRIVACY_DISCLAIMER = (
  setShowPrivacyModal: (_arg: boolean) => void
) => {
  return (
    <>
      By signing up, you acknowledge the{' '}
      <span
        className="cursor-pointer text-blue-1 underline underline-offset-4"
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
      <Link target="_blank" href="/terms">
        Terms of Service
      </Link>
    </span>
  </>
);

export const PRIVACY_MODAL_HEADER_TEXT = 'Privacy Info';
export const PRIVACY_MODAL_BODY_TEXT =
  'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.';
export const PRIVACY_MODAL_EXTRAS = (
  <div className="text-p3-desktop">
    See our&nbsp;
    <span className="text-blue-1 underline underline-offset-4">
      <Link target="_blank" href="/privacy-info">
        Privacy FAQ
      </Link>
    </span>
    &nbsp;for more information
  </div>
);
