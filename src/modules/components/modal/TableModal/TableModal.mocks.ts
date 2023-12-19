import { ORG_CONTENT_TABLE_TEXT } from '@/lang/en/en';
import { ITableModal } from './TableModal';

let isOpen = true;

const base: ITableModal = {
  headerText: 'Header',
  tableData: ORG_CONTENT_TABLE_TEXT,
  isOpen,
  closeModal: () => {
    isOpen = false;
  },
};

export const mockTableModalProps = {
  base,
};
