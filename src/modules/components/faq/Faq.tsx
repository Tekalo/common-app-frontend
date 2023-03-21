import { IFaqItem } from '@/lib/types';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export interface IFaq {
  faqItems: Array<IFaqItem>;
}

const Faq: React.FC<IFaq> = ({ faqItems }) => {
  return (
    <div className="mx-auto max-w-7xl">
      <dl className="mt-10 space-y-6 divide-y divide-gray-1">
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
                  <Disclosure.Button className="text-gray-900 flex w-full items-start justify-between text-left">
                    <span className="text-base font-semibold leading-7">
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
