import Faq from '@/components/faq/Faq';
import { IFaqItem } from '@/lib/types';
import { useState } from 'react';

export interface IFaqSection {}

const FaqSection: React.FC<IFaqSection> = () => {
  const [forOrgs, setForOrgs] = useState(false);

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
      questionText: 'Is it free to use?',
      answerText:
        'Yes! <Name> is a free platform for job-seekers and organizations. We will never ask you a payment or credit card information.',
    },
    {
      questionText: 'CanZar',
      answerText: 'CanDoz',
    },
  ];

  return (
    <section className="grid w-full place-items-center">
      <div className="bg-light-blue pt-10-desktop lg:h-[1086px] lg:w-[1440px]">
        {/* TITLE */}
        <div className="text-center font-display text-h3-desktop text-black-text">
          Frequently Asked Questions
        </div>
        {/* TOGGLE */}
        {/* TODO: Move the toggle menu into its own component */}
        <div className="flex flex-row justify-center space-x-10 pt-2-desktop">
          <div
            className={`cursor-pointer text-h4-desktop transition-all ${
              forOrgs
                ? 'text-gray-2'
                : 'text-blue-1 underline underline-offset-8'
            }`}
            onClick={() => setForOrgs(false)}
          >
            For candidates
          </div>
          <div
            className={`cursor-pointer text-h4-desktop transition-all ${
              forOrgs
                ? 'text-blue-1 underline underline-offset-8'
                : 'text-gray-2'
            }`}
            onClick={() => setForOrgs(true)}
          >
            For organizations
          </div>
        </div>
        {/* FAQS */}
        <Faq
          key={forOrgs ? 'orgFAQS' : 'candidateFAQS'}
          faqItems={forOrgs ? orgFAQS : candidateFAQS}
        />
      </div>
    </section>
  );
};

export default FaqSection;
