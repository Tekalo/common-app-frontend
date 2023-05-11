import Button from '@/components/buttons/Button/Button';
import { useState } from 'react';
import ErrorModal, { IErrorModal } from './ErrorModal';
import { mockErrorModalProps } from './ErrorModal.mocks';

const ErrorModalExample: React.FC<IErrorModal> = ({ isConflict }) => {
  const [showModal, setShowModal] = useState(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Button label="Show Modal" onClick={() => setShowModal(true)} />
      <ErrorModal
        isConflict={isConflict}
        isOpen={showModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default { component: ErrorModalExample };

export const Default = {
  args: { ...mockErrorModalProps.base },
};

export const Conflict = {
  args: { ...mockErrorModalProps.conflict },
};
