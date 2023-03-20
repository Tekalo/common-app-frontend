import { IFaqItem } from '@/lib/types';
import { useState } from 'react';

export interface IFaq {
  faqItems: Array<IFaqItem>;
}

const Faq: React.FC<IFaq> = ({ faqItems }) => {
  const [Faq, setFaq] = useState(faqItems);

  const toggleFAQ = (index: number) => {
    setFaq(
      Faq.map((faq, i) => {
        if (i === index) {
          faq.toggledOpen = !faq.toggledOpen;
        }
        return faq;
      })
    );
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {Faq.map((faq, index) => (
        <div key={index}>
          <div className="">{faq.questionText}</div>
          <div className="">{faq.answerText}</div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
