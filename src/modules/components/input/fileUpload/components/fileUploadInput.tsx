import { FileUploadState } from '@/components/input/fileUpload/FileUpload';
import { IFileUploadContext } from '@/lib/providers/fileUploadProvider/fileUploadProvider';

interface IFileUploadInput {
  errorFileTooLarge: (f: File) => void;
  errorInvalidFileSignature: (f: File) => void;
  fileUploadCtx: IFileUploadContext;
  setFieldErrors: (errs: string[]) => void;
  setValidPreUploadValue: (f: File) => void;
  uploadInputId: string;
  uploadState: FileUploadState;
}

const FileUploadInput: React.FC<IFileUploadInput> = ({
  errorFileTooLarge,
  errorInvalidFileSignature,
  fileUploadCtx,
  setFieldErrors,
  setValidPreUploadValue,
  uploadInputId,
  uploadState,
}) => {
  const fiveMB = 5242880;

  return (
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
            errorFileTooLarge(upFile);
          } else if (fileIsInvalid) {
            errorInvalidFileSignature(upFile);
          } else {
            setValidPreUploadValue(upFile);
          }
        }

        return;
      }}
    />
  );
};

export default FileUploadInput;
