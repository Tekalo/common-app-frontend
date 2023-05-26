import { ButtonVariant } from '@/components/buttons/Button/Button';
import { DELETE_MODAL } from '@/lang/en';
import { IConfirmModal } from './ConfirmModal';

const base: IConfirmModal = {
  bodyText: 'Are you sure you want to pause your matches? Lorem ipsum',
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Pause Matches',
  headline: 'Pause your matches',
  isOpen: true,
  closeModal: () => void {},
  onConfirm: () => alert('Matches Paused'),
  onCancel: () => void {},
};

const deleteContent: IConfirmModal = {
  bodyText: DELETE_MODAL.BODY,
  confirmBtnVariant: ButtonVariant.RED,
  cancelBtnText: DELETE_MODAL.CTA_CANCEL,
  confirmBtnText: DELETE_MODAL.CTA_CONFIRM,
  headline: DELETE_MODAL.HEADER,
  isOpen: true,
  closeModal: () => void {},
  onConfirm: () => alert('Account deleted'),
  onCancel: () => void {},
};

export const mockConfirmModalProps = {
  base,
  deleteContent,
};
