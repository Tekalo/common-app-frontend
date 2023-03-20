import { IFaq } from './Faq';

const base: IFaq = {
  faqItems: [
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
  ],
};

export const mockFaqProps = {
  base,
};
