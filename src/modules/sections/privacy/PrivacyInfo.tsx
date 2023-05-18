import Faq from '@/components/faq/Faq';
import BasisTable from '@/components/tables/BasisTable/BasisTable';
import ContentTable from '@/components/tables/ContentTable/ContentTable';
import { BasisTableData, ContentTableData, IFaqItem } from '@/lib/types';
import { useState } from 'react';

export interface IPrivacyInfo {}

export const applicantContentTableData: ContentTableData = {
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

export const orgContentTableData: ContentTableData = {
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

const PrivacyInfo: React.FC<IPrivacyInfo> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  const basisTableData: BasisTableData = {
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
            (We collect feedback and perform analytics so that we can measure
            our impact and improve Tekalo.)
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
        activity:
          'Share Your Info with Talent Connectors and Service Providers',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We share your info with vetted non-profit entities and vendors,
            with whom we have appropriate contracts, to help us operate Tekalo.)
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

  const orgFAQS: Array<IFaqItem> = [
    {
      questionText:
        'What are Talent Connectors, Organizations, and Service Providers?',
      answerText: (
        <>
          <b>Talent Connectors</b> are entities who work with us to help review
          applications and connect individuals with Organizations that might be
          a good fit. <b>Organizations</b> are entities that are looking for
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
          organizations, such as All Tech Is Human, US Digital Response, and
          Fast Forward, will review applications and identify potential
          candidates. They will then reach out to you to share those potential
          opportunities and seek your permission to make your info available to
          the relevant Organizations
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
          We offer everyone the right to <b>delete</b> their data, <b>access</b>{' '}
          a copy of their data, <b>withdraw consent</b> to data processing,{' '}
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
      extras: <BasisTable tableData={basisTableData} />,
    },
  ];

  const candidateFAQS: Array<IFaqItem> = [
    {
      questionText:
        'What are Talent Connectors, Organizations, and Service Providers?',
      answerText: (
        <>
          <b>Talent Connectors</b> are entities who work with us to help review
          applications and connect individuals with Organizations that might be
          a good fit. <b>Organizations</b> are entities that are looking for
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
          organizations, such as All Tech Is Human, US Digital Response, and
          Fast Forward, will review applications and identify potential
          candidates. They will then reach out to you to share those potential
          opportunities and seek your permission to make your info available to
          the relevant Organizations
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
          We offer everyone the right to <b>delete</b> their data, <b>access</b>{' '}
          a copy of their data, <b>withdraw consent</b> to data processing,{' '}
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
      extras: <BasisTable tableData={basisTableData} />,
    },
  ];

  const toggleHeaders = ['For candidates', 'For organizations'];

  return (
    <div className="px-6 pb-28 md:pb-32">
      <div className="text-center">
        <div className="mt-10 font-display text-h2-mobile text-black-text lg:text-h2-desktop">
          Tekalo Privacy Info
        </div>
      </div>

      <div className="-ml-6 mt-10 w-[calc(100%+48px)] overflow-hidden bg-light-blue pb-4 pl-6 md:pb-6 md:pl-0">
        <div className="mb-10 mt-2-mobile flex flex-row justify-center space-x-8 sm:space-x-10 md:mt-20 lg:mt-2-desktop">
          {toggleHeaders.map((header, i) => {
            return (
              <div
                key={i}
                className={`cursor-pointer text-component-small transition-all sm:text-component-large md:text-h4-mobile lg:text-h4-desktop ${
                  (isForOrgsSelected && !i) || (!isForOrgsSelected && i)
                    ? 'text-gray-2 hover:text-blue-1'
                    : 'text-blue-1 underline underline-offset-8'
                }`}
                onClick={() => setForOrgs(header.includes('organizations'))}
              >
                {header}
              </div>
            );
          })}
        </div>
        <ContentTable
          className={'w-full'}
          tableData={
            isForOrgsSelected ? orgContentTableData : applicantContentTableData
          }
        />
      </div>
      <div className="mt-16 text-center font-display text-h3-mobile lg:text-h3-desktop">
        Frequently Asked Questions{' '}
      </div>
      <div className="m-auto mt-2-mobile max-w-content-area md:mt-2-tablet lg:mt-2-desktop">
        <Faq
          key={isForOrgsSelected ? 'orgFAQS' : 'candidateFAQS'}
          faqItems={isForOrgsSelected ? orgFAQS : candidateFAQS}
        />
      </div>
    </div>
  );
};

export default PrivacyInfo;
