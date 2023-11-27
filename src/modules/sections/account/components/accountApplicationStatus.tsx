import {
  ACCOUNT_PAGE_TEXT,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  EDIT_APP_LINK,
} from '@/lang/en';
import { GreenCheckSvg } from '@/lib/constants/svgs';
import AccountDisplay from './AccountLine/AccountDisplay';
import AccountLink from './AccountLine/AccountLink';

interface IAccountApplicationStatus {
  applicantExists: boolean;
  applicationSubmitted: boolean;
  lastEditedDate: string;
}

const AccountApplicationStatus: React.FC<IAccountApplicationStatus> = ({
  applicantExists,
  applicationSubmitted,
  lastEditedDate,
}) => {
  const greenCheck = (
    <div className="mr-1 h-4 w-4 p-1">
      {<GreenCheckSvg height="12px" width="12px" color="#00A870" />}
    </div>
  );

  return (
    <div
      className={`space-y-5 ${
        applicationSubmitted ? 'border-b border-gray-3 pb-9' : ''
      }`}
    >
      {applicationSubmitted ? (
        <>
          {/* APP SUBMITTED MSG */}
          <AccountDisplay
            icon={greenCheck}
            linkText={ACCOUNT_PAGE_TEXT.APP_SUBMITTED}
            linkName={'app-submitted-header'}
            subtext={ACCOUNT_PAGE_TEXT.APP_SUBMITTED_BODY}
            subtextName="app-submitted-subheader"
          />

          {/* EDIT APPLICATION */}
          <AccountLink
            href={EDIT_APP_LINK}
            linkText={ACCOUNT_PAGE_TEXT.APP_EDIT}
            subtext={ACCOUNT_PAGE_TEXT.APP_LAST_EDITED.replace(
              '{DATE}',
              lastEditedDate
            )}
            linkName="edit-application-link"
            subtextName="last-edited-date"
          />
        </>
      ) : (
        <>
          {/* CONTINUE APP */}
          <AccountLink
            href={
              applicantExists
                ? APPLICANT_EXPERIENCE_LINK
                : APPLICANT_SIGNUP_LINK
            }
            linkText={ACCOUNT_PAGE_TEXT.APP_CONTINUE}
            subtext={ACCOUNT_PAGE_TEXT.APP_CONTINUE_BODY}
            linkName="continue-application-link"
            subtextName="continue-link-subhead"
          />
        </>
      )}
    </div>
  );
};

export default AccountApplicationStatus;
