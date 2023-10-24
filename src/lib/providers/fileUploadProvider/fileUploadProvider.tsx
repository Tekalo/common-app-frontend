import {
  post,
  resumeUploadCompleteEndpoint,
  resumeUploadRequestEndpoint,
} from '@/lib/helpers/apiHelpers';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { IProvider } from '../shared';
import FileValidator from './fileValidator';

// To request file upload
interface IFileUploadRequestBody {
  originalFilename: string;
  contentType: string;
}

// Response from upload request
export interface IFileUploadRequestResponse {
  id: number;
  signedLink: string;
  presignedPost: PresignedPost;
}

interface PresignedPost {
  url: string;
  fields: PresignedPostFields;
}

export interface PresignedPostFields {
  acl: string;
  bucket: string;
  'Content-Type': string;
  key: string;
  Policy: string;
  'X-Amz-Algorithm': string;
  'X-Amz-Credential': string;
  'X-Amz-Date': string;
  'x-amz-meta-upload-id': string;
  'x-amz-meta-uploaded-by-applicant-id': string;
  'X-Amz-Security-Token': string;
  'X-Amz-Signature': string;
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
  const fileValidator = new FileValidator();

  const mapFormData = (
    file: File,
    uploadDetails: IFileUploadRequestResponse
  ): FormData => {
    const formData = new FormData();
    const postFields = uploadDetails.presignedPost.fields;
    let key: keyof PresignedPostFields;

    for (key in postFields) {
      formData.append(key, postFields[key]);
    }

    formData.append('file', file);

    return formData;
  };

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
    const formData = mapFormData(file, uploadDetails);

    return fetch(uploadDetails.presignedPost.url, {
      method: 'POST',
      body: formData,
    }).then(
      async (res) => {
        return res.status >= 200 && res.status < 300;
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

  return (
    <FileUploadContext.Provider
      value={{
        uploadFile,
        validateFile: fileValidator.validateFile,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadProvider;
