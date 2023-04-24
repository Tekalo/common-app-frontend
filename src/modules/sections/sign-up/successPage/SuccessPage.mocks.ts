import { ISuccessPage } from './SuccessPage';

const base: ISuccessPage = {
  title: 'Success Page',
  body: 'This is the success page.',
  buttonText: 'Wow!',
  buttonHandler: () => void {},
};

export const mockSuccessPageProps = {
  base,
};
