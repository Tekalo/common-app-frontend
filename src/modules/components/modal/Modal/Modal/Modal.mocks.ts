import { IModal } from './Modal';

const base: IModal = {
  buttonText: 'Test',
  isOpen: true,
  closeModal: () => {},
  onConfirm: () => {},
  onCancel: () => {},
};

export const mockModalProps = {
  base,
};
