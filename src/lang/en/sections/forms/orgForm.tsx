export const ORG_FORM_TEXT = {
  SUCCESS: {
    title: 'Your intake form was submitted!',
    body: 'You will receive a confirmation email shortly. Your assigned Tekalo Talent Connector will review your application and contact you once they have updates available. Thank you for applying to Tekalo.',
    cta: 'Done',
  },
  NAV: {
    title: 'Recruit qualified candidates from the Tekalo network',
    subtitle:
      'A free, philanthropically-funded service that bridges the gap between tech talent and social impact',
    navawayText: "If you're a candidate looking for opportunities, ",
    navText: 'sign up here',
  },
  CONTACT: 'Contact',
  BREADCRUMB: 'Role',
  DELETE_ROLE: 'Delete this role',
  INFO: {
    chat: (
      <>
        Not ready to submit an opportunity yet?{' '}
        <a
          className="whitespace-nowrap text-blue-1 underline"
          target="_blank"
          href="https://calendly.com/aisling-hoey/30min"
          rel="noreferrer"
        >
          Schedule a chat
        </a>{' '}
        with a Tekalo Talent Connector who can answer your questions.
      </>
    ),
    non_commit: (
      <>
        By filling out this application you&apos;re not committing to using
        Tekalo and can opt out at any time. A Talent Connector will review your
        application and be in touch with next steps!
      </>
    ),
  },
};
