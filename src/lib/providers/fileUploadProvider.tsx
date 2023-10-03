import {
  post,
  resumeUploadCompleteEndpoint,
  resumeUploadRequestEndpoint,
} from '@/lib/helpers/apiHelpers';
import { useAuth0 } from '@auth0/auth0-react';
import fileTypeChecker from 'file-type-checker';
import React from 'react';
import { IProvider } from './shared';

// To request file upload
interface IFileUploadRequestBody {
  originalFilename: string;
  contentType: string;
}

// Response from upload request
export interface IFileUploadRequestResponse {
  id: number;
  signedLink: string;
}

// After AWS upload status and details
export interface IFileUploadCompleteResponse {
  isSuccess: boolean;
  fileId?: number;
}

export interface IFileDeletionResponse {
  ok: boolean;
}

export interface IFileUploadContext {
  uploadFile: (file: File) => Promise<IFileUploadCompleteResponse>;
  validateFile: (file: File) => Promise<boolean>;
}

export const FileUploadContext = React.createContext<IFileUploadContext>(
  {} as IFileUploadContext
);

const FileUploadProvider: React.FC<IProvider> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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

  const requestFileUpload = async (file: File): Promise<Response> => {
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
    }).then(
      async (res) => {
        return res.status === 200;
      },
      async () => {
        return false;
      }
    );
  };

  const uploadFile = async (file: File) => {
    const failureResponse: IFileUploadCompleteResponse = { isSuccess: false };

    try {
      // Request upload
      const requestUploadResponse = await requestFileUpload(file);

      // Upload file to presigned url
      const uploadRequestBody =
        (await requestUploadResponse.json()) as IFileUploadRequestResponse;
      // AWS upload will never throw an uncaught error, it should always return
      // false if something goes wrong so we can update the status below
      const awsUploadSuccess = await uploadFileToAWS(file, uploadRequestBody);

      // Mark with status
      const statusResponseSuccess = (
        await markUploadStatus(awsUploadSuccess, uploadRequestBody.id)
      ).ok;

      const successResponse = {
        isSuccess: awsUploadSuccess,
        fileId: uploadRequestBody.id,
      };

      return awsUploadSuccess && statusResponseSuccess
        ? successResponse
        : failureResponse;
    } catch {
      return failureResponse;
    }
  };

  const validateDocxSignature = (fileContents: ArrayBuffer): boolean => {
    const docxSignature = [0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00];
    const uint8Array = new Uint8Array(fileContents);

    return docxSignature.every((byte, index) => byte === uint8Array[index]);
  };

  const validateFile = async (file: File): Promise<boolean> => {
    // .pdf,.docx,.png,.jpeg,.jpg
    const acceptedTypes = ['jpeg', 'png', 'pdf'];

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContents = reader.result as ArrayBuffer;

        const docxMimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        if (file.type === docxMimeType) {
          // The library can't validate the signatures of .docx files
          // so we have to manually validate it
          // https://www.garykessler.net/library/file_sigs.html
          resolve(validateDocxSignature(fileContents));
        } else {
          resolve(
            fileTypeChecker.validateFileType(fileContents, acceptedTypes)
          );
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <FileUploadContext.Provider
      value={{
        uploadFile,
        validateFile,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadProvider;
