import { getMockAuth0Context, mockAuthToken } from '@/cypress/fixtures/mocks';
import {
  resumeUploadCompleteEndpoint,
  resumeUploadRequestEndpoint,
} from '@/lib/helpers/api/apiHelpers';
import FileUploadProvider, {
  FileUploadContext,
  IFileUploadCompleteResponse,
  IFileUploadRequestResponse,
  PresignedPostFields,
} from '@/lib/providers/fileUploadProvider/fileUploadProvider';
import { Auth0Context, Auth0ContextInterface, User } from '@auth0/auth0-react';
import { Interception } from 'cypress/types/net-stubbing';
import * as FileTypeCheckerModule from 'file-type-checker';
import React, { useContext } from 'react';

describe('FileUploadProvider', () => {
  // readonly
  const mockFileContents = '123';
  const mockFileId = 123;
  const mockFileName = 'exampleFile.pdf';
  const mockFileType = 'application/pdf';
  const mockSignedLink = 'http://www.exampleuploadurl.com/';
  const mockUrl = 'mockUrl';
  const multipartSignature = 'multipart/form-data;';

  const MockComponent: React.FC<{ action: 'upload' | 'validate' }> = ({
    action,
  }) => {
    const context = useContext(FileUploadContext);

    switch (action) {
      case 'upload':
        context.uploadFile(mockFile).then(componentUploadCheckFn);
        break;
      case 'validate':
        context.validateFile(mockFile).then(componentValidationCheckFn);
        break;
    }

    return <></>;
  };

  // Things you can change per-test
  let mockAuth0Context: Auth0ContextInterface<User>;
  let componentUploadCheckFn: (res: IFileUploadCompleteResponse) => void;
  let componentValidationCheckFn: (res: boolean) => void;
  let mockFile: File;
  let mockUploadRequestResponse: IFileUploadRequestResponse;

  Cypress.Commands.add('mountFileUploadProvider', (action, auth0Context) => {
    cy.mount(
      <Auth0Context.Provider value={auth0Context}>
        <FileUploadProvider>
          <MockComponent action={action} />
        </FileUploadProvider>
      </Auth0Context.Provider>
    );
  });

  beforeEach(() => {
    mockUploadRequestResponse = {
      id: mockFileId,
      signedLink: mockSignedLink,
      presignedPost: {
        url: 'mockUrl',
        fields: {
          acl: 'acl',
          'Content-Type': mockFileType,
          'x-amz-meta-uploaded-by-applicant-id': '359',
          'x-amz-meta-upload-id': '502',
          bucket: 'capp-dev-api-uploads',
          'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
          'X-Amz-Credential': 'credential',
          'X-Amz-Date': 'date',
          'X-Amz-Security-Token': 'token',
          key: 'resumes/359/502.jpeg',
          Policy: 'policy',
          'X-Amz-Signature': 'signature',
        },
      },
    };

    mockFile = new File([mockFileContents], mockFileName, {
      type: mockFileType,
    });

    mockAuth0Context = getMockAuth0Context();
    mockAuth0Context.isAuthenticated = true;
  });

  it('should make file upload request', () => {
    componentUploadCheckFn = (res) => {
      expect(res.isSuccess).to.equal(true);
      expect(res.fileId).to.equal(mockFileId);
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy.stub().callsFake((req) => {
        req.reply(mockUploadRequestResponse);
      })
    ).as('uploadRequested');

    cy.intercept(
      {
        method: 'POST',
        url: mockUrl,
      },
      cy.stub().callsFake((res) => res.reply({ statusCode: 204 }))
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

    cy.mountFileUploadProvider('upload', mockAuth0Context);

    cy.wait(['@uploadRequested', '@fileUploaded', '@uploadCompleted']).then(
      (intercepts: Interception[]) => {
        // Check upload request
        const uploadRequestBody = intercepts[0].request.body;

        expect(uploadRequestBody.contentType).to.equal(mockFileType);
        expect(uploadRequestBody.originalFilename).to.equal(mockFileName);
        expect(intercepts[0].request.headers.authorization).to.equal(
          `Bearer ${mockAuthToken}`
        );

        // // Check aws file upload
        const fileUploadRequestBody = intercepts[1].request.body;
        const fileUploadRequestHeaders = intercepts[1].request.headers;

        checkMultipartFormValues(
          mockUploadRequestResponse.presignedPost.fields,
          fileUploadRequestBody
        );

        expect(fileUploadRequestHeaders['content-type']).to.include(
          multipartSignature
        );

        // Check complete
        const completeRequestBody = intercepts[2].request.body;

        expect(completeRequestBody.status).to.equal('SUCCESS');
      }
    );
  });

  it('should return failure response when the request to upload fails (bad status)', () => {
    mockAuth0Context.isAuthenticated = false;
    componentUploadCheckFn = (res) => {
      expect(res.isSuccess).to.equal(false);
      expect(res.fileId).to.equal(undefined);
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy
        .stub()
        .as('requestCall')
        .callsFake((req) => {
          req.reply({ statusCode: 500 });
        })
    ).as('uploadRequested');

    cy.mountFileUploadProvider('upload', mockAuth0Context);

    cy.wait('@uploadRequested').then((i: Interception) => {
      expect(i.request.headers.authorization).to.equal('');
      cy.get('@requestCall').should('have.been.calledOnce');
    });
  });

  it('should return failure response when AWS upload fails (bad status)', () => {
    mockAuth0Context.isAuthenticated = false;
    componentUploadCheckFn = (res) => {
      expect(res.isSuccess).to.equal(false);
      expect(res.fileId).to.equal(undefined);
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy
        .stub()
        .as('requestCall')
        .callsFake((req) => {
          req.reply(mockUploadRequestResponse);
        })
    ).as('uploadRequested');

    cy.intercept(
      {
        method: 'POST',
        url: mockUrl,
      },
      cy
        .stub()
        .as('uploadCall')
        .callsFake((res) => res.reply({ statusCode: 401 }))
    ).as('fileUploaded');

    cy.intercept(
      {
        method: 'POST',
        url: resumeUploadCompleteEndpoint.replace(
          '{{FILE_ID}}',
          mockFileId.toString()
        ),
      },
      cy
        .stub()
        .as('updateStatusCall')
        .callsFake((res) => {
          res.reply({ ok: true });
        })
    ).as('uploadCompleted');

    cy.mountFileUploadProvider('upload', mockAuth0Context);

    cy.wait(['@uploadRequested', '@fileUploaded', '@uploadCompleted']).then(
      (i: Interception[]) => {
        expect(i[2].request.body.status).to.equal('FAILURE');

        cy.get('@requestCall').should('have.been.calledOnce');
        cy.get('@uploadCall').should('have.been.calledOnce');
      }
    );
  });

  it('should return failure response when AWS upload fails (promise rejection)', () => {
    mockAuth0Context.isAuthenticated = false;
    componentUploadCheckFn = (res) => {
      expect(res.isSuccess).to.equal(false);
      expect(res.fileId).to.equal(undefined);
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy
        .stub()
        .as('requestCall')
        .callsFake((req) => {
          req.reply(mockUploadRequestResponse);
        })
    ).as('uploadRequested');

    cy.intercept(
      {
        method: 'POST',
        url: mockUrl,
      },
      { forceNetworkError: true }
    ).as('fileUploaded');

    cy.intercept(
      {
        method: 'POST',
        url: resumeUploadCompleteEndpoint.replace(
          '{{FILE_ID}}',
          mockFileId.toString()
        ),
      },
      cy
        .stub()
        .as('updateStatusCall')
        .callsFake((res) => {
          res.reply({ ok: true });
        })
    ).as('uploadCompleted');

    cy.mountFileUploadProvider('upload', mockAuth0Context);

    cy.wait(['@uploadRequested', '@fileUploaded', '@uploadCompleted']).then(
      (i: Interception[]) => {
        cy.get('@requestCall').should('have.been.calledOnce');

        expect(i[2].request.body.status).to.equal('FAILURE');
        expect(i[1].state).to.equal('Errored');
      }
    );
  });

  it('should fail when status call fails (reject)', () => {
    componentUploadCheckFn = (res) => {
      expect(res.isSuccess).to.equal(false);
      expect(res.fileId).to.equal(undefined);
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy.stub().callsFake((req) => {
        req.reply(mockUploadRequestResponse);
      })
    ).as('uploadRequested');

    cy.intercept(
      {
        method: 'POST',
        url: mockUrl,
      },
      cy.stub().callsFake((res) => res.reply({ statusCode: 204 }))
    ).as('fileUploaded');

    cy.intercept(
      {
        method: 'POST',
        url: resumeUploadCompleteEndpoint.replace(
          '{{FILE_ID}}',
          mockFileId.toString()
        ),
      },
      { forceNetworkError: true }
    ).as('uploadCompleted');

    cy.mountFileUploadProvider('upload', mockAuth0Context);

    cy.wait(['@uploadRequested', '@fileUploaded', '@uploadCompleted']).then(
      (intercepts: Interception[]) => {
        // Check upload request
        const uploadRequestBody = intercepts[0].request.body;

        expect(uploadRequestBody.contentType).to.equal(mockFileType);
        expect(uploadRequestBody.originalFilename).to.equal(mockFileName);
        expect(intercepts[0].request.headers.authorization).to.equal(
          `Bearer ${mockAuthToken}`
        );

        // Check aws file upload
        const fileUploadRequestBody = intercepts[1].request.body;
        const fileUploadRequestHeaders = intercepts[1].request.headers;

        checkMultipartFormValues(
          mockUploadRequestResponse.presignedPost.fields,
          fileUploadRequestBody
        );
        expect(fileUploadRequestHeaders['content-type']).to.include(
          multipartSignature
        );

        // Check complete
        const completeRequestBody = intercepts[2].request.body;

        expect(completeRequestBody.status).to.equal('SUCCESS');
      }
    );
  });

  it('should fail when status call fails (bad status)', () => {
    componentUploadCheckFn = (res) => {
      expect(res.isSuccess).to.equal(false);
      expect(res.fileId).to.equal(undefined);
    };

    cy.intercept(
      { method: 'POST', url: resumeUploadRequestEndpoint },
      cy.stub().callsFake((req) => {
        req.reply(mockUploadRequestResponse);
      })
    ).as('uploadRequested');

    cy.intercept(
      {
        method: 'POST',
        url: mockUrl,
      },
      cy.stub().callsFake((res) => res.reply({ statusCode: 204 }))
    ).as('fileUploaded');

    cy.intercept(
      {
        method: 'POST',
        url: resumeUploadCompleteEndpoint.replace(
          '{{FILE_ID}}',
          mockFileId.toString()
        ),
      },
      cy.stub().callsFake((req) => {
        req.reply({ statusCode: 500, ok: false });
      })
    ).as('uploadCompleted');

    cy.mountFileUploadProvider('upload', mockAuth0Context);

    cy.wait(['@uploadRequested', '@fileUploaded', '@uploadCompleted']).then(
      (intercepts: Interception[]) => {
        // Check upload request
        const uploadRequestBody = intercepts[0].request.body;

        expect(uploadRequestBody.contentType).to.equal(mockFileType);
        expect(uploadRequestBody.originalFilename).to.equal(mockFileName);
        expect(intercepts[0].request.headers.authorization).to.equal(
          `Bearer ${mockAuthToken}`
        );

        // Check aws file upload
        const fileUploadRequestBody = intercepts[1].request.body;
        const fileUploadRequestHeaders = intercepts[1].request.headers;

        checkMultipartFormValues(
          mockUploadRequestResponse.presignedPost.fields,
          fileUploadRequestBody
        );
        expect(fileUploadRequestHeaders['content-type']).to.include(
          multipartSignature
        );

        // Check complete
        const completeRequestBody = intercepts[2].request.body;

        expect(completeRequestBody.status).to.equal('SUCCESS');
      }
    );
  });

  it('should validate a file successfully', () => {
    const expectedResult = true;
    cy.stub(FileTypeCheckerModule, 'validateFileType')
      .as('fileLibCheck')
      .callsFake(() => expectedResult);
    componentValidationCheckFn = (res) => {
      expect(res).to.equal(expectedResult);
    };

    cy.mountFileUploadProvider('validate', mockAuth0Context);

    cy.get('@fileLibCheck').should('have.been.calledOnce');
  });

  it('should validate a file unsuccessfully', () => {
    const expectedResult = false;
    cy.stub(FileTypeCheckerModule, 'validateFileType')
      .as('fileLibCheck')
      .callsFake(() => expectedResult);
    componentValidationCheckFn = (res) => {
      expect(res).to.equal(expectedResult);
    };

    cy.mountFileUploadProvider('validate', mockAuth0Context);

    cy.get('@fileLibCheck').should('have.been.calledOnce');
  });

  it('should accept a docx file type', () => {
    const data = new Uint8Array([
      0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00,
    ]);
    mockFile = new File([data], mockFileName, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    cy.stub(FileTypeCheckerModule, 'validateFileType')
      .as('fileLibCheck')
      .callsFake(() => false);
    componentValidationCheckFn = (res) => {
      expect(res).to.equal(true);
    };

    cy.mountFileUploadProvider('validate', mockAuth0Context);

    cy.get('@fileLibCheck').should('not.have.been.called');
  });

  it('should reject a bad docx file', () => {
    const data = new Uint8Array([0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00]);
    mockFile = new File([data], mockFileName, {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    cy.stub(FileTypeCheckerModule, 'validateFileType')
      .as('fileLibCheck')
      .callsFake(() => true);
    componentValidationCheckFn = (res) => {
      expect(res).to.equal(false);
    };

    cy.mountFileUploadProvider('validate', mockAuth0Context);

    cy.get('@fileLibCheck').should('not.have.been.called');
  });
});

// I know this is hard to read but its a formData string now and this
// is the only way to check the values
function checkMultipartFormValues(
  expectedFields: PresignedPostFields,
  requestBody: string
): void {
  Object.entries(expectedFields).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];

    expect(requestBody).to.include(`name="${key}"\r\n\r\n${value}\r\n`);
  });
}
