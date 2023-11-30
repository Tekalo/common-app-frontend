import { ButtonVariant } from '@/components/buttons/Button/Button';
import { DELETE_MODAL } from '@/lang/en';
import { IConfirmModal } from '@/modules/components/modal/ConfirmModal/ConfirmModal';

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
  cancelBtnText: 'Cancel',
  confirmBtnText: 'Delete account',
  headline: 'Permanently delete your account and data',
  isOpen: true,
  closeModal: () => void {},
  onConfirm: () => alert('Account deleted'),
  onCancel: () => void {},
};

export const mockConfirmModalProps = {
  base,
  deleteContent,
};
