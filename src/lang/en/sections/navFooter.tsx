import {
  APPLICANT_SIGNUP_LINK,
  CONTACT_US_MAILTO_LINK,
  ORG_SIGNUP_LINK,
  PRIVACY_LINK,
  SIGN_IN_LINK,
  TERMS_LINK,
} from './navLinks';

export const NAV_FOOTER_TEXT = {
  COPYRIGHT: '© Futures Action Network, LLC',
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

export const NAV_LITE_FOOTER_TEXT = {
  RESERVED_RIGHTS: '2023. All Rights Reserved',
  LINK_BLOCKS: [
    { text: 'Privacy Info', href: PRIVACY_LINK },
    { text: 'Terms of Use', href: TERMS_LINK },
  ],
};
