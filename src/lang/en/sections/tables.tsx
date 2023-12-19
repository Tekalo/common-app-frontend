import { BasisTableData, ContentTableData } from '@/lib/types';

export const APPLICANT_CONTENT_TABLE_TEXT: ContentTableData = {
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

export const ORG_CONTENT_TABLE_TEXT: ContentTableData = {
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

export const BASIS_TABLE_TEXT: BasisTableData = {
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
