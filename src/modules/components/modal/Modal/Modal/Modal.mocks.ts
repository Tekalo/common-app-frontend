import { IModal } from './Modal';

const base: IModal = {
  buttonText: 'Test',
  isOpen: true,
  positionStyles: 'absolute left-6 right-6 top-10 z-50 md:top-48',
  closeModal: () => void {},
  onConfirm: () => void {},
  onCancel: () => void {},
};

export const mockModalProps = {
  base,
};
