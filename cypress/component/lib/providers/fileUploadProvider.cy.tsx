import {
  resumeUploadCompleteEndpoint,
  resumeUploadRequestEndpoint,
} from '@/lib/helpers/apiHelpers';
import FileUploadProvider, {
  FileUploadContext,
  IFileUploadRequestResponse,
} from '@/lib/providers/fileUploadProvider';
import { Interception } from 'cypress/types/net-stubbing';
import React, { useContext } from 'react';

describe('FileUploadProvider', () => {
  let mockFile: File;
  const mockFileId = 123;
  const mockSignedLink = 'http://www.exampleuploadurl.com/';
  const mockFileName = 'exampleFile.pdf';
  const mockFileType = 'applicaiton/pdf';
  const mockFileContents = '123';

  it('should make file upload request', (done) => {
    mockFile = new File([mockFileContents], mockFileName, {
      type: mockFileType,
    });

    const mockUploadRequestResponse: IFileUploadRequestResponse = {
      id: mockFileId,
      signedLink: mockSignedLink,
    };

    const MockComponent: React.FC = () => {
      const context = useContext(FileUploadContext);

      context.uploadFile(mockFile).then((res) => {
        expect(res.isSuccess).to.equal(true);
        expect(res.fileId).to.equal(mockFileId);
      });

      return <></>;
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy.stub().callsFake((req) => {
        req.reply(mockUploadRequestResponse);
      })
    ).as('uploadRequested');

    cy.intercept(
      {
        method: 'PUT',
        url: mockSignedLink,
      },
      cy.stub().callsFake((res) => res.reply({ status: 200 }))
    ).as('fileUploaded');

    cy.intercept(
      {
        method: 'POST',
        url: resumeUploadCompleteEndpoint.replace(
          '{{FILE_ID}}',
          mockFileId.toString()
        ),
      },
      cy.stub().callsFake((res) => {
        res.reply({ ok: true });
      })
    ).as('uploadCompleted');

    cy.mount(
      <FileUploadProvider>
        <MockComponent />
      </FileUploadProvider>
    );

    cy.wait(['@uploadRequested', '@fileUploaded', '@uploadCompleted']).then(
      (intercepts: Interception[]) => {
        // Check upload request
        const uploadRequestBody = intercepts[0].request.body;

        expect(uploadRequestBody.contentType).to.equal(mockFileType);
        expect(uploadRequestBody.originalFilename).to.equal(mockFileName);

        // Check aws file upload
        const fileUploadRequestBody = intercepts[1].request.body;
        const fileUploadRequestHeaders = intercepts[1].request.headers;

        expect(fileUploadRequestBody).to.equal(mockFileContents);
        expect(fileUploadRequestHeaders['content-type']).to.equal(mockFileType);

        // Check complete
        const completeRequestBody = intercepts[2].request.body;

        expect(completeRequestBody.status).to.equal('SUCCESS');

        done();
      }
    );
  });

  // TODO: Tests where the services fail

  it('should make file deletion request', (done) => {
    const MockComponent: React.FC = () => {
      const context = useContext(FileUploadContext);

      context.deleteFile(mockFileId).then((res) => {
        expect(res.ok).to.equal(true);
        done();
      });

      return <></>;
    };

    cy.mount(
      <FileUploadProvider>
        <MockComponent />
      </FileUploadProvider>
    );
  });
});
