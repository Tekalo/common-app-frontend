import Button from '@/components/buttons/Button/Button';
import ConfirmModal, {
  IConfirmModal,
} from '@/modules/components/modal/ConfirmModal/ConfirmModal';
import { mockConfirmModalProps } from '@/modules/components/modal/ConfirmModal/ConfirmModal.mocks';
import { useState } from 'react';

const ConfirmModalExample: React.FC<IConfirmModal> = ({
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

export default { component: ConfirmModalExample };

export const Default = {
  args: { ...mockConfirmModalProps.base },
};

export const DeleteAccount = {
  args: { ...mockConfirmModalProps.deleteContent },
};
