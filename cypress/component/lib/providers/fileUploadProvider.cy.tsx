import FileUploadProvider, {
  FileUploadContext,
} from '@/lib/providers/fileUploadProvider';
import React, { useContext } from 'react';

describe('FileUploadProvider', () => {
  let file: File;
  const fileId = 'EXAMPLE_FILE_ID';

  it('should make file upload request', (done) => {
    file = new File([], 'exampleFile.pdf');

    const MockComponent: React.FC = () => {
      const context = useContext(FileUploadContext);

      context.uploadFile(file).then((res) => {
        expect(res.ok).to.equal(true);
        expect(res.fileId).to.equal(fileId);
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

  it('should make file deletion request', (done) => {
    const MockComponent: React.FC = () => {
      const context = useContext(FileUploadContext);

      context.deleteFile(fileId).then((res) => {
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
