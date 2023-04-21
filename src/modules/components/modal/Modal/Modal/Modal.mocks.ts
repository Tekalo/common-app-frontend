import { IModal } from './Modal';

const base: IModal = {
  buttonText: 'Test',
  isOpen: true,
  closeModal: () => null,
  onConfirm: () => null,
  onCancel: () => null,
};

export const mockModalProps = {
  base,
};
