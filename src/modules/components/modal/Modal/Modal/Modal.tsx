import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ReactElement, useRef } from 'react';

export interface IModal {
  bodyText?: string;
  content?: ReactElement;
  buttonText?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  cancelButtonText?: string;
  headline?: string | ReactElement;
  isOpen: boolean;
  positionStyles: string;
  closeModal: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Modal: React.FC<IModal> = ({
  bodyText,
  buttonText,
  buttonColor,
  buttonHoverColor,
  cancelButtonText,
  content,
  headline,
  isOpen,
  positionStyles,
  closeModal,
  onConfirm,
  onCancel,
}) => {
  const headerRef = useRef(null);
  buttonColor = buttonColor || 'bg-blue-1';
  buttonHoverColor = buttonHoverColor || 'bg-blue-2';

  return (
    <Dialog
      data-name="Modal"
      initialFocus={headerRef}
      className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-black-transparent"
      open={isOpen}
      onClose={closeModal}
    >
      <div className={positionStyles}>
        <Dialog.Panel className="m-auto max-w-[736px] rounded bg-white px-6 pb-8 pt-6 md:px-8">
          <div className="relative">
            {/* Exit Icon */}
            <XMarkIcon
              className="absolute -right-4 -top-4 h-[26px] w-[26px] cursor-pointer md:right-0 md:top-0"
              aria-hidden="true"
              onClick={closeModal}
            />
            {/* Title */}
            {headline && (
              <Dialog.Title
                data-name="modal-header"
                className="mb-4 font-display text-h4-desktop text-black-text"
                ref={headerRef}
              >
                {headline}
              </Dialog.Title>
            )}
            {/* Body */}
            {bodyText && (
              <Dialog.Description
                data-name="modal-description"
                className="mb-4 text-p2-desktop text-black-text"
              >
                {bodyText}
              </Dialog.Description>
            )}
            {content ? (
              <div className="md:pb-10 md:pt-14">{content}</div>
            ) : (
              <></>
            )}
            <div className="flex items-center justify-center gap-x-8 md:justify-end">
              {/* Cancel Button */}
              {cancelButtonText && (
                <button
                  name="modal-cancel"
                  type="button"
                  className="cursor-pointer text-component-extra-large"
                  onClick={onCancel}
                >
                  {cancelButtonText}
                </button>
              )}
              {/* Confirm Button */}
              {buttonText ? (
                <button
                  name="modal-confirm"
                  type="button"
                  className={`${buttonColor} group flex h-12 min-w-[118px] flex-row content-center items-center justify-center rounded px-2 font-sans text-component-large text-white transition-colors hover:${buttonHoverColor} focus-visible:ring-2 focus-visible:ring-[#A7C4DB] md:px-[33px]`}
                  onClick={onConfirm}
                >
                  {buttonText}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
