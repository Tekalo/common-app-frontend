import { IModal } from './Modal';

let isOpen = true;

const base: IModal = {
  headerText: 'Header',
  bodyText: 'Body',
  isOpen,
  closeModal: () => {
    isOpen = false;
  },
};

export const mockModalProps = {
  base,
};
