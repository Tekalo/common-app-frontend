import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { UploadedFileType } from '@/lib/types';
import Tooltip from '@/modules/components/tooltip/Tooltip';
import { ReactElement } from 'react';
import { FileUploadState } from '../FileUpload';
import RemoveFileBtn from './removeFileBtn';
import UploadFileBtn from './uploadFileBtn';
import UploadFileInfo from './uploadFileInfo';
import UploadingSpinner from './uploadingSpinner';

interface IFileUploadWrapper {
  children: ReactElement;
  errors: string[];
  label: string;
  removeUploadedFile: () => void;
  tooltipText?: string;
  uploadInputId: string;
  uploadState: FileUploadState;
  uploadValue: UploadedFileType | undefined;
}

const FileUploadWrapper: React.FC<IFileUploadWrapper> = ({
  children,
  errors,
  label,
  removeUploadedFile,
  tooltipText,
  uploadInputId,
  uploadState,
  uploadValue,
}) => {
  const getDescriptionSection = (): JSX.Element => {
    const fileInfo = (
      <UploadFileInfo uploadState={uploadState} uploadValue={uploadValue} />
    );

    const supportedFormatMessage = (
      <span data-name="file-format-message">
        {APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.supportedFormats}
      </span>
    );

    const uploadingSpinner = <UploadingSpinner uploadState={uploadState} />;

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

  const getActionSection = (): JSX.Element => {
    const uploadFileButton = (
      <UploadFileBtn uploadInputId={uploadInputId} uploadState={uploadState} />
    );

    const removeFileBtn = (
      <RemoveFileBtn removeUploadedFile={removeUploadedFile} />
    );

    return uploadState === FileUploadState.UPLOAD_COMPLETE
      ? removeFileBtn
      : uploadFileButton;
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
      {children}
    </div>
  );
};

export default FileUploadWrapper;
