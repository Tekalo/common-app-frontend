import Button from '@/components/buttons/Button/Button';
import ErrorModal, {
  IErrorModal,
} from '@/modules/components/modal/ErrorModal/ErrorModal';
import { mockErrorModalProps } from '@/modules/components/modal/ErrorModal/ErrorModal.mocks';
import { useState } from 'react';

const ErrorModalExample: React.FC<IErrorModal> = () => {
  const [showModal, setShowModal] = useState(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Button label="Show Modal" onClick={() => setShowModal(true)} />
      <ErrorModal
        titleText="Wow"
        descriptionText="A modal"
        buttonText="Ok"
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
