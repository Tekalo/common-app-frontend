import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRef } from 'react';
import Button from '../buttons/Button/Button';
import PrivacyTable from '../content/PrivacyTable';

export interface IPrivacyModal {
  isOpen: boolean;
  closeModal: () => void;
}

const PrivacyModal: React.FC<IPrivacyModal> = ({
  closeModal,
  isOpen: showModal,
}) => {
  let headerRef = useRef(null);

  return (
    <>
      <Dialog
        initialFocus={headerRef}
        open={showModal}
        onClose={() => closeModal()}
      >
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-40 bg-black-text opacity-70 ${
            !showModal ? 'hidden' : ''
          }`}
        ></div>
        <div className="fixed bottom-0 left-4 right-4 top-0 z-50 mx-auto  mb-12 mt-14 max-h-[750px] max-w-[722px] rounded-md bg-white">
          <Dialog.Panel>
            <XMarkIcon
              className="absolute right-2 top-4 z-50 h-6 w-6 cursor-pointer stroke-2 text-black-text md:top-6"
              onClick={() => {
                closeModal();
              }}
            />
            <div className="absolute bottom-4 left-2 right-0 top-10 flex flex-1 flex-col justify-stretch md:left-6 md:right-6">
              <div className="overflow-y-scroll md:overflow-y-auto">
                <div ref={headerRef} className="mb-6 mt-2 pr-2 text-h4-desktop">
                  Privacy Info
                </div>
                <div className="max-w-[560px] pr-2 text-p2-desktop">
                  This Privacy Info is meant to help you understand what
                  information we collect, why we collect it, and how you can
                  manage and delete your information lorem.
                </div>
                <PrivacyTable padding="0px" />
                <div className="text-p3-desktop">
                  See our&nbsp;
                  <span className="text-blue-1 underline underline-offset-4">
                    <Link href="#">Privacy FAQ</Link>
                  </span>
                  &nbsp;for more information
                </div>
                <Button
                  className="float-right mr-2 mt-8 h-[40px] px-12 text-component-large font-normal"
                  label="Close"
                  onClick={() => {
                    closeModal();
                  }}
                />
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default PrivacyModal;
