import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRef } from 'react';
import Button from '../buttons/Button/Button';

export interface IPrivacyModal {
  isOpen: boolean;
  closeModal: () => void;
}

const PrivacyModal: React.FC<IPrivacyModal> = ({
  closeModal,
  isOpen: showModal,
}) => {
  let headerRef = useRef(null);
  const tableData = {
    headers: [
      {
        heading: '',
        subheading: '',
      },
      {
        heading: 'Data Type',
        subheading: 'What info we collect',
      },
      {
        heading: 'Uses',
        subheading: 'How we use the info',
      },
      {
        heading: 'Third Parties',
        subheading: 'Who can see the info',
      },
    ],
    content: [
      {
        heading: 'Info You provide',
        bullets: [
          ['Personal Info', 'Professional Info', 'Communications', 'Surveys'],
          [
            'Identify you and Operate [Name]',
            'Conduct Research and improve [Name]',
          ],
          ['Users', 'Other Matchmakers and Organziations', 'Service Providers'],
        ],
      },
      {
        heading: 'Info we observe',
        bullets: [
          [
            'Technical info (eg; browser device, IP, trackers, server logs)',
            'Usage and outcomes',
          ],
          [
            'Quality of Service',
            'Security',
            'Conduct Research and improve [Name]',
          ],
          ['Service Providers'],
        ],
      },
      {
        heading: 'Other sources',
        bullets: [
          [
            'Programs from Third-Party organizations',
            'Other Schmidt Futures Programs',
          ],
          ['Enable applicants to other programs to utilize [Name]'],
          ['Users', 'Matchmakers', 'Organizations', 'Service Providers'],
        ],
      },
    ],
  };

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
        <div className="fixed bottom-0 left-4 right-4 top-0 z-50 mx-auto  mb-12 mt-14 max-h-[728px] max-w-[722px] rounded-md bg-white">
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
                <div className="mt-8 w-full overflow-x-scroll pr-2 md:mt-3">
                  <table className="mb-4 w-[664px] border-separate border-spacing-x-0 border-spacing-y-[1px] rounded-md border-x border-gray-3 bg-gray-3">
                    <thead>
                      <tr className="bg-gray-4">
                        {tableData.headers.map((header, i) => (
                          <th key={i} className="py-4 text-left">
                            <div className="text-small-caption-mobile uppercase text-gray-1">
                              {header.heading}
                            </div>
                            <div className="text-component-small">
                              {header.subheading}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.content.map((contentRow, i) => (
                        <tr key={i} className="bg-white">
                          <td className="px-4 py-3 align-top text-small-caption-mobile uppercase text-gray-1">
                            {contentRow.heading}
                          </td>
                          {contentRow.bullets.map((bulletList, i) => (
                            <td
                              key={i}
                              className="px-4 py-3 align-top text-component-extra-small"
                            >
                              <ul className="list-disc pl-2 leading-6">
                                {bulletList.map((bp, i) => (
                                  <li key={i}>{bp}</li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
