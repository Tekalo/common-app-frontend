import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

export interface IConfirmModal {
  bodyText: string;
  confirmButtonColor?: string;
  confirmHoverColor?: string;
  cancelButtonText: string;
  confirmButtonText: string;
  headline: string;
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<IConfirmModal> = ({
  bodyText,
  confirmButtonColor,
  cancelButtonText,
  confirmButtonText,
  confirmHoverColor,
  headline,
  isOpen,
  closeModal,
  onConfirm,
  onCancel,
}) => {
  let headerRef = useRef(null);
  confirmButtonColor = confirmButtonColor ? confirmButtonColor : 'bg-blue-1';
  confirmHoverColor = confirmHoverColor ? confirmHoverColor : 'bg-blue-2';

  return (
    <Dialog
      initialFocus={headerRef}
      className="bg-black-transparent fixed bottom-0 left-0 right-0 top-0 z-50"
      open={isOpen}
      onClose={() => closeModal()}
    >
      <div className="absolute left-6 right-6 top-20 z-50 md:top-48">
        <Dialog.Panel className="m-auto max-w-[736px] rounded bg-white px-6 pb-8 pt-6 md:px-8">
          <div className="relative">
            <XMarkIcon
              className="absolute -right-4 -top-4 h-[26px] w-[26px] cursor-pointer md:right-0 md:top-0"
              onClick={() => closeModal()}
            />
            <Dialog.Title
              ref={headerRef}
              className="mb-4 font-display text-h4-desktop text-black-text"
            >
              {headline}
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-p2-desktop text-black-text">
              {bodyText}
            </Dialog.Description>
            <div className="flex items-center justify-center gap-x-8 md:justify-end">
              <div
                className="cursor-pointer text-component-extra-large"
                onClick={() => onCancel()}
              >
                {cancelButtonText}
              </div>
              <button
                className={`${confirmButtonColor} group flex h-12 min-w-[118px] flex-row
                content-center items-center justify-center rounded px-2 font-sans
                text-component-large text-white transition-colors ${`hover:${confirmHoverColor}`} focus-visible:ring-2 focus-visible:ring-[#A7C4DB] md:px-[33px]`}
                onClick={() => onConfirm()}
              >
                {confirmButtonText}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
