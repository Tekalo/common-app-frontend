import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Tooltip from '@/components/tooltip/Tooltip';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { CircledXSvg, FileSvg } from '@/lib/constants/svgs';
import { FileUploadContext } from '@/lib/providers/fileUploadProvider/fileUploadProvider';
import { UploadedFileType } from '@/lib/types';
import { useContext, useEffect, useState } from 'react';

enum FileUploadState {
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
  const fiveMB = 5242880;

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

  const getActionSection = (): JSX.Element => {
    const uploadFileButton = (
      <Button
        name="upload-file-button"
        label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.selectFileBtn}
        variant={ButtonVariant.OUTLINED}
        className="h-10 max-h-[40px] min-w-[115px]"
        type="button"
        disabled={
          uploadState === FileUploadState.UPLOADING ||
          uploadState === FileUploadState.REMOVING
        }
        onClick={() => {
          document.getElementById(uploadInputId)?.click();
        }}
      ></Button>
    );

    const removeFileBtn = (
      <button
        data-name="remove-file-button"
        className="flex cursor-pointer items-center"
        onClick={removeUploadedFile}
        type="button"
      >
        <span className="mr-2">
          <CircledXSvg height="14" width="14" color="#317BB5" />{' '}
        </span>
        <span className="text-component-small text-blue-1"> Remove</span>
      </button>
    );

    return uploadState === FileUploadState.UPLOAD_COMPLETE
      ? removeFileBtn
      : uploadFileButton;
  };

  const getDescriptionSection = (): JSX.Element => {
    const operationName =
      uploadState === FileUploadState.UPLOADING
        ? APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.actions.uploading
        : APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.actions.removing;

    const uploadingSpinner = (
      <div data-name="file-is-uploading" className="flex">
        <div data-name="spinner-container" className="mr-2">
          <LoadingSpinner size={18} />
        </div>{' '}
        <span className="text-gray-1">{operationName}</span>
      </div>
    );

    const supportedFormatMessage = (
      <span data-name="file-format-message">
        {APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.supportedFormats}
      </span>
    );

    const fileInfoColor =
      uploadState === FileUploadState.INVALID_FILE
        ? 'text-gray-2'
        : 'text-black-text';

    const fileInfo = (
      <div className={`flex items-center ${fileInfoColor}`}>
        <span className="mr-2">
          <FileSvg height="13" width="11" color={fileInfoColor} />
        </span>
        <span
          data-name="file-name"
          className="flex-[0_1_100%] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {uploadValue?.originalFilename}
        </span>
      </div>
    );

    if (
      uploadState === FileUploadState.UPLOADING ||
      uploadState === FileUploadState.REMOVING
    ) {
      return uploadingSpinner;
    } else if (
      uploadState === FileUploadState.UPLOAD_COMPLETE ||
      uploadState === FileUploadState.INVALID_FILE
    ) {
      return fileInfo;
    } else {
      return supportedFormatMessage;
    }
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

      <div
        data-name="file-uploader"
        aria-invalid={!!errors.length}
        className="flex min-h-[40px] items-center"
      >
        <div
          data-name="description-section"
          className="mr-4 flex-1 overflow-hidden text-component-small text-black-text"
        >
          {getDescriptionSection()}
        </div>
        {getActionSection()}
      </div>

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
