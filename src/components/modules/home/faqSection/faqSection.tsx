import Faq from '@/components/faq/Faq';
import { IFaqItem } from '@/lib/types';

export interface IFaqSection {}

const FaqSection: React.FC<IFaqSection> = () => {
  const faqItems: Array<IFaqItem> = [
    {
      toggledOpen: false,
      questionText: 'Hello',
      answerText: 'World',
    },
    {
      toggledOpen: true,
      questionText: 'Zar',
      answerText: 'Doz',
    },
  ];
  return <Faq faqItems={faqItems} />;
};

export default FaqSection;
