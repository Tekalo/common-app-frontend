import Faq from '@/components/faq/Faq';
import BasisTable from '@/components/tables/BasisTable/BasisTable';
import ContentTable from '@/components/tables/ContentTable/ContentTable';
import { BasisTableData, ContentTableData, IFaqItem } from '@/lib/types';
import { useState } from 'react';

export interface IPrivacyInfo {}

const PrivacyInfo: React.FC<IPrivacyInfo> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  const basisTableData: BasisTableData = {
    headers: ['Data processing activity', 'Lawful Basis'],
    content: [
      {
        activity: 'Identify you and operate [Name]',
        basis: (
          <>
            Contractual necessity
            <br />
            (You agree to our Terms of Service, whereby we collect your info,
            review it, and connect you with the opportunities you&apos;ve
            requested.)
          </>
        ),
      },
      {
        activity: 'Conduct Research and Improve [Name]',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We collect feedback and analyze metrics and outcomes so that we can
            show our impact and improve Name.),
          </>
        ),
      },
      {
        activity: 'Maintain Quality of Service and Security',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We use data to help provide a secure and well-running service.),
          </>
        ),
      },
      {
        activity: 'Target and Measure Ads Promoting [Name]',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We may use data to help target ads promoting Name and to measure
            the effectiveness of those ads.),
          </>
        ),
      },
      {
        activity: 'Send Marketing Emails',
        basis: (
          <>
            Consent
            <br />
            (We&apos;ll only send you emails about other stuff if you opt in.),
          </>
        ),
      },
      {
        activity: 'Share Your Info with Matchmakers and Service Providers',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We share your info with vetted matchmaking organizations and
            vendors, with whom we have appropriate written agreements, to help
            us operate Name.),
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
            that you&apos;re only contacted by ones you&apos;re actually
            interested in.),
          </>
        ),
      },
      {
        activity: 'Others',
        basis: (
          <>
            We can&apos;t imagine every possible scenario, so if we need to use
            your data for another purpose, we&apos;ll let you know!
          </>
        ),
      },
    ],
  };

  const contentTableData: ContentTableData = {
    headers: [
      {
        heading: '',
        subheading: '',
      },
      {
        heading: 'Data Type',
        subheading: 'What info we collect',
      },
      {
        heading: 'Uses',
        subheading: 'How we use the info',
      },
      {
        heading: 'Third Parties',
        subheading: 'Who can see the info',
      },
    ],
    content: [
      {
        heading: 'Info You provide',
        bullets: [
          ['Personal Info', 'Professional Info', 'Communications', 'Surveys'],
          [
            'Identify you and Operate [Name]',
            'Conduct Research and improve [Name]',
          ],
          ['Users', 'Other Matchmakers and Organziations', 'Service Providers'],
        ],
      },
      {
        heading: 'Info we observe',
        bullets: [
          [
            'Technical info (eg; browser device, IP, trackers, server logs)',
            'Usage and outcomes',
          ],
          [
            'Quality of Service',
            'Security',
            'Conduct Research and improve [Name]',
          ],
          ['Service Providers'],
        ],
      },
      {
        heading: 'Other sources',
        bullets: [
          [
            'Programs from Third-Party organizations',
            'Other Schmidt Futures Programs',
          ],
          ['Enable applicants to other programs to utilize [Name]'],
          ['Users', 'Matchmakers', 'Organizations', 'Service Providers'],
        ],
      },
    ],
  };

  const orgFAQS: Array<IFaqItem> = [
    {
      questionText: 'OrgHello',
      answerText: <>OrgWorld</>,
    },
    {
      questionText: 'OrgZar',
      answerText: <>OrgDoz</>,
    },
  ];

  const candidateFAQS: Array<IFaqItem> = [
    {
      questionText:
        'What are Matchmakers, Organizations, and Service Providers?',
      answerText: (
        <>
          Matchmakers are entities who have partnered with us to help review
          applications and match individuals with Organizations that might be a
          good fit. Organizations are entities that are looking for talented
          individuals. Service Providers are vendors who provide services that
          support CommonApp such as web hosting, cloud services, analytics, and
          email marketing.
        </>
      ),
    },
    {
      questionText: 'How will my info be shared?',
      answerText: (
        <>
          Matchmakers from Schmidt Futures and our collaborating organizations,
          such as All Tech Is Human and Fast Forward, will review applications
          and identify potential matches. They will then reach out to you to
          share those potential matches and seek your permission to make your
          info available to the matched Organizations
        </>
      ),
    },
    {
      questionText: 'Do you show ads?',
      answerText: (
        <>
          We don&apos;t show any ads on CommonApp! We only promote CommonApp
          itself via things like social media ads and email marketing, and we
          use tracking technologies such as cookies, pixels, and beacons to
          measure their performance.
        </>
      ),
    },
    {
      questionText: 'What rights do I have to respect to my data?',
      answerText: (
        <>
          We offer everyone the right to delete their data, access a copy of
          their data, withdraw consent to data processing, object to or restrict
          data processing, and rectify (correct inaccuracies or supplement
          incomplete info). For your protection, we have to verify your identity
          before taking action. Also, we can&apos;t always fully comply with a
          request, such as when doing so would reveal someone else&apos;s info,
          or when we&apos;re legally required to retain info. Please contact us
          at privacy@commonapp.com to submit a request or if you have any other
          data privacy questions.
        </>
      ),
    },
    {
      questionText: 'Where Is My Data Stored?',
      answerText: (
        <>
          All of our Matchmakers and Service Providers who store data are
          located in the United States.
        </>
      ),
    },
    {
      questionText: 'What are your lawful bases for processing?',
      answerText: (
        <>
          Bravo if you care enough about your privacy to read this information!
          Please see below. Note that “Legitimate Interests” refers to something
          that (i) we think is desirable to us or someone else (including you),
          (ii) reasonably expected given the nature of our services, and (iii)
          doesn&apos;t create any undue risk to you.
        </>
      ),
      extras: <BasisTable tableData={basisTableData} />,
    },
  ];

  const toggleHeaders = ['For candidates', 'For organizations'];

  return (
    <div className="px-6 pb-28 md:pb-32">
      <div className="text-center">
        <div className="mt-10 text-h2-mobile text-black-text lg:text-h2-desktop">
          Privacy Info
        </div>
        <div className="m-auto mt-6 max-w-[464px] text-p1-mobile lg:max-w-[928px] lg:text-p1-desktop">
          This Privacy Info is meant to help you understand what information we
          collect, why we collect it, and how you can manage and delete your
          information lorem.
        </div>
      </div>

      <div className="mb-11 mt-2-mobile flex flex-row justify-center space-x-8 sm:space-x-10 md:mt-20 lg:mt-2-desktop">
        {toggleHeaders.map((header, i) => {
          return (
            <div
              key={i}
              className={`cursor-pointer text-component-small transition-all sm:text-component-large md:text-h4-mobile lg:text-h4-desktop ${
                (isForOrgsSelected && !i) || (!isForOrgsSelected && i)
                  ? 'text-gray-2'
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
        className={'w-[calc(100%+24px)]'}
        tableData={contentTableData}
      />
      <div className="mt-16 text-center text-h3-mobile lg:text-h3-desktop">
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
