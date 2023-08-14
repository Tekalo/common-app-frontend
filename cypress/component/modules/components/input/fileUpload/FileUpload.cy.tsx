import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import {
  FileUploadContext,
  IFileUploadProvider,
} from '@/lib/providers/fileUploadProvider';
import FileUpload, {
  IFileUpload,
} from '@/modules/components/input/fileUpload/FileUpload';
import React from 'react';

const mockFileId = 123;

const MockFileUploadProvider: React.FC<IFileUploadProvider> = ({
  children,
}) => {
  return (
    <FileUploadContext.Provider
      value={{
        deleteFile: () => Promise.resolve({ ok: true }),
        uploadFile: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                isSuccess: true,
                fileId: mockFileId,
              });
            }, 1000);
          });
        },
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

Cypress.Commands.add('mountFileUpload', (props: IFileUpload) => {
  cy.mount(
    // TODO: We will replace this provider with a mock once we actually implement it
    // For now, it is basically already a mock in its current state
    <MockFileUploadProvider>
      <FileUpload
        id={props.id}
        initialValue={props.initialValue}
        label={props.label}
        setFieldErrors={props.setFieldErrors}
        setValue={props.setValue}
        showUploadErrorModal={props.showUploadErrorModal}
        tooltipText={props.tooltipText}
      ></FileUpload>
    </MockFileUploadProvider>
  );
});

describe('FileUpload', () => {
  const id = 'example-id';
  const label = 'Example Label';
  const fileName = 'exampleFile.pdf';

  let props: IFileUpload;

  beforeEach(() => {
    props = {
      id,
      initialValue: undefined,
      label,
      setFieldErrors: () => void {},
      setValue: () => void {},
      showUploadErrorModal: () => void {},
      tooltipText: undefined,
    };
  });

  it('should render', () => {
    cy.mountFileUpload(props);

    cy.get('span[data-name=label]').should('have.text', label);
    cy.get('span[data-name=file-format-message]')
      .should('be.visible')
      .should(
        'have.text',
        APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.supportedFormats
      );
    cy.get('#upload-file-button')
      .should('be.visible')
      .should(
        'have.text',
        APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.selectFileBtn
      );
  });

  it('should show uploading message when file is selected', () => {
    cy.mountFileUpload(props);

    // This is hidden so we have to force it
    cy.get('#upload-button-example-id').selectFile(
      {
        contents: [],
        fileName,
      },
      { force: true }
    );

    cy.get('div[data-name=file-is-uploading]').should('be.visible');
  });

  it('should display the file name and file remove button when file is selected', () => {
    cy.mountFileUpload(props);

    cy.get('#upload-button-example-id').selectFile(
      {
        contents: [],
        fileName,
      },
      { force: true }
    );

    cy.get('span[data-name=file-name]')
      .should('be.visible')
      .should('have.text', fileName);
    cy.get('button[data-name=remove-file-button]')
      .should('be.visible')
      .should('contain.text', 'Remove');
  });

  it('should remove an uploaded file', () => {
    cy.mountFileUpload(props);

    cy.get('#upload-button-example-id').selectFile(
      {
        contents: [],
        fileName,
      },
      { force: true }
    );

    cy.get('button[data-name=remove-file-button]').should('be.visible').click();

    cy.get('span[data-name=file-format-message]').should('be.visible');
    cy.get('#upload-file-button').should('be.visible');
  });

  it('should show an error message on uploading a file that is over 5MB', () => {
    cy.mountFileUpload(props);

    cy.get('#upload-button-example-id').selectFile(
      {
        contents: ['0'.repeat(10000000)],
        fileName,
      },
      { force: true }
    );

    cy.get('div[data-name=description-section] > div').should(
      'have.class',
      'text-gray-2'
    );
    cy.get('#upload-file-button').should('be.visible');
  });
});
