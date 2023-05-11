import Button from '@/components/buttons/Button/Button';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export interface IErrorModal {
  // Used to switch out the message for 409s
  isConflict?: boolean;
  isOpen: boolean;
  closeModal: () => void;
}

const ErrorModal: React.FC<IErrorModal> = ({
  isConflict,
  isOpen,
  closeModal,
}) => {
  const headerRef = useRef(null);
  const router = useRouter();

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
          {isConflict ? 'Email already exists' : 'Request failed'}
        </Dialog.Title>
        <Dialog.Description className="text-p2-mobile">
          {isConflict
            ? 'Please sign in'
            : 'Something went wrong. Please try again later.'}
        </Dialog.Description>

        <div className="flex justify-end">
          <Button
            onClick={() =>
              isConflict ? router.push('/sign-in') : closeModal()
            }
            label="Ok"
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ErrorModal;
