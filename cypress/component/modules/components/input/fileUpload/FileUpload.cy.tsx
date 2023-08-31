import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import {
  FileUploadContext,
  IFileUploadProvider,
} from '@/lib/providers/fileUploadProvider';
import FileUpload, {
  IFileUpload,
} from '@/modules/components/input/fileUpload/FileUpload';
import { SinonSpy } from 'cypress/types/sinon';
import React from 'react';

const mockFileId = 123;
const mockFileName = 'example_resume.pdf';
let fileIsValid: boolean;
let setValueSpy: SinonSpy;

const MockFileUploadProvider: React.FC<IFileUploadProvider> = ({
  children,
}) => {
  return (
    <FileUploadContext.Provider
      value={{
        validateFile: async () => Promise.resolve(fileIsValid),
        uploadFile: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                isSuccess: true,
                fileId: mockFileId,
              });
            }, 50);
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
    setValueSpy = cy.stub().as('setValue');

    props = {
      id,
      initialValue: undefined,
      label,
      setFieldErrors: cy.stub().as('setFieldErrors'),
      setValue: setValueSpy,
      showUploadErrorModal: () => void {},
      tooltipText: undefined,
    };
    fileIsValid = true;
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

    cy.get('button[data-name=remove-file-button]')
      .should('be.visible')
      .fastClick();

    cy.get('span[data-name=file-format-message]').should('be.visible');
    cy.get('#upload-file-button').should('be.visible');
  });

  it('should enter error state on uploading a file that is over 5MB', () => {
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
    cy.get('@setFieldErrors')
      .should('have.callCount', 2)
      .should('have.been.calledWith', [])
      .should('have.been.calledWith', [
        APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors.tooLarge,
      ]);
  });

  it('should enter error state when file signature is not verified', () => {
    fileIsValid = false;
    cy.mountFileUpload(props);

    cy.get('#upload-button-example-id').selectFile(
      {
        contents: ['0'],
        fileName,
      },
      { force: true }
    );

    cy.get('div[data-name=description-section] > div').should(
      'have.class',
      'text-gray-2'
    );
    cy.get('#upload-file-button').should('be.visible');
    cy.get('@setFieldErrors')
      .should('have.callCount', 2)
      .should('have.been.calledWith', [])
      .should('have.been.calledWith', [
        APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors.invalid,
      ])
      .then(() => {
        assert(JSON.stringify(setValueSpy.getCall(1).args[0]) === '{}');
      });
  });

  it('should set correct values and display when file has already been uploaded', () => {
    props.initialValue = {
      originalFilename: mockFileName,
      id: mockFileId,
    };

    cy.mountFileUpload(props);

    cy.get('span[data-name=file-name]')
      .should('be.visible')
      .should('have.text', mockFileName);
    cy.get('button[data-name=remove-file-button]')
      .should('be.visible')
      .should('contain.text', 'Remove')
      .then(() => {
        const setCallArg = setValueSpy.getCall(1).args[0];

        assert(setCallArg.originalFilename === mockFileName);
        assert(setCallArg.id === mockFileId);
      });
  });
});
