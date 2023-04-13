import { IPrivacyModal } from './PrivacyModal';

let isOpen = true;

const base: IPrivacyModal = {
  isOpen,
  closeModal: () => {
    isOpen = false;
  },
};

export const mockPrivacyModalProps = {
  base,
};
