import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import { FileUploadState } from '@/components/input/fileUpload/FileUpload';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { CircledXSvg, FileSvg } from '@/lib/constants/svgs';
import { UploadedFileType } from '@/lib/types';

export interface IFileUploadControls {
  removeUploadedFile: () => void;
  uploadInputId: string;
  uploadState: FileUploadState;
  uploadValue: UploadedFileType | undefined;
}

const FileUploadControls: React.FC<IFileUploadControls> = ({
  removeUploadedFile,
  uploadInputId,
  uploadState,
  uploadValue,
}) => {
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

  return (
    <div data-name="file-uploader" className="flex min-h-[40px] items-center">
      <div
        data-name="description-section"
        className="mr-4 flex-1 overflow-hidden text-component-small text-black-text"
      >
        {getDescriptionSection()}
      </div>
      {getActionSection()}
    </div>
  );
};

export default FileUploadControls;
