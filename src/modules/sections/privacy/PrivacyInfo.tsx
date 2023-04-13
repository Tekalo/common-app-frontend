import { IFaqItem } from '@/lib/types';
import PrivacyTable from '@/modules/components/content/PrivacyTable';
import ProcessingTable from '@/modules/components/content/ProcessingTable';
import Faq from '@/modules/components/faq/Faq';
import { useState } from 'react';

export interface IPrivacyInfo {}

const PrivacyInfo: React.FC<IPrivacyInfo> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  const orgFAQS: Array<IFaqItem> = [
    {
      questionText: 'OrgHello',
      answerText: 'OrgWorld',
    },
    {
      questionText: 'OrgZar',
      answerText: 'OrgDoz',
    },
  ];

  const candidateFAQS: Array<IFaqItem> = [
    {
      questionText:
        'What are Matchmakers, Organizations, and Service Providers?',
      answerText: `Matchmakers are entities who have partnered with us to help review
        applications and match individuals with Organizations that might be a
        good fit. Organizations are entities that are looking for talented
        individuals. Service Providers are vendors who provide services that
        support CommonApp such as web hosting, cloud services, analytics, and
        email marketing.`,
    },
    {
      questionText: 'How will my info be shared?',
      answerText: `Matchmakers from Schmidt Futures and our collaborating
        organizations, such as All Tech Is Human and Fast Forward, will review
        applications and identify potential matches. They will then reach out
        to you to share those potential matches and seek your permission to
        make your info available to the matched Organizations`,
    },
    {
      questionText: 'Do you show ads?',
      answerText: `We don't show any ads on CommonApp! We only promote CommonApp itself
        via things like social media ads and email marketing, and we use
        tracking technologies such as cookies, pixels, and beacons to measure
        their performance.`,
    },
    {
      questionText: 'What rights do I have to respect to my data?',
      answerText: `We offer everyone the right to delete their data, access a copy of
        their data, withdraw consent to data processing, object to or restrict
        data processing, and rectify (correct inaccuracies or supplement
        incomplete info). For your protection, we have to verify your identity
        before taking action. Also, we can't always fully comply with a
        request, such as when doing so would reveal someone else's info, or
        when we're legally required to retain info. Please contact us at
        privacy@commonapp.com to submit a request or if you have any other data
        privacy questions.`,
    },
    {
      questionText: 'Where Is My Data Stored?',
      answerText: `All of our Matchmakers and Service Providers who store data
                  are located in the United States.`,
    },
    {
      questionText: 'What are your lawful bases for processing?',
      answerText: `Bravo if you care enough about your privacy to read this
      information! Please see below. Note that “Legitimate Interests” refers to
      something that (i) we think is desirable to us or someone else
      (including you), (ii) reasonably expected given the nature of our
      services, and (iii) doesn't create any undue risk to you.`,
      extras: <ProcessingTable />,
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
      <PrivacyTable padding="24px" />
      <div className="mt-16 text-center text-h3-mobile lg:text-h3-desktop">
        Frequently Asked Questions{' '}
      </div>
      <div className="m-auto max-w-content-area">
        <Faq
          key={isForOrgsSelected ? 'orgFAQS' : 'candidateFAQS'}
          faqItems={isForOrgsSelected ? orgFAQS : candidateFAQS}
        />
      </div>
    </div>
  );
};

export default PrivacyInfo;
