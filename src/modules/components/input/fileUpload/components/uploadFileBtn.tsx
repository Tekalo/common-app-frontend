import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import Button, {
  ButtonVariant,
} from '@/modules/components/buttons/Button/Button';
import { FileUploadState } from '@/modules/components/input/fileUpload/FileUpload';

interface IUploadFileBtn {
  uploadInputId: string;
  uploadState: FileUploadState;
}

const UploadFileBtn: React.FC<IUploadFileBtn> = ({
  uploadInputId,
  uploadState,
}) => {
  return (
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
};

export default UploadFileBtn;
