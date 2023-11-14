import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { FileUploadContext } from '@/lib/providers/fileUploadProvider/fileUploadProvider';
import { UploadedFileType } from '@/lib/types';
import { useContext, useEffect, useState } from 'react';
import FileUploadInput from './components/fileUploadInput';
import FileUploadWrapper from './components/fileUploadWrapper';

export enum FileUploadState {
  INITIAL = 1,
  UPLOADING,
  REMOVING,
  INVALID_FILE,
  UPLOAD_COMPLETE,
}

export interface IFileUpload {
  errors: string[];
  id: string;
  initialValue: UploadedFileType | undefined;
  label: string;
  tooltipText?: string;
  setFieldErrors: (errs: string[]) => void;
  setValue: (val: UploadedFileType) => void;
  showUploadErrorModal: () => void;
}

const FileUpload: React.FC<IFileUpload> = ({
  errors,
  id,
  initialValue,
  label,
  tooltipText,
  setFieldErrors,
  setValue,
  showUploadErrorModal,
}) => {
  const fileUploadCtx = useContext(FileUploadContext);

  const [fileToUpload, setFileToUpload] = useState<File>();
  const [uploadState, setUploadState] = useState<FileUploadState>(
    FileUploadState.INITIAL
  );
  const [uploadValue, setUploadValue] = useState<UploadedFileType>();

  const uploadInputId = `upload-button-${id}`;

  const errorHandler = () => {
    showUploadErrorModal();
    setUploadState(FileUploadState.INITIAL);
    clearUploadInput();
  };

  // Our file id and name is our value, so whenever it changes,
  // we should set the value in the form
  useEffect(() => {
    if (uploadValue?.id && uploadValue.originalFilename) {
      setValue(uploadValue);
    } else {
      // Clear value
      setValue({} as UploadedFileType);
    }
  }, [uploadValue]);

  useEffect(() => {
    if (initialValue && initialValue.originalFilename && initialValue.id) {
      setUploadValue(initialValue);
      setUploadState(FileUploadState.UPLOAD_COMPLETE);
    }
  }, [initialValue]);

  // When a file is selected to upload
  // and we are not in an error state
  // then upload it
  useEffect(() => {
    const onFileSelected = () => {
      if (fileToUpload && uploadState !== FileUploadState.INVALID_FILE) {
        setUploadState(FileUploadState.UPLOADING);

        fileUploadCtx
          .uploadFile(fileToUpload)
          .then((response) => {
            if (
              response.isSuccess &&
              response.fileId &&
              uploadValue?.originalFilename
            ) {
              setUploadValue({
                id: response.fileId,
                originalFilename: uploadValue.originalFilename,
              });
              setUploadState(FileUploadState.UPLOAD_COMPLETE);
            } else {
              errorHandler();
            }
          })
          .catch(errorHandler);
      }
    };

    onFileSelected();
  }, [fileToUpload]);

  const clearUploadInput = () => {
    (document.getElementById(uploadInputId) as HTMLInputElement).value = '';
  };

  const errorFileTooLarge = (upFile: File) => {
    setInvalidFileState(upFile);
    setFieldErrors([
      APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors.tooLarge,
    ]);
  };

  const errorInvalidFileSignature = (upFile: File) => {
    setInvalidFileState(upFile);
    setFieldErrors([
      APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors.invalid,
    ]);
  };

  const removeUploadedFile = () => {
    setUploadState(FileUploadState.REMOVING);

    if (uploadValue) {
      setUploadValue(undefined);
      setFileToUpload(undefined);
      clearUploadInput();
      setUploadState(FileUploadState.INITIAL);
    }
  };

  const setInvalidFileState = (upFile: File): void => {
    setUploadState(FileUploadState.INVALID_FILE);
    setFileToUpload(upFile);
    setUploadValue({ originalFilename: upFile.name, id: 0 });
  };

  const setValidPreUploadValue = (upFile: File) => {
    setUploadState(FileUploadState.INITIAL);
    setFileToUpload(upFile);
    setUploadValue({ originalFilename: upFile.name, id: 0 });
  };

  return (
    <FileUploadWrapper
      errors={errors}
      label={label}
      removeUploadedFile={removeUploadedFile}
      tooltipText={tooltipText}
      uploadInputId={uploadInputId}
      uploadState={uploadState}
      uploadValue={uploadValue}
    >
      <FileUploadInput
        errorFileTooLarge={errorFileTooLarge}
        errorInvalidFileSignature={errorInvalidFileSignature}
        fileUploadCtx={fileUploadCtx}
        setFieldErrors={setFieldErrors}
        setValidPreUploadValue={setValidPreUploadValue}
        uploadInputId={uploadInputId}
        uploadState={uploadState}
      />
    </FileUploadWrapper>
  );
};

export default FileUpload;
