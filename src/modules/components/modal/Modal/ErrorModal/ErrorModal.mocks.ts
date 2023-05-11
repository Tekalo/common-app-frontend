import { IErrorModal } from './ErrorModal';

const base: IErrorModal = {
  closeModal: () => void {},
  isOpen: true,
};

const conflict: IErrorModal = {
  closeModal: () => void {},
  isOpen: true,
  isConflict: true,
};

export const mockErrorModalProps = {
  base,
  conflict,
};
