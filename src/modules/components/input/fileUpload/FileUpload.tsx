import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Tooltip from '@/components/tooltip/Tooltip';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { CircledXSvg, FileSvg } from '@/lib/constants/svgs';
import { FileUploadContext } from '@/lib/providers/fileUploadProvider';
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
  // TODO: How do we handle when users come back?
  // Will we have to retrieve the file name for display in the uploader?
  // Will that be included in the form params?
  // If so, we will need to make the schema an object with two properties,
  // One with fileId and one with fileName
  const fileUploadCtx = useContext(FileUploadContext);

  const [fileToUpload, setFileToUpload] = useState<File>();
  const [uploadState, setUploadState] = useState<FileUploadState>(
    FileUploadState.INITIAL
  );
  const [uploadedFileId, setUploadedFileId] = useState<number>();

  const uploadInputId = `upload-button-${id}`;
  const fiveMB = 5242880;

  const errorHandler = () => {
    showUploadErrorModal();
    setUploadState(FileUploadState.INITIAL);
    clearUploadInput();
  };

  // Our file id (or url, not exactly sure which we'll be submitting here)
  // is our value, so whenever it changes, we should set the value in the form
  useEffect(() => {
    if (uploadedFileId && fileToUpload) {
      setValue({ id: uploadedFileId, fileName: fileToUpload.type });
    }
  }, [uploadedFileId]);

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
            if (response.isSuccess) {
              setUploadedFileId(response.fileId || undefined);
              setUploadState(FileUploadState.UPLOAD_COMPLETE);
            } else {
              errorHandler();
            }
          })
          .catch(errorHandler);
      }
    };

    if (fileToUpload) {
      onFileSelected();
    }
  }, [fileToUpload]);

  const removeUploadedFile = () => {
    setUploadState(FileUploadState.REMOVING);

    if (uploadedFileId) {
      fileUploadCtx
        .deleteFile(uploadedFileId)
        .then((res) => {
          if (res.ok) {
            setUploadedFileId(undefined);
            setFileToUpload(undefined);
            clearUploadInput();
            setUploadState(FileUploadState.INITIAL);
          } else {
            errorHandler();
          }
        })
        .catch(errorHandler);
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
          {fileToUpload?.name}
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

  return (
    <div className="space-y-2 text-left">
      <label className="mb-4 flex items-center text-component-extra-small text-black-text">
        <span data-name="label">{label}</span>
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>

      <div data-name="file-uploader" className="flex min-h-[40px] items-center">
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
        onChange={(e) => {
          if (e.target.files) {
            const fileToUpload = e.target.files[0];

            setFieldErrors([]);

            if (fileToUpload.size <= fiveMB) {
              setUploadState(FileUploadState.INITIAL);
              setFileToUpload(fileToUpload);
            } else {
              setUploadState(FileUploadState.INVALID_FILE);
              setFileToUpload(fileToUpload);
              setFieldErrors([
                APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.errors
                  .tooLarge,
              ]);
            }
          }

          return;
        }}
      />
    </div>
  );
};

export default FileUpload;
