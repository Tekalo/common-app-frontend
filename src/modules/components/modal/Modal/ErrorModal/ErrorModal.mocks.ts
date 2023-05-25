import { IErrorModal } from './ErrorModal';

const base: IErrorModal = {
  closeModal: () => void {},
  titleText: 'Test Basic Error Modal',
  descriptionText: 'Error Details',
  buttonText: 'Ok',
  isOpen: true,
};

const conflict: IErrorModal = {
  closeModal: () => void {},
  isOpen: true,
  titleText: 'Error with special handler',
  descriptionText: 'This uses a special function when the button is clicked',
  buttonText: 'Do something',
  buttonHandler: () => void {},
};

export const mockErrorModalProps = {
  base,
  conflict,
};
