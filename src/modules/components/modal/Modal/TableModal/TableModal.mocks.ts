import { orgContentTableData } from '@/sections/privacy/PrivacyInfo';
import { ITableModal } from './TableModal';

let isOpen = true;

const base: ITableModal = {
  headerText: 'Header',
  bodyText: 'Body',
  tableData: orgContentTableData,
  isOpen,
  closeModal: () => {
    isOpen = false;
  },
};

export const mockTableModalProps = {
  base,
};
