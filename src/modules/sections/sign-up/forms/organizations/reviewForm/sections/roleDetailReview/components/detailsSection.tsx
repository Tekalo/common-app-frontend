import { REVIEW_FORM_TEXT } from '@/lang/en';
import { capitalizeFirstLetter } from '@/lib/helpers/string';
import { IRoleSection } from '@/modules/sections/sign-up/forms/organizations/reviewForm/sections/roleDetailReview/components/shared';

const RoleDetailSection: React.FC<IRoleSection> = ({
  idx,
  renderRow,
  role,
}) => {
  return (
    <div className="space-y-2">
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.DETAILS.opportunityType,
        `${idx}_employmentType`,
        capitalizeFirstLetter(role.employmentType)
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.DETAILS.roleType,
        `${idx}_roleType`,
        capitalizeFirstLetter(role.roleType)
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.DETAILS.paidUnpaid,
        `${idx}_paid`,
        capitalizeFirstLetter(role.paid ? 'paid' : 'unpaid')
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.DETAILS.title,
        `${idx}_positionTitle`,
        capitalizeFirstLetter(role.positionTitle)
      )}
      {renderRow(
        REVIEW_FORM_TEXT.ROLE_REVIEW.DETAILS.descriptionLink,
        `${idx}_jdUrl`,
        role.jdUrl
      )}
      {role.paid ? (
        renderRow(
          REVIEW_FORM_TEXT.ROLE_REVIEW.DETAILS.salaryRange,
          `${idx}_salaryRange`,
          role.salaryRange
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoleDetailSection;
