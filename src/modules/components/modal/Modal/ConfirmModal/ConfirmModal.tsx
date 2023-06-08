import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

export interface IConfirmModal {
  bodyText: string;
  cancelBtnText: string;
  confirmBtnText: string;
  confirmBtnVariant?: ButtonVariant;
  headline: string;
  isOpen: boolean;
  name?: string;
  closeModal: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<IConfirmModal> = ({
  bodyText,
  cancelBtnText,
  confirmBtnText,
  confirmBtnVariant,
  headline,
  isOpen,
  name,
  closeModal,
  onConfirm,
  onCancel,
}) => {
  const headerRef = useRef(null);

  return (
    <Dialog
      initialFocus={headerRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black-transparent"
      open={isOpen}
      onClose={() => closeModal()}
    >
      <div className="absolute left-6 right-6 top-20 z-50 md:top-48">
        <Dialog.Panel
          data-name={name}
          className="m-auto max-w-[736px] rounded bg-white px-6 pb-8 pt-6 md:px-8"
        >
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
                data-name="confirm-modal-cancel"
                className="cursor-pointer text-component-extra-large"
                onClick={() => onCancel()}
              >
                {cancelBtnText}
              </div>
              <Button
                name="confirm-modal-confirm"
                className="px-2 md:px-[33px]"
                label={confirmBtnText}
                onClick={() => onConfirm()}
                variant={confirmBtnVariant}
              />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
