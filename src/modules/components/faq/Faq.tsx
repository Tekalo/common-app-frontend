import { IFaqItem } from '@/lib/types';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export interface IFaq {
  faqItems: IFaqItem[];
  className?: string;
}

const Faq: React.FC<IFaq> = ({ faqItems, className }) => {
  return (
    <div
      className={`mx-auto w-full max-w-content-area ${
        className ? className : ''
      }`}
    >
      <dl className="space-y-3 divide-y divide-gray-3 border-b border-b-gray-3 pb-8 md:space-y-8">
        {faqItems.map((faq, i) => (
          <Disclosure
            as="div"
            key={i}
            className="pt-3 md:pt-8"
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
                    <span className="text-h4-mobile lg:text-h4-desktop">
                      {faq.questionText}
                    </span>
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
                <Disclosure.Panel as="dd" className="mt-6">
                  {faq.answerText && (
                    <div className="text-gray-600 max-w-[822px] text-p2-mobile lg:text-p1-mobile">
                      {faq.answerText}
                    </div>
                  )}

                  {faq.extras && <>{faq.extras}</>}
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
