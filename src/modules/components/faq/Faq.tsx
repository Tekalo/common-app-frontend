import { IFaqItem } from '@/lib/types';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export interface IFaq {
  faqItems: Array<IFaqItem>;
}

// TODO: Evaluate use of Headless UI in greater detail and determine if we should just implement this functionality ourselves.

const Faq: React.FC<IFaq> = ({ faqItems }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <dl className="mt-10 space-y-6 divide-y divide-gray-3 border-b border-b-gray-3 pb-8">
        {faqItems.map((faq, i) => (
          <Disclosure
            as="div"
            key={i}
            className="pt-6"
            defaultOpen={i == 0 ? true : false}
          >
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button
                    className={`${
                      open ? 'text-blue-1' : `text-black-text`
                    } flex w-full items-start justify-between text-left`}
                  >
                    <span className="text-h4-desktop">{faq.questionText}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <ChevronUpIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-600 leading-7">
                    {faq.answerText}
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </div>
  );
};

export default Faq;
