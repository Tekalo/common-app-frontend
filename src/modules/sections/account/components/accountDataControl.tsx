import { ACCOUNT_PAGE_TEXT } from '@/lang/en';
import { IOutlineSVG } from '@/lib/constants/svgs';
import AccountAction from '@/sections/account/components/AccountLine/AccountAction';

interface IAccountDataControl {
  applicationSubmitted: boolean;
  matchesPaused: boolean;
  setShowDeleteModal: (showModal: boolean) => void;
  setShowPauseModal: (showModal: boolean) => void;
  setShowResumeModal: (showModal: boolean) => void;
}

const AccountDataControl: React.FC<IAccountDataControl> = ({
  applicationSubmitted,
  matchesPaused,
  setShowDeleteModal,
  setShowPauseModal,
  setShowResumeModal,
}) => {
  const iOutline = <IOutlineSVG height="16px" width="16px" color="#317BB5" />;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        {matchesPaused ? (
          <>
            {/* Unpause Matches */}
            <AccountAction
              action={() => setShowResumeModal(true)}
              linkText={ACCOUNT_PAGE_TEXT.APP_OPT_IN_TITLE}
              linkName="data-control-title"
              subtext={ACCOUNT_PAGE_TEXT.APP_OPT_IN_BODY}
              subtextName="data-control-body"
              icon={iOutline}
            />
          </>
        ) : applicationSubmitted ? (
          <>
            {/* Pause Matches */}
            <AccountAction
              action={() => setShowPauseModal(true)}
              linkText={ACCOUNT_PAGE_TEXT.APP_PAUSE_TITLE}
              subtext={ACCOUNT_PAGE_TEXT.APP_PAUSE_BODY}
              linkName="data-control-title"
              subtextName="data-control-body"
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {/* DELETE DATA */}
      <div className="space-y-2">
        <AccountAction
          action={() => setShowDeleteModal(true)}
          linkText={ACCOUNT_PAGE_TEXT.APP_DELETE_TITLE}
          subtext={ACCOUNT_PAGE_TEXT.APP_DELETE_BODY}
          linkName="show-delete-modal-link"
          subtextName="delete-data-subhead"
        />
      </div>
    </div>
  );
};

export default AccountDataControl;
