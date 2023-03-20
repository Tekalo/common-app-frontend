import { IFaqItem } from '@/lib/types';
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
    <div className="divide-y bg-gradient-to-r from-cyan-500 to-blue-500">
      {faqs.map((faq, index) => (
        <div key={index} className="">
          <div className="">{faq.questionText}</div>
          <div className="">{faq.answerText}</div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
