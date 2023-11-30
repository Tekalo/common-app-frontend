import {
  DELETE_MODAL,
  ERROR_MODAL_TEXT,
  PAUSE_MODAL,
  RESUME_MODAL,
} from '@/lang/en';
import { ApplicantContext } from '@/lib/providers/applicantProvider';
import { AccountResponseType } from '@/lib/types';
import { ButtonVariant } from '@/modules/components/buttons/Button/Button';
import ConfirmModal from '@/modules/components/modal/ConfirmModal/ConfirmModal';
import ErrorModal from '@/modules/components/modal/ErrorModal/ErrorModal';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';

interface IAccountModals {
  handleCaughtErrorResponse: (res: Response) => void;
  handleUncaughtErrorResponse: (error: any) => void;
  showDeleteModal: boolean;
  showErrorModal: boolean;
  showPauseModal: boolean;
  showResumeModal: boolean;
  setMatchesPaused: (paused: boolean) => void;
  setShowDeleteModal: (showModal: boolean) => void;
  setShowErrorModal: (showModal: boolean) => void;
  setShowPauseModal: (showModal: boolean) => void;
  setShowResumeModal: (showModal: boolean) => void;
}

const AccountModals: React.FC<IAccountModals> = ({
  handleCaughtErrorResponse,
  handleUncaughtErrorResponse,
  setMatchesPaused,
  showDeleteModal,
  showErrorModal,
  showPauseModal,
  showResumeModal,
  setShowDeleteModal,
  setShowErrorModal,
  setShowPauseModal,
  setShowResumeModal,
}) => {
  const { logout, getAccessTokenSilently } = useAuth0();
  const applicantCtx = useContext(ApplicantContext);

  const onDeleteConfirm = async (): Promise<void> => {
    applicantCtx
      .deleteApplicantData(await getAccessTokenSilently())
      .then((res) => {
        if (res.ok) {
          setShowDeleteModal(false);
          logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
          setShowDeleteModal(false);
          handleCaughtErrorResponse(res);
        }
      })
      .catch(handleUncaughtErrorResponse);
  };

  const onPauseConfirm = async (): Promise<void> => {
    updateMatchStatus(true);
  };

  const onResumeConfirm = async (): Promise<void> => {
    updateMatchStatus(false);
  };

  const updateMatchStatus = async (pause: boolean): Promise<void> => {
    applicantCtx
      .updateMatchStatus(pause, await getAccessTokenSilently())
      .then(async (res) => {
        if (res.ok) {
          const accountResponse: AccountResponseType = await res.json();
          setMatchesPaused(accountResponse.isPaused);
          pause ? setShowPauseModal(false) : setShowResumeModal(false);
        } else {
          handleCaughtErrorResponse(res);
        }
      })
      .catch(handleUncaughtErrorResponse);
  };

  return (
    <>
      <ConfirmModal
        bodyText={DELETE_MODAL.BODY}
        confirmBtnVariant={ButtonVariant.RED}
        cancelBtnText={DELETE_MODAL.CTA_CANCEL}
        confirmBtnText={DELETE_MODAL.CTA_CONFIRM}
        headline={DELETE_MODAL.HEADER}
        isOpen={showDeleteModal}
        name="delete-account-modal"
        closeModal={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={onDeleteConfirm}
      />
      <ConfirmModal
        bodyText={PAUSE_MODAL.BODY}
        cancelBtnText={PAUSE_MODAL.CTA_CANCEL}
        confirmBtnText={PAUSE_MODAL.CTA_CONFIRM}
        headline={PAUSE_MODAL.HEADER}
        isOpen={showPauseModal}
        closeModal={() => setShowPauseModal(false)}
        onCancel={() => setShowPauseModal(false)}
        onConfirm={onPauseConfirm}
      />
      <ConfirmModal
        bodyText={RESUME_MODAL.BODY}
        cancelBtnText={RESUME_MODAL.CTA_CANCEL}
        confirmBtnText={RESUME_MODAL.CTA_CONFIRM}
        headline={RESUME_MODAL.HEADER}
        isOpen={showResumeModal}
        closeModal={() => setShowResumeModal(false)}
        onCancel={() => setShowResumeModal(false)}
        onConfirm={onResumeConfirm}
      />
      <ErrorModal
        isOpen={showErrorModal}
        titleText={ERROR_MODAL_TEXT.requestFailed}
        descriptionText={ERROR_MODAL_TEXT.somethingWrong}
        buttonText={ERROR_MODAL_TEXT.okButton}
        closeModal={() => {
          setShowErrorModal(false);
        }}
      />
    </>
  );
};

export default AccountModals;
