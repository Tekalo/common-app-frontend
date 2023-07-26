import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Tooltip from '@/components/tooltip/Tooltip';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { CircledXSvg, FileSvg } from '@/lib/constants/svgs';
import { useEffect, useState } from 'react';

enum FileUploadState {
  INITIAL = 1,
  UPLOADING,
  REMOVING,
  INVALID_FILE,
  UPLOAD_COMPLETE,
}

interface IFileUpload {
  id: string;
  initialValue: string | undefined;
  label: string;
  setFieldErrors: (errs: string[]) => void;
  tooltipText?: string;
}

const FileUpload: React.FC<IFileUpload> = ({
  id,
  initialValue,
  label,
  setFieldErrors,
  tooltipText,
}) => {
  const [uploadFile, setUploadFile] = useState<File>();
  const [uploadState, setUploadState] = useState<FileUploadState>(
    FileUploadState.INITIAL
  );

  const uploadButtonId = `upload-button-${id}`;
  const fiveMB = 5242880;
  // TODO: Remove
  const tmpTimeoutDelay = 2000;

  useEffect(() => {
    const onFileSelected = () => {
      if (uploadState !== FileUploadState.INVALID_FILE) {
        setUploadState(FileUploadState.UPLOADING);

        // TODO: Upload service calls

        // TODO: Remove once service is in place
        setTimeout(() => {
          setUploadState(FileUploadState.UPLOAD_COMPLETE);
        }, tmpTimeoutDelay);
      }
    };

    if (uploadFile) {
      onFileSelected();
    }
  }, [uploadFile]);

  const removeUploadedFile = () => {
    setUploadState(FileUploadState.REMOVING);

    // TODO: Remove
    setTimeout(() => {
      (document.getElementById(uploadButtonId) as HTMLInputElement).value = '';
      setUploadState(FileUploadState.INITIAL);
    }, tmpTimeoutDelay);
  };

  const getActionSection = (): JSX.Element => {
    const uploadFileButton = (
      <Button
        label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.selectFileBtn}
        variant={ButtonVariant.OUTLINED}
        className="h-10 max-h-[40px] min-w-[115px]"
        type="button"
        disabled={
          uploadState === FileUploadState.UPLOADING ||
          uploadState === FileUploadState.REMOVING
        }
        onClick={() => {
          document.getElementById(uploadButtonId)?.click();
        }}
      ></Button>
    );

    const removeFileBtn = (
      <button
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
      <>{APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.supportedFormats}</>
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
          {uploadFile?.name}
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
        <div className="mr-4 flex-1 overflow-hidden text-component-small text-black-text">
          {getDescriptionSection()}
        </div>
        {getActionSection()}
      </div>

      <input
        id={uploadButtonId}
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
              setUploadFile(fileToUpload);
            } else {
              // TODO: Set size error
              setUploadState(FileUploadState.INVALID_FILE);
              setUploadFile(fileToUpload);
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
