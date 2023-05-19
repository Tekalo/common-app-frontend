import Faq from '@/components/faq/Faq';
import { HOME_FAQ_TEXT, PRIVACY_LINK, TERMS_LINK } from '@/lang/en';
import { IFaqItem } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

export interface IFaqSection {
  setShowLogoModal: (showModal: boolean) => void;
}

const FaqSection: React.FC<IFaqSection> = ({ setShowLogoModal }) => {
  const [isForOrgsSelected, setForOrgs] = useState(false);
  const toggleHeaders = [
    HOME_FAQ_TEXT.CANDIDATE_TOGGLE,
    HOME_FAQ_TEXT.ORG_TOGGLE,
  ];

  const ApproachAnswer = (
    <>
      {HOME_FAQ_TEXT.ORG_ANSWER_7.map((value, i) => (
        <div key={i}>
          <span className="font-bold">{value.title}</span>
          {value.text}
        </div>
      ))}
    </>
  );

  const ReviewerAnswer = (
    <>
      {HOME_FAQ_TEXT.ORG_ANSWER_8.text}
      {HOME_FAQ_TEXT.ORG_ANSWER_8.partners.map((partner, i) => (
        <span key={i}>
          <a
            href={partner.url}
            className="whitespace-nowrap text-blue-1 underline"
            target="_blank"
            rel="noreferrer"
          >
            {partner.name}
          </a>{' '}
        </span>
      ))}
    </>
  );

  const PrivacyAnswer = (
    <>
      {HOME_FAQ_TEXT.ORG_ANSWER_4[0]}
      <Link href={TERMS_LINK} target="_blank" className="text-blue-1 underline">
        {HOME_FAQ_TEXT.ORG_ANSWER_4[1]}
      </Link>
      {HOME_FAQ_TEXT.ORG_ANSWER_4[2]}
    </>
  );

  const orgFAQS: Array<IFaqItem> = [
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_1,
      answerText: HOME_FAQ_TEXT.ORG_ANSWER_1,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_2,
      answerText: HOME_FAQ_TEXT.ORG_ANSWER_2,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_3,
      answerText: HOME_FAQ_TEXT.ORG_ANSWER_3,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_4,
      answerText: PrivacyAnswer,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_5,
      answerText: HOME_FAQ_TEXT.ORG_ANSWER_5,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_6,
      answerText: HOME_FAQ_TEXT.ORG_ANSWER_6,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_7,
      answerText: ApproachAnswer,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_8,
      answerText: ReviewerAnswer,
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_9,
      answerText: (
        <>
          {HOME_FAQ_TEXT.ORG_ANSWER_9.text}
          <Link
            href={PRIVACY_LINK}
            className="text-blue-1 underline"
            target="_blank"
          >
            {HOME_FAQ_TEXT.ORG_ANSWER_9.urlText}
          </Link>
          .
        </>
      ),
    },
    {
      questionText: HOME_FAQ_TEXT.ORG_QUESTION_10,
      answerText: (
        <>
          {HOME_FAQ_TEXT.ORG_ANSWER_10[0]}
          <a href="mailto:privacy@tekalo.org" className="text-blue-1 underline">
            {HOME_FAQ_TEXT.ORG_ANSWER_10[1]}
          </a>
          {HOME_FAQ_TEXT.ORG_ANSWER_10[2]}
        </>
      ),
    },
  ];

  const candidateFAQS: Array<IFaqItem> = [
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_1,
      answerText: (
        // TODO: Logos link
        <>
          {HOME_FAQ_TEXT.APPLICANT_ANSWER_1[0]}
          <span
            className={`cursor-pointer text-blue-1 underline underline-offset-4`}
            onClick={() => setShowLogoModal(true)}
          >
            {HOME_FAQ_TEXT.APPLICANT_ANSWER_1[1]}
          </span>
          {HOME_FAQ_TEXT.APPLICANT_ANSWER_1[2]}
        </>
      ),
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_2,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_2,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_3,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_3,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_4,
      answerText: (
        <>
          {HOME_FAQ_TEXT.APPLICANT_ANSWER_4[0]}
          <Link
            href="/terms"
            target="_blank"
            className="whitespace-nowrap text-blue-1 underline"
          >
            {HOME_FAQ_TEXT.APPLICANT_ANSWER_4[1]}
          </Link>
          {HOME_FAQ_TEXT.APPLICANT_ANSWER_4[2]}
        </>
      ),
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_5,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_5,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_6,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_7,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_7,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_7,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_8,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_8,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_9,
      answerText: ApproachAnswer,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_10,
      answerText: ReviewerAnswer,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_11,
      answerText: PrivacyAnswer,
    },
    {
      questionText: HOME_FAQ_TEXT.APPLICANT_QUESTION_12,
      answerText: HOME_FAQ_TEXT.APPLICANT_ANSWER_12,
    },
  ];

  const renderToggle = () => {
    return (
      <div className="mb-14 flex flex-row justify-center space-x-8 sm:space-x-10 md:mt-2-tablet lg:mt-2-desktop">
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
    );
  };

  return (
    <section className="grid w-full place-items-center">
      <div className="w-full px-6 pb-16 pt-14 md:px-4 md:py-20 lg:px-5 lg:py-28">
        {/* TOGGLE */}
        <div className="md:hidden">{renderToggle()}</div>
        {/* TITLE */}
        <div className="mx-auto max-w-content-area">
          <div className="text-black-text: text-center font-display text-h3-mobile md:text-h1-mobile lg:text-h2-desktop">
            {HOME_FAQ_TEXT.HEADER}
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
