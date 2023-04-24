import { ISuccessPage } from './SuccessPage';

const base: ISuccessPage = {
  title: 'Success Page',
  body: 'This is the success page.',
  buttonText: 'Wow!',
  buttonHandler: () => {},
};

export const mockSuccessPageProps = {
  base,
};
