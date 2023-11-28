import { ISuccessSection } from '@/components/info/successSection/SuccessSection';

const base: ISuccessSection = {
  title: 'Success Page',
  body: 'This is the success page.',
  buttonText: 'Wow!',
  buttonHandler: () => void {},
};

export const mockSuccessSectionProps = {
  base,
};
