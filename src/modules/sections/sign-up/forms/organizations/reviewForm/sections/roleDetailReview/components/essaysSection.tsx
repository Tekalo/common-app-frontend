import { REVIEW_FORM_TEXT } from '@/lang/en';
import { NewRoleType } from '@/lib/types';

interface IRoleEssaysSection {
  role: NewRoleType;
}

const RoleEssaysSection: React.FC<IRoleEssaysSection> = ({ role }) => {
  return (
    <div className="mt-9 space-y-4">
      {role.desiredImpactExp ? (
        <div className="space-y-2">
          <div className="text-component-large text-black-text">
            {REVIEW_FORM_TEXT.ROLE_REVIEW.ESSAYS.desiredImpact}
          </div>
          <div className="text-p3-desktop">{role.desiredImpactExp}</div>
        </div>
      ) : (
        <></>
      )}

      <div className="space-y-2">
        <div className="text-component-large text-black-text">
          {REVIEW_FORM_TEXT.ROLE_REVIEW.ESSAYS.description}
        </div>
        <div className="text-p3-desktop">{role.pitchEssay}</div>
      </div>
    </div>
  );
};

export default RoleEssaysSection;
