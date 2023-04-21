import Button from '@/components/buttons/Button/Button';
import { useState } from 'react';
import ConfirmModal, { IConfirmModal } from './ConfirmModal';
import { mockConfirmModalProps } from './ConfirmModal.mocks';

const ToolTipExample: React.FC<IConfirmModal> = ({
  bodyText,
  cancelBtnText: cancelButtonText,
  confirmBtnText: confirmButtonText,
  confirmBtnVariant: confirmButtonVariant,
  headline,
  onConfirm,
}) => {
  const [showModal, setShowModal] = useState(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Button label="Show Modal" onClick={() => setShowModal(true)} />
      <ConfirmModal
        bodyText={bodyText}
        confirmBtnVariant={confirmButtonVariant}
        cancelBtnText={cancelButtonText}
        confirmBtnText={confirmButtonText}
        headline={headline}
        isOpen={showModal}
        closeModal={closeModal}
        onConfirm={onConfirm}
        onCancel={closeModal}
      />
    </div>
  );
};

export default { component: ToolTipExample };

export const Default = {
  args: { ...mockConfirmModalProps.base },
};

export const DeleteAccount = {
  args: { ...mockConfirmModalProps.deleteContent },
};
