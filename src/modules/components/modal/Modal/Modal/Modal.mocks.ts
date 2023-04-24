import { IModal } from './Modal';

const base: IModal = {
  buttonText: 'Test',
  isOpen: true,
  closeModal: () => void {},
  onConfirm: () => void {},
  onCancel: () => void {},
};

export const mockModalProps = {
  base,
};
