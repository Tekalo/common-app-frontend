import { IFaqItem } from '@/lib/types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export interface IFaq {
  faqItems: Array<IFaqItem>;
}

const Faq: React.FC<IFaq> = ({ faqItems }) => {
  const [faqs, setFaqs] = useState(faqItems);

  const toggleFAQ = (index: number) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.toggledOpen = !faq.toggledOpen;
        } else {
          faq.toggledOpen = false;
        }
        return faq;
      })
    );
  };

  // TODO: Style me!
  return (
    <div className="mx-auto max-w-7xl">
      <dl className="mt-10 space-y-6 divide-y divide-gray-1">
        {faqs.map((faq, i) => (
          <div key={i} className="pt-6">
            {
              <>
                <dt>
                  <div className="flex w-full items-start justify-between text-left text-black-text">
                    <span className="font-semibold leading-7 text-black-text">
                      {faq.questionText}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {faq.toggledOpen ? (
                        <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                </dt>
                <div className="mt-2 pr-12">
                  <p className="leading-7 text-black-text">{faq.answerText}</p>
                </div>
              </>
            }
          </div>
        ))}
      </dl>
    </div>
  );
};

/**
 * <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
 */

export default Faq;
