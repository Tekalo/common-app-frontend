import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import LoadingSpinner from '@/modules/components/loadingSpinner/LoadingSpinner';
import { FileUploadState } from '../FileUpload';

interface IUploadingSpinner {
  uploadState: FileUploadState;
}

const UploadingSpinner: React.FC<IUploadingSpinner> = ({ uploadState }) => {
  const operationName =
    uploadState === FileUploadState.UPLOADING
      ? APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.actions.uploading
      : APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.actions.removing;

  return (
    <div data-name="file-is-uploading" className="flex">
      <div data-name="spinner-container" className="mr-2">
        <LoadingSpinner size={18} />
      </div>
      <span className="text-gray-1">{` ${operationName}`}</span>
    </div>
  );
};

export default UploadingSpinner;
