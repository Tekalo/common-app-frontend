import Faq from '@/components/faq/Faq';
import { EditSVG } from '@/lib/constants/svgs';
import { capitalizeFirstLetter } from '@/lib/helpers/formHelpers';
import { NewRoleType } from '@/lib/types';

export interface IRoleDetailReview {
  orgRoles: NewRoleType[];
  handleGoToRole: (idx: number) => void;
  handleDeleteRole: (idx: number) => void;
}

const RoleDetailReview: React.FC<IRoleDetailReview> = ({
  orgRoles,
  handleGoToRole,
  handleDeleteRole,
}) => {
  const renderRow = (label: string, data?: string) =>
    data ? (
      <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-1">
        <span className="text-component-large text-black-text">{label}</span>
        <span className="">{data}</span>
      </div>
    ) : (
      <></>
    );
  const renderRole = (role: NewRoleType, idx: number) => {
    return (
      <div className="mt-6">
        {/* Section One: Details */}
        <div className="space-y-2">
          {renderRow('Type of opportunity: ', role.employmentType)}
          {renderRow('Type of role: ', capitalizeFirstLetter(role.roleType))}
          {renderRow(
            'Position title: ',
            capitalizeFirstLetter(role.positionTitle)
          )}
          {renderRow('Link to job description: ', role.jdUrl)}
          {renderRow('Salary range: ', role.salaryRange)}
        </div>
        {/* Section Two: Info  */}
        <div className="mt-6 space-y-2">
          {renderRow('Desired start date: ', role.desiredStartDate)}
          {renderRow(
            'Desired years of experience: ',
            role.desiredYoe?.join(', ')
          )}
          {renderRow(
            'Desired skills for the role: ',
            role.desiredSkills
              ?.map((skill) => capitalizeFirstLetter(skill))
              .join(', ')
          )}
          {renderRow(
            'Desired other skills: ',
            role.desiredOtherSkills
              ? role.desiredOtherSkills
                  .map((skill) => capitalizeFirstLetter(skill))
                  .join(', ')
              : 'N/A'
          )}
          {renderRow(
            'Are there other employees on staff with similar roles?: ',
            role.similarStaffed ? 'Yes' : 'No'
          )}
        </div>
        {/* Section Three: Essays */}
        <div className="mt-9 space-y-4">
          {role.desiredImpactExp ? (
            <div className="space-y-2">
              {' '}
              <div className="text-component-large text-black-text">
                {
                  'Desired impact-related experience or passion that you’re looking for in a candidate:'
                }
              </div>
              <div className="text-p3-desktop">{role.desiredImpactExp}</div>
            </div>
          ) : (
            <></>
          )}

          <div className="space-y-2">
            <div className="text-component-large text-black-text">
              {'How would you describe the role in a few sentences?:'}
            </div>
            <div className="text-p3-desktop">{role.pitchEssay}</div>
          </div>
        </div>
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