import { IFaq } from './Faq';

const base: IFaq = {
  faqItems: [
    {
      questionText: 'Hello',
      answerText: <>World</>,
    },
    {
      questionText: 'Zar',
      answerText: <>Doz</>,
    },
  ],
};

export const mockFaqProps = {
  base,
};
