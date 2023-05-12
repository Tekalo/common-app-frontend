import Button from '@/components/buttons/Button/Button';
import ContentTable from '@/components/tables/ContentTable/ContentTable';
import { ContentTableData } from '@/lib/types';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ReactElement, useRef } from 'react';

export interface ITableModal {
  isOpen: boolean;
  closeModal: () => void;
  headerText: string;
  bodyText: string;
  extras?: ReactElement;
  tableData: ContentTableData;
}

const TableModal: React.FC<ITableModal> = ({
  closeModal: closeTableModal,
  isOpen: showTableModal,
  headerText,
  bodyText,
  extras,
  tableData,
}) => {
  const headerRef = useRef(null);

  return (
    <>
      <Dialog
        initialFocus={headerRef}
        open={showTableModal}
        onClose={() => closeTableModal()}
      >
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-40 bg-black-text opacity-70 ${
            !showTableModal ? 'hidden' : ''
          }`}
        />
        <div className="fixed bottom-0 left-[50%] right-4 top-[50%] z-50 mx-auto h-[calc(100%-20px)] max-h-[740px] w-[calc(100%-20px)] max-w-[722px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white">
          <Dialog.Panel>
            <XMarkIcon
              className="absolute right-2 top-4 z-50 h-6 w-6 cursor-pointer stroke-2 text-black-text md:top-6"
              onClick={() => {
                closeTableModal();
              }}
            />
            <div className="absolute bottom-4 left-2 right-0 top-10 flex flex-1 flex-col justify-stretch md:left-6 md:right-6">
              <div className="overflow-y-scroll md:overflow-y-auto">
                <div ref={headerRef} className="mb-6 pr-2 text-h4-desktop">
                  {headerText}
                </div>
                <div className="max-w-[560px] pr-2 text-p2-desktop">
                  {bodyText}
                </div>
                <ContentTable
                  className={'w-[calc(100%)]'}
                  tableData={tableData}
                />
                {extras}
                <Button
                  className="float-right mr-2 mt-8 h-[40px] px-12 text-component-large font-normal"
                  label="Close"
                  onClick={() => {
                    closeTableModal();
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

export default TableModal;
