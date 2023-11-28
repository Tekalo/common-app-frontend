import Faq from '@/components/faq/Faq';
import { EditSVG } from '@/lib/constants/svgs';
import { capitalizeFirstLetter } from '@/lib/helpers/string';
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
        {/* Section One: Details */}
        <div className="space-y-2">
          {renderRow(
            'Type of opportunity: ',
            `${idx}_employmentType`,
            capitalizeFirstLetter(role.employmentType)
          )}
          {renderRow(
            'Type of role: ',
            `${idx}_roleType`,
            capitalizeFirstLetter(role.roleType)
          )}
          {renderRow(
            'Is this role paid or unpaid?',
            `${idx}_paid`,
            capitalizeFirstLetter(role.paid ? 'paid' : 'unpaid')
          )}
          {renderRow(
            'Position title: ',
            `${idx}_positionTitle`,
            capitalizeFirstLetter(role.positionTitle)
          )}
          {renderRow('Link to job description: ', `${idx}_jdUrl`, role.jdUrl)}
          {role.paid ? (
            renderRow('Salary range: ', `${idx}_salaryRange`, role.salaryRange)
          ) : (
            <></>
          )}
        </div>
        {/* Section Two: Info  */}
        <div className="mt-6 space-y-2">
          {renderRow(
            'Desired start date: ',
            `${idx}_desiredStartDate`,
            role.desiredStartDate
          )}
          {renderRow(
            'Desired years of experience: ',
            `${idx}_desiredYoe`,
            role.desiredYoe?.join(', ')
          )}
          {renderRow(
            'Desired skills for the role: ',
            `${idx}_desiredSkills`,
            role.desiredSkills.join(', ')
          )}
          {renderRow(
            'Are there other employees on staff with similar roles?: ',
            `${idx}_similarStaffed`,
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
