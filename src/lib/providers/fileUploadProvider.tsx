import {
  post,
  resumeUploadCompleteEndpoint,
  resumeUploadRequestEndpoint,
} from '@/lib/helpers/apiHelpers';
import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactNode } from 'react';

// To request file upload
interface IFileUploadRequestBody {
  originalFilename: string;
  contentType: string;
}

// Response from upload request
interface IFileUploadRequestResponse {
  id: number;
  signedLink: string;
}

// After AWS upload status and details
interface IFileUploadCompleteResponse {
  isSuccess: boolean;
  fileId?: number;
}

interface IFileDeletionResponse {
  ok: boolean;
}

export interface IFileUploadContext {
  deleteFile: (id: number) => Promise<IFileDeletionResponse>;
  uploadFile: (file: File) => Promise<IFileUploadCompleteResponse>;
}

export interface IFileUploadProvider {
  children: ReactNode;
}

export const FileUploadContext = React.createContext<IFileUploadContext>(
  {} as IFileUploadContext
);

const FileUploadProvider: React.FC<IFileUploadProvider> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const tmpDelay = 2000;

  const markUploadStatus = async (isSuccess: boolean, fileId: number) => {
    const authToken = isAuthenticated ? await getAccessTokenSilently() : '';
    const uploadCompleteEndpoint = resumeUploadCompleteEndpoint.replace(
      '{{FILE_ID}}',
      fileId.toString()
    );
    const reqBody = {
      status: isSuccess ? 'SUCCESS' : 'FAILURE',
    };

    return post(uploadCompleteEndpoint, reqBody, authToken);
  };

  const requestFileUpload = async (file: File) => {
    const authToken = isAuthenticated ? await getAccessTokenSilently() : '';
    const reqBody: IFileUploadRequestBody = {
      originalFilename: file.name,
      contentType: file.type,
    };

    return post(resumeUploadRequestEndpoint, reqBody, authToken);
  };

  const uploadFileToAWS = async (
    file: File,
    uploadDetails: IFileUploadRequestResponse
  ): Promise<boolean> => {
    return fetch(uploadDetails.signedLink, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    }).then(async (res) => {
      return res.status === 200;
    });
  };

  const uploadFile = async (file: File) => {
    const failureResponse: IFileUploadCompleteResponse = { isSuccess: false };

    try {
      // Request upload
      const res = await requestFileUpload(file);

      // Upload file to presigned url
      const uploadRequestBody =
        (await res.json()) as IFileUploadRequestResponse;
      const awsUploadSuccess = await uploadFileToAWS(file, uploadRequestBody);

      // Mark with status
      await markUploadStatus(awsUploadSuccess, uploadRequestBody.id);

      const successResponse = {
        isSuccess: awsUploadSuccess,
        fileId: uploadRequestBody.id,
      };

      return awsUploadSuccess ? successResponse : failureResponse;
    } catch {
      return failureResponse;
    }
  };

  const deleteFile = (fileId: number) =>
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
