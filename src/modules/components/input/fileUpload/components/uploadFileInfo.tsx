import { FileSvg } from '@/lib/constants/svgs';
import { UploadedFileType } from '@/lib/types';
import { FileUploadState } from '../FileUpload';

interface IUploadFileInfo {
  uploadState: FileUploadState;
  uploadValue: UploadedFileType | undefined;
}

const UploadFileInfo: React.FC<IUploadFileInfo> = ({
  uploadState,
  uploadValue,
}) => {
  const fileInfoColor =
    uploadState === FileUploadState.INVALID_FILE
      ? 'text-gray-2'
      : 'text-black-text';

  return (
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
};

export default UploadFileInfo;
