import { post, resumeUploadRequestEndpoint } from '@/lib/helpers/apiHelpers';
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

// AWS upload payload
export interface IFileUploadBody {
  file: string;
  type: string;
  signedLink: string;
}

// After AWS upload status and details
interface IFileUploadCompleteResponse {
  isSuccess: boolean;
  fileId?: number;
  fileName?: string;
}

interface IFileDeletionResponse {
  ok: boolean;
}

export interface IFileUploadContext {
  deleteFile: (id: string) => Promise<IFileDeletionResponse>;
  uploadFile: (file: File) => Promise<IFileUploadCompleteResponse>;
}

interface IFileUploadProvider {
  children: ReactNode;
}

export const FileUploadContext = React.createContext<IFileUploadContext>(
  {} as IFileUploadContext
);

const FileUploadProvider: React.FC<IFileUploadProvider> = ({ children }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const tmpDelay = 2000;

  /* TODO
    3. HIT COMPLETE ENDPOINT
    POST /applicants/me/uploads/:id/complete
    Body: { status: 'success' | 'failure' }
  */

  const requestFileUpload = async (file: File) => {
    const reqBody: IFileUploadRequestBody = {
      originalFilename: file.name,
      contentType: file.type,
    };

    return post(
      resumeUploadRequestEndpoint,
      reqBody,
      await getAccessTokenSilently()
    );
  };

  const uploadFileToAWS = async (
    file: File,
    uploadDetails: IFileUploadRequestResponse
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      fetch(uploadDetails.signedLink, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      }).then(async (res) => {
        resolve(res.status === 200);
      });
    });
  };

  const uploadFile = async (file: File) => {
    const failureResponse: IFileUploadCompleteResponse = { isSuccess: false };

    try {
      const res = await requestFileUpload(file);
      const uploadRequestBody =
        (await res.json()) as IFileUploadRequestResponse;
      const isSuccess = await uploadFileToAWS(file, uploadRequestBody);

      if (isSuccess) {
        return { isSuccess, fileId: uploadRequestBody.id };
      } else {
        return failureResponse;
      }
    } catch {
      return failureResponse;
    }
  };

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
