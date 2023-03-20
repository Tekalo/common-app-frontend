import { IFaq } from './Faq';

const base: IFaq = {
  faqItems: [
    {
      toggledOpen: false,
      questionText: 'Hello',
      answerText: 'World',
    },
  ],
};

export const mockFaqProps = {
  base,
};
