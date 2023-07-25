import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Tooltip from '@/components/tooltip/Tooltip';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { CircledXSvg, FileSvg } from '@/lib/constants/svgs';
import { useEffect, useState } from 'react';

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
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [uploadIsCompleted, setUploadIsCompleted] = useState(false);

  const uploadButtonId = `upload-button-${id}`;
  const fiveMB = 5242880;

  useEffect(() => {
    const onFileSelected = () => {
      setFileIsUploading(true);

      // TODO: Upload service calls

      // TODO: Remove once service is in place
      setTimeout(() => {
        setFileIsUploading(false);
        setUploadIsCompleted(true);
      }, 2000);
    };

    console.log('uploadFile changed', uploadFile);

    if (uploadFile) {
      onFileSelected();
    }
  }, [uploadFile]);

  const getActionSection = (): JSX.Element => {
    const uploadFileButton = (
      <Button
        label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.selectFileBtn}
        variant={ButtonVariant.OUTLINED}
        className="h-10 max-h-[40px] min-w-[115px]"
        type="button"
        disabled={fileIsUploading}
        onClick={() => {
          document.getElementById(uploadButtonId)?.click();
        }}
      ></Button>
    );

    const deleteFileBtn = (
      <div
        className="mb-3 flex cursor-pointer items-center"
        onClick={() => {
          setUploadIsCompleted(false);
          (document.getElementById(uploadButtonId) as HTMLInputElement).value =
            '';
        }}
      >
        <span className="mr-2">
          <CircledXSvg height="14" width="14" color="#317BB5" />{' '}
        </span>
        <span className="text-component-small text-blue-1"> Remove</span>
      </div>
    );

    return uploadIsCompleted ? deleteFileBtn : uploadFileButton;
  };

  const getDescriptionSection = (): JSX.Element => {
    let content: JSX.Element;

    const uploadingSpinner = (
      <div data-name="file-is-uploading" className="flex">
        <div data-name="spinner-container" className="mr-2">
          <LoadingSpinner size={18} />
        </div>{' '}
        <span className="text-gray-1">Uploading</span>
      </div>
    );

    const supportedFormatMessage = (
      <>{APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.fileUpload.supportedFormats}</>
    );

    const fileInfo = (
      <div className="mb-3 flex items-center">
        <span className="mr-2">
          <FileSvg height="13" width="11" color="#272929" />
        </span>
        <span
          data-name="file-name"
          className="flex-[0_1_100%] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {uploadFile?.name}
        </span>
      </div>
    );

    if (fileIsUploading) {
      content = uploadingSpinner;
    } else if (uploadIsCompleted) {
      content = fileInfo;
    } else {
      content = supportedFormatMessage;
    }

    return content;
  };

  return (
    <div className="space-y-2 text-left">
      <label className="mb-4 flex items-center text-component-extra-small">
        <span data-name="label">{label}</span>
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>

      <div data-name="file-uploader" className="flex items-center">
        <div className="mr-4 flex-1 overflow-hidden text-component-small">
          {getDescriptionSection()}
        </div>
        {getActionSection()}
      </div>

      <input
        id={uploadButtonId}
        accept=".pdf,.docx,.png,.jpeg,.jpg"
        multiple={false}
        type="file"
        disabled={fileIsUploading}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            const fileToUpload = e.target.files[0];

            if (fileToUpload.size <= fiveMB) {
              setUploadFile(fileToUpload);
            } else {
              // TODO: Set size error
            }
          }

          return;
        }}
      />
    </div>
  );
};

export default FileUpload;
