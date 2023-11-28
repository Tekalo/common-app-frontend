import { IFaq } from '@/components/faq/Faq';

const base: IFaq = {
  faqItems: [
    {
      questionText: 'Hello',
      answerText: 'Wow',
    },
    {
      questionText: 'Zar',
      answerText: 'Doz',
    },
  ],
};

export const mockFaqProps = {
  base,
};
