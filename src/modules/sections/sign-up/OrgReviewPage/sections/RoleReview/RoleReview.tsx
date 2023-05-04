import Faq from '@/components/faq/Faq';
import { capitalizeFirstLetter } from '@/lib/helpers/formHelpers';
import { NewRoleType } from '@/lib/types';

export interface IRoleReview {
  orgRoles: NewRoleType[];
}

const RoleReview: React.FC<IRoleReview> = ({ orgRoles }) => {
  const renderRole = (role: NewRoleType) => {
    return (
      <div className="mt-6">
        {/* Section One: Details */}
        <div className="space-y-2">
          <div>
            <span className="text-component-large text-black-text">
              {'Type of opportunity: '}
            </span>
            {role.employmentType}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Type of role: '}
            </span>
            {capitalizeFirstLetter(role.roleType)}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Position title: '}
            </span>
            {capitalizeFirstLetter(role.positionTitle)}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Link to job description: '}
            </span>
            {role.jdUrl}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Salary range: '}
            </span>
            {role.salaryRange}
          </div>
        </div>
        {/* Section Two: Info  */}
        <div className="mt-6 space-y-2">
          <div>
            <span className="text-component-large text-black-text">
              {'Desired start date: '}
            </span>
            {role.desiredStartDate}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Desired years of experience: '}
            </span>
            {role.desiredYoe.join(', ')}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Desired skills for the role: '}
            </span>
            {role.desiredSkills
              .map((skill) => capitalizeFirstLetter(skill))
              .join(', ')}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Desired other skills: '}
            </span>
            {role.desiredOtherSkills
              ? role.desiredOtherSkills
                  .map((skill) => capitalizeFirstLetter(skill))
                  .join(', ')
              : 'N/A'}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Are there other employees on staff with similar roles?: '}
            </span>
            {role.similarStaffed ? 'Yes' : 'No'}
          </div>
        </div>
        {/* Section Three: Essays */}
        <div className="mt-9 space-y-4">
          <div className="space-y-2">
            <div className="text-component-large text-black-text">
              {
                'Desired impact-related experience or passion that you’re looking for in a candidate:'
              }
            </div>
            <div className="text-p3-desktop">{role.desiredImpactExp}</div>
          </div>
          <div className="space-y-2">
            <div className="text-component-large text-black-text">
              {'How would you describe the role in a few sentences?:'}
            </div>
            <div className="text-p3-desktop">{role.pitchEssay}</div>
          </div>
        </div>
      </div>
    );
  };

  const faqItems = orgRoles.map((role, idx) => ({
    questionText: `Role ${idx + 1}`,
    extras: renderRole(role),
  }));

  return <Faq faqItems={faqItems} />;
};

export default RoleReview;
