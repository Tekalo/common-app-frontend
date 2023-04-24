import { ButtonVariant } from '@/components/buttons/Button/Button';
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
  bodyText: `Are you sure you want to permanently delete you
  account and data? This may take up to 30 days. Choose
  “delete account” to start deletion.`,
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
