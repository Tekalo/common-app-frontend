import Faq from '@/components/faq/Faq';
import { IFaqItem } from '@/lib/types';
import { useState } from 'react';

export interface IFaqSection {}

const FaqSection: React.FC<IFaqSection> = () => {
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
      questionText: 'Is it free to use?',
      answerText:
        'Yes! <Name> is a free platform for job-seekers and organizations. We will never ask you a payment or credit card information.',
    },
    {
      questionText: 'What skills do I need to apply?',
      answerText:
        'Yes! <Name> is a free platform for job-seekers and organizations. We will never ask you a payment or credit card information.',
    },
    {
      questionText: 'What type of impact opportunities are on [Name TBD]?',
      answerText:
        'Yes! <Name> is a free platform for job-seekers and organizations. We will never ask you a payment or credit card information.',
    },
    {
      questionText: 'What are the salary ranges for impact careers?',
      answerText:
        'Yes! <Name> is a free platform for job-seekers and organizations. We will never ask you a payment or credit card information.',
    },
    {
      questionText: 'How will my data be used?',
      answerText:
        'Yes! <Name> is a free platform for job-seekers and organizations. We will never ask you a payment or credit card information.',
    },
  ];

  const toggleHeaders = ['For candidates', 'For organizations'];

  const renderToggle = () => {
    return (
      <div className="mb-14 flex flex-row justify-center space-x-8 sm:space-x-10 md:mt-2-tablet lg:mt-2-desktop">
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
    );
  };

  return (
    <section className="grid w-full place-items-center">
      <div className="px-6 pb-16 pt-14 md:px-4 md:py-20 lg:px-5 lg:py-28">
        {/* TOGGLE */}
        {/* TODO: Consider moving toggle menu to own component, this is identical to FAQ */}
        <div className="md:hidden">{renderToggle()}</div>
        {/* TITLE */}
        <div className="mx-auto max-w-content-area">
          <div className="text-black-text: text-center font-display text-h3-mobile md:text-h1-mobile lg:text-h2-desktop">
            Frequently Asked Questions
          </div>
          <div className="hidden md:block">{renderToggle()}</div>
          {/* FAQS */}
          <div className="mt-6 md:mt-2-tablet lg:mt-2-desktop">
            <Faq
              key={isForOrgsSelected ? 'orgFAQS' : 'candidateFAQS'}
              faqItems={isForOrgsSelected ? orgFAQS : candidateFAQS}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
