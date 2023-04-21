import { ITableModal } from './TableModal';

let isOpen = true;

const base: ITableModal = {
  headerText: 'Header',
  bodyText: 'Body',
  isOpen,
  closeModal: () => {
    isOpen = false;
  },
};

export const mockTableModalProps = {
  base,
};
