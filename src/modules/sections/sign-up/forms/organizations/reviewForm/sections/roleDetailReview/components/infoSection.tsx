import { REVIEW_FORM_TEXT, YES_NO_TEXT } from '@/lang/en';
import { capitalizeFirstLetter } from '@/lib/helpers/string';
import { IRoleSection } from '@/modules/sections/sign-up/forms/organizations/reviewForm/sections/roleDetailReview/components/shared';

const RoleInfoSection: React.FC<IRoleSection> = ({ idx, renderRow, role }) => {
  return (
    <div className="mt-6 space-y-2">
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.INFO.startDate,
        `${idx}_desiredStartDate`,
        role.desiredStartDate
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.INFO.yoe,
        `${idx}_desiredYoe`,
        role.desiredYoe?.join(', ')
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.INFO.skills,
        `${idx}_desiredSkills`,
        role.desiredSkills
          ?.map((skill) => capitalizeFirstLetter(skill))
          .join(', ')
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.INFO.otherSkills,
        `${idx}_desiredOtherSkills`,
        role.desiredOtherSkills
          ? role.desiredOtherSkills
              .map((skill) => capitalizeFirstLetter(skill))
              .join(', ')
          : 'N/A'
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.INFO.similarStaffed,
        `${idx}_similarStaffed`,
        role.similarStaffed ? YES_NO_TEXT.yes : YES_NO_TEXT.no
      )}
    </div>
  );
};

export default RoleInfoSection;
