import Faq from '@/components/faq/Faq';
import { PRIVACY_LINK, TERMS_LINK } from '@/lib/constants/text';
import { IFaqItem } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

export interface IFaqSection {}

const FaqSection: React.FC<IFaqSection> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  const approachSection = (
    <>
      <b>Equity:</b> strive to make the matchmaking process equitable for
      candidates and organizations
      <br />
      <b>Connections:</b> connect talent to opportunities that may be
      inaccessible or not easily discovered
      <br />
      <b>Transparent:</b> be transparent throughout the process, including our
      matchmaking policy, data privacy information, and the list of partner
      organizations
      <br />
      <b>Seamless user experience:</b> design an experience that is seamless and
      accessible for all
      <br />
      <b>Scalability:</b> match more open impact-driven opportunities with tech
      talent to build a better world
    </>
  );

  const reviewSection = (
    <>
      The review and matchmaking process is currently conducted by Talent
      Connectors at{' '}
      <a
        href="https://www.schmidtfutures.com/"
        className="text-blue-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        Schmidt Futures
      </a>
      ,{' '}
      <a
        href="https://alltechishuman.org/"
        className="text-blue-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        All Tech Is Human
      </a>
      ,{' '}
      <a
        href="https://www.ffwd.org/"
        className="text-blue-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        Fast Forward
      </a>{' '}
      and{' '}
      <a
        href="https://www.usdigitalresponse.org/about"
        className="text-blue-1 underline"
        target="_blank"
        rel="noreferrer"
      >
        U.S. Digital Response
      </a>
      .
    </>
  );

  const privacySection = (
    <>
      You can find more details on our{' '}
      <Link
        href={PRIVACY_LINK}
        className="text-blue-1 underline"
        target="_blank"
      >
        Privacy Info page
      </Link>
      .
    </>
  );

  const termsLink = (
    <Link href={TERMS_LINK} target="_blank" className="text-blue-1 underline">
      Terms of Use
    </Link>
  );

  const orgFAQS: Array<IFaqItem> = [
    {
      questionText: 'What types of organizations can apply?',
      answerText: (
        <>
          All organizations must be impact-driven and based in the United
          States. We accept applications from 501(c)(3) organizations. Other
          types of organizations are welcome to submit opportunities and will be
          considered on a case by case basis. All organizations must go through
          our vetting process. Every organization has to be an Equal Opportunity
          Employer (as defined by the EEOC).
        </>
      ),
    },
    {
      questionText: 'What types of roles can Tekalo help me recruit for?',
      answerText: (
        <>
          We can currently help you recruit software engineers, product
          managers, UI/UX and product designers, as well as data analysts. If
          you are looking to recruit for a different type of technical role we
          would love to hear from you! You may contact us using the “Contact Us”
          form at the bottom of this page.
        </>
      ),
    },
    {
      questionText: 'What types of positions can Tekalo help me recruit for?',
      answerText: (
        <>
          You can submit paid and unpaid positions, including full-time and
          part-time employment, contract, advisory and volunteering
          opportunities.
        </>
      ),
    },
    {
      questionText: 'What types of candidates may I be connected to?',
      answerText: (
        <>
          Candidates from around the world who meet the eligibility requirements
          (see the {termsLink}
          ), from all backgrounds, career paths and experience levels are
          welcome to apply. In your application you can specify what candidates
          you are looking for and your assigned Talent Connector will help you
          further define your ideal candidate profile during your call.
        </>
      ),
    },
    {
      questionText: 'When will I receive my matches?',
      answerText: (
        <>
          We will reach out to you promptly after we’ve identified a potential
          candidate match. We will generally continue to look for candidates for
          you until your opportunity is filled or you opt out of the platform.
          If you don’t receive a match right away don’t worry; we continue to
          receive new candidate applications weekly.
        </>
      ),
    },
    {
      questionText:
        'I am no longer looking for candidates. How do I opt out of Tekalo?',
      answerText: (
        <>
          If your opportunity is filled or you are no longer looking for
          candidates for a different reason, you can simply reach out to your
          assigned Talent Connector who will remove your opportunity from
          Tekalo.
        </>
      ),
    },
    {
      questionText: 'What is Tekalo’s approach?',
      answerText: approachSection,
    },
    {
      questionText: 'Who runs the review and matchmaking process?',
      answerText: reviewSection,
    },
    {
      questionText: 'How will my personal information be used or shared?',
      answerText: privacySection,
    },
    {
      questionText: 'I would like for my account and data to be deleted.',
      answerText: (
        <>
          You can submit a deletion request through your settings or simply
          email{' '}
          <a href="mailto:privacy@tekalo.org" className="text-blue-1 underline">
            privacy@tekalo.org
          </a>{' '}
          and request that your data be deleted. Please note that we have to
          retain some information for legal and technical purposes, such as your
          agreement with us and that we deleted your data.
        </>
      ),
    },
  ];

  const candidateFAQS: Array<IFaqItem> = [
    {
      questionText:
        'What types of organizations are recruiting through Tekalo?',
      answerText: (
        // TODO: Logos link
        <>
          You can see a list of organizations with open opportunities on Tekalo{' '}
          <a href="#">here</a>. We only collaborate with impact-driven
          organizations, and every organization goes through our vetting
          process. Organizations on Tekalo focus on cause areas ranging from
          climate change to human rights. At this time, we are only able to
          include organizations that are based in the United States.
        </>
      ),
    },
    {
      questionText: 'What types of roles can I find on Tekalo?',
      answerText: (
        <>
          Right now, we are focusing on software engineers, product managers,
          UI/UX and product designers, as well as data analysts. If you are
          interested in a role currently not listed on our platform, we would
          love to hear from you! You may contact us using the “Contact Us” form
          at the bottom of this page.
        </>
      ),
    },
    {
      questionText: 'What types of opportunities might I find on Tekalo?',
      answerText: (
        <>
          On Tekalo, there will be many types of opportunities including:
          full-time or part-time, paid or unpaid positions, including part-time
          employment, contract, advisory and volunteer.
        </>
      ),
    },
    {
      questionText: 'Who can apply?',
      answerText: (
        <>
          The application is open to everyone around the world who meets the
          eligibility requirements (see the {termsLink}
          )! We welcome candidates from all backgrounds, career paths and
          experience levels to apply.
        </>
      ),
    },
    {
      questionText: 'Who will review and have access to my application?',
      answerText: (
        <>
          Your assigned Tekalo Talent Connector will be the one reviewing your
          application. Other key members of the Tekalo team will also have
          access to your application. If you indicated an interest in state and
          local government opportunities, a team at U.S. Digital Response will
          also receive your application details. We will never share your
          application with any organization/ employer unless you explicitly
          agree by communicating to your Talent Connector that your info may be
          shared with that specific organization.
        </>
      ),
    },
    {
      questionText: 'When will I receive my matches?',
      answerText: (
        <>
          Our matchmaking process is iterative; we will generally continue to
          look for matches for you until you have a job or let us know that you
          are no longer looking for opportunities. We will aim to conduct the
          first round of matchmaking within 6 weeks of receiving your
          application. Once we conclude each matchmaking round, we will send you
          a list of your top matches. If you don’t receive matches right away
          don’t worry; we continue to receive new opportunities weekly.
        </>
      ),
    },
    {
      questionText:
        'I am no longer looking for opportunities at this time. How do I pause further matches?',
      answerText: (
        <>
          If you are no longer looking for opportunities, you can log in to your
          account by clicking “Sign in” at the top of this page, and choose to
          pause your matches. If you would like to be considered for
          opportunities again, you can simply sign in and click “resume my
          matches.” If you would like to fully delete your account and data, see
          the FAQ titled (“How can I delete my account and data?”).
        </>
      ),
    },
    {
      questionText: 'Is Tekalo free?',
      answerText: (
        <>
          Yes! Tekalo is a free resource. We will never ask you for payment
          information.
        </>
      ),
    },
    {
      questionText: 'What is Tekalo’s approach?',
      answerText: approachSection,
    },
    {
      questionText: 'Who runs the review and matchmaking process?',
      answerText: reviewSection,
    },
    {
      questionText: 'How will my personal information be used or shared?',
      answerText: privacySection,
    },
    {
      questionText: 'How can I delete my account and data?',
      answerText: (
        <>
          You can simply click “Sign in” at the top of this page and then once
          you are logged in select “Delete my account and data.” Please note
          that we have to retain some information for legal and technical
          purposes, such as your agreement with us and that we deleted your
          data.
        </>
      ),
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
      <div className="w-full px-6 pb-16 pt-14 md:px-4 md:py-20 lg:px-5 lg:py-28">
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
