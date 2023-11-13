import { CircledXSvg } from '@/lib/constants/svgs';

interface IRemoveFileBtn {
  removeUploadedFile: () => void;
}

const RemoveFileBtn: React.FC<IRemoveFileBtn> = ({ removeUploadedFile }) => {
  return (
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
};

export default RemoveFileBtn;
