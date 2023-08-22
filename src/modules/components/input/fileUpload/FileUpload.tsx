import Tooltip from '@/components/tooltip/Tooltip';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { FileUploadContext } from '@/lib/providers/fileUploadProvider';
import { UploadedFileType } from '@/lib/types';
import FileUploadControls from '@/modules/components/input/fileUpload/FileUploadControls';
import { useContext, useEffect, useState } from 'react';

export enum FileUploadState {
  INITIAL = 1,
  UPLOADING,
  REMOVING,
  INVALID_FILE,
  UPLOAD_COMPLETE,
}

export interface IFileUpload {
  id: string;
  initialValue: UploadedFileType | undefined;
  label: string;
  setFieldErrors: (errs: string[]) => void;
  setValue: (val: UploadedFileType) => void;
  showUploadErrorModal: () => void;
  tooltipText?: string;
}

const FileUpload: React.FC<IFileUpload> = ({
  id,
  initialValue,
  label,
  setFieldErrors,
  setValue,
  showUploadErrorModal,
  tooltipText,
}) => {
  const fileUploadCtx = useContext(FileUploadContext);

  const [fileToUpload, setFileToUpload] = useState<File>();
  const [uploadState, setUploadState] = useState<FileUploadState>(
    FileUploadState.INITIAL
  );
  const [uploadValue, setUploadValue] = useState<UploadedFileType>();

  const uploadInputId = `upload-button-${id}`;
  const fiveMB = 5242880;

  const uploadErrorHandler = () => {
    showUploadErrorModal();
    setUploadState(FileUploadState.INITIAL);
    clearUploadInput();
  };

  // Our file id and name are our values, so whenever they change,
  // we should set the value in the form
  useEffect(() => {
    if (uploadValue?.id && uploadValue.originalFilename) {
      setValue({
        id: uploadValue.id,
        originalFilename: uploadValue.originalFilename,
      });
    } else {
      // Clear value
      setValue({} as UploadedFileType);
    }
  }, [uploadValue]);

  useEffect(() => {
    if (initialValue && initialValue.originalFilename && initialValue.id) {
      setUploadValue({
        id: initialValue.id,
        originalFilename: initialValue.originalFilename,
      });
      setUploadState(FileUploadState.UPLOAD_COMPLETE);
    }
  }, [initialValue]);

  // When a file is selected to upload
  // and we are not in an error state
  // then upload it
  useEffect(() => {
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
            uploadErrorHandler();
          }
        })
        .catch(uploadErrorHandler);
    }
  }, [fileToUpload]);

  const removeUploadedFile = () => {
    setUploadState(FileUploadState.REMOVING);

    if (uploadValue) {
      setUploadValue(undefined);
      setFileToUpload(undefined);
      clearUploadInput();
      setUploadState(FileUploadState.INITIAL);
    }
  };

  const clearUploadInput = () => {
    (document.getElementById(uploadInputId) as HTMLInputElement).value = '';
  };

  const setInvalidFileState = (upFile: File): void => {
    setUploadState(FileUploadState.INVALID_FILE);
    setFileToUpload(upFile);
    setUploadValue({ originalFilename: upFile.name, id: 0 });
  };

  return (
    <div className="space-y-2 text-left">
      <label className="mb-4 flex items-center text-component-extra-small text-black-text">
        <span data-name="label">{label}</span>
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>

      <FileUploadControls
        removeUploadedFile={removeUploadedFile}
        uploadInputId={uploadInputId}
        uploadState={uploadState}
        uploadValue={uploadValue}
      />

      <input
        id={uploadInputId}
        accept=".pdf,.docx,.png,.jpeg,.jpg"
        multiple={false}
        type="file"
        disabled={uploadState === FileUploadState.UPLOADING}
        className="hidden"
        onChange={async (e) => {
          if (e.target.files) {
            const upFile = e.target.files[0];

            setFieldErrors([]);
            const fileIsInvalid = !(await fileUploadCtx.validateFile(upFile));

            if (upFile.size > fiveMB) {
              // File too large
              setInvalidFileState(upFile);
              setFieldErrors([
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors
                  .tooLarge,
              ]);
            } else if (fileIsInvalid) {
              // Invalid file signature
              setInvalidFileState(upFile);
              setFieldErrors([
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors.invalid,
              ]);
            } else {
              // Valid!
              setUploadState(FileUploadState.INITIAL);
              setFileToUpload(upFile);
              setUploadValue({ originalFilename: upFile.name, id: 0 });
            }
          }

          return;
        }}
      />
    </div>
  );
};

export default FileUpload;
