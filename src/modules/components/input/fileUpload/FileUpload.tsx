import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import Tooltip from '@/components/tooltip/Tooltip';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { useState } from 'react';

interface IFileUpload {
  id: string;
  initialValue: string | undefined;
  label: string;
  tooltipText?: string;
}

const FileUpload: React.FC<IFileUpload> = ({
  id,
  initialValue,
  label,
  tooltipText,
}) => {
  const [uploadFile, setUploadFile] = useState<File>();
  const uploadButtonId = `upload-button-${id}`;

  const onFileSelected = () => {
    console.log('File Selected');
  };

  return (
    <div className="space-y-2 text-left">
      <label className="mb-4 flex items-center text-component-extra-small">
        <span data-name="label">{label}</span>
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>
      <div data-name="file-uploader" className="flex">
        <div className="mr-4 text-component-small">
          {APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.supportedFormats}
        </div>

        <Button
          label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.selectFileBtn}
          variant={ButtonVariant.OUTLINED}
          className="h-10 max-h-[40px] min-w-[115px]"
          onClick={() => {
            document.getElementById(uploadButtonId)?.click();
          }}
        ></Button>
        <input
          id={uploadButtonId}
          accept=".pdf,.docx,.png,.jpeg,.jpg"
          multiple={false}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              const fileToUpload = e.target.files[0];

              // Do size and type checking here

              setUploadFile(fileToUpload);
              onFileSelected();
            }

            return;
          }}
        />
      </div>
    </div>
  );
};

export default FileUpload;
