import Faq from '@/components/faq/Faq';
import { NewRoleType } from '@/lib/types';
import RoleDetailSection from './components/detailsSection';
import RoleEssaysSection from './components/essaysSection';
import RoleInfoSection from './components/infoSection';
import RoleActionsSection from './components/roleActions';

export interface IRoleDetailReview {
  handleDeleteRole: (idx: number) => void;
  handleGoToRole: (idx: number) => void;
  orgRoles: NewRoleType[];
}

const RoleDetailReview: React.FC<IRoleDetailReview> = ({
  orgRoles,
  handleGoToRole,
  handleDeleteRole,
}) => {
  const renderRow = (label: string, propertyName: string, data?: string) =>
    data ? (
      <div
        className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-1"
        id={propertyName}
      >
        <span className="text-component-large text-black-text">{label}</span>
        <span className="">{data}</span>
      </div>
    ) : (
      <></>
    );

  const renderRole = (role: NewRoleType, idx: number) => {
    return (
      <div className="mt-6">
        <RoleDetailSection idx={idx} renderRow={renderRow} role={role} />
        <RoleInfoSection idx={idx} renderRow={renderRow} role={role} />
        <RoleEssaysSection role={role} />
        <RoleActionsSection
          handleDeleteRole={handleDeleteRole}
          handleGoToRole={handleGoToRole}
          idx={idx}
          orgRoles={orgRoles}
        />
      </div>
    );
  };

  const faqItems = orgRoles.map((role, idx) => ({
    questionText: `Role ${idx + 1}`,
    extras: renderRole(role, idx),
  }));

  return <Faq faqItems={faqItems} />;
};

export default RoleDetailReview;
