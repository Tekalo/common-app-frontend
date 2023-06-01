import Button from '@/components/buttons/Button/Button';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

export interface IErrorModal {
  titleText: string;
  descriptionText: string;
  buttonText: string;
  isOpen: boolean;
  closeModal: () => void;
  buttonHandler?: () => void;
}

const ErrorModal: React.FC<IErrorModal> = ({
  titleText,
  descriptionText,
  buttonText,
  isOpen,
  buttonHandler,
  closeModal,
}) => {
  const headerRef = useRef(null);

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeModal()}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black-transparent"
    >
      <Dialog.Panel className="relative mx-2 mt-20 max-w-[352px] rounded bg-white p-6 sm:mx-auto">
        <XMarkIcon
          className="absolute right-5 top-5 h-[26px] w-[26px] cursor-pointer"
          onClick={() => closeModal()}
        />
        <Dialog.Title
          ref={headerRef}
          className="mb-4 font-display text-h4-mobile"
        >
          {titleText}
        </Dialog.Title>
        <Dialog.Description className="text-p2-mobile">
          {descriptionText}
        </Dialog.Description>

        <div className="flex justify-end">
          <Button
            onClick={() => (buttonHandler ? buttonHandler() : closeModal())}
            label={buttonText}
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ErrorModal;
