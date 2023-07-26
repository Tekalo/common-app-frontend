import React, { ReactNode } from 'react';

interface IFileUploadResponse {
  ok: boolean;
  fileId: string;
}

interface IFileDeletionResponse {
  ok: boolean;
}

interface IFileUploadContext {
  deleteFile: (id: string) => Promise<IFileDeletionResponse>;
  uploadFile: (file: File) => Promise<IFileUploadResponse>;
}

interface IFileUploadProvider {
  children: ReactNode;
}

export const FileUploadContext = React.createContext<IFileUploadContext>(
  {} as IFileUploadContext
);

const FileUploadProvider: React.FC<IFileUploadProvider> = ({ children }) => {
  const tmpDelay = 2000;
  const tmpFileId = 'EXAMPLE_FILE_ID';

  const uploadFile = () =>
    new Promise<IFileUploadResponse>((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, fileId: tmpFileId });
      }, tmpDelay);
    });

  const deleteFile = () =>
    new Promise<IFileDeletionResponse>((resolve) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, tmpDelay);
    });

  return (
    <FileUploadContext.Provider
      value={{
        deleteFile,
        uploadFile,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadProvider;
