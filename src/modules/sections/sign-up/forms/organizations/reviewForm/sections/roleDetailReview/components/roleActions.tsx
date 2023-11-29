import { EditSVG } from '@/lib/constants/svgs';
import { NewRoleType } from '@/lib/types';

interface IRoleActionsSection {
  handleDeleteRole: (idx: number) => void;
  handleGoToRole: (idx: number) => void;
  idx: number;
  orgRoles: NewRoleType[];
}

const RoleActionsSection: React.FC<IRoleActionsSection> = ({
  handleDeleteRole,
  handleGoToRole,
  idx,
  orgRoles,
}) => {
  return (
    <div className="flex space-x-4">
      <div
        className="mt-6 flex cursor-pointer flex-row space-x-2 align-middle text-component-small text-blue-1"
        onClick={() => handleGoToRole(idx)}
      >
        <div>{`Edit Role ${idx + 1}`}</div>
        <div>{EditSVG}</div>
      </div>
      {orgRoles.length > 1 && (
        <div
          className="mt-6 flex cursor-pointer flex-row space-x-2 align-middle text-component-small text-red-error"
          onClick={() => handleDeleteRole(idx)}
        >
          <div>{'Delete this role'}</div>
        </div>
      )}
    </div>
  );
};

export default RoleActionsSection;
