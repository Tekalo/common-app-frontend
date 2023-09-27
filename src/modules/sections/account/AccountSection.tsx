import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import {
  ACCOUNT_PAGE_TEXT,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  BASE_LINK,
  DELETE_MODAL,
  EDIT_APP_LINK,
  ERROR_MODAL_TEXT,
  PAUSE_MODAL,
  RESUME_MODAL,
} from '@/lang/en';
import { GreenCheckSvg, IOutlineSVG } from '@/lib/constants/svgs';
import {
  applicantStateEndpoint,
  deleteRequest,
  existingApplicantEndpoint,
  get,
  put,
} from '@/lib/helpers/apiHelpers';
import { SubmissionContext } from '@/lib/providers/SubmissionProvider';
import {
  AccountResponseType,
  NextPageWithLayout,
  SubmissionResponseType,
} from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AccountAction from './AccountLine/AccountAction';
import AccountDisplay from './AccountLine/AccountDisplay';
import AccountLink from './AccountLine/AccountLink';

export interface ICandidateAccountSection {}

const AccountSection: NextPageWithLayout<ICandidateAccountSection> = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const submissionCtx = useContext(SubmissionContext);

  // Status
  const [applicantExists, setApplicantExists] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [matchesPaused, setMatchesPaused] = useState(false);

  // Content
  const [accountName, setAccountName] = useState('');
  const [showContent, setShowContent] = useState<boolean>(false);
  const [lastEditedDate, setLastEditedDate] = useState('');

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const checkApplicationEdited = (sub: SubmissionResponseType): void => {
    const createdAt = new Date(sub.submission.createdAt);
    const updatedAt = new Date(sub.submission.updatedAt);
    const displayDate: Date =
      createdAt.getTime() > updatedAt.getTime() ? createdAt : updatedAt;

    setLastEditedDate(formatDate(displayDate));
  };

  const formatDate = (date: Date): string => {
    const monthName = date.toLocaleString('default', {
      month: 'short',
    });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName}, ${day} ${year}`;
  };

  const handleUncaughtErrorResponse = (error: any): void => {
    setShowErrorModal(true);
    console.error(error);
  };

  const handleCaughtErrorResponse = (res: Response): void => {
    setShowErrorModal(true);
    console.error(res.statusText);
  };

  // User must be logged in to view this page, check for auth
  useEffect(() => {
    const getSubmissions = async () => {
      submissionCtx
        .getCandidateSubmissions(await getAccessTokenSilently())
        .then(async (res) => {
          if (res.ok) {
            const submissionResponse =
              (await res.json()) as SubmissionResponseType;

            if (submissionResponse.isFinal) {
              checkApplicationEdited(submissionResponse);
            }

            setApplicationSubmitted(submissionResponse.isFinal);
          } else {
            if (res.status === 404) {
              // TODO: Once API returns 200, revert to handleCaughtErrorResponse
              console.log('No submissions for this user');
            } else if (res.status === 401) {
              router.push(APPLICANT_SIGNUP_LINK);
            } else {
              handleCaughtErrorResponse(res);
            }
          }
        })
        .catch(handleUncaughtErrorResponse);
    };

    const getAccountData = async () => {
      get(existingApplicantEndpoint, await getAccessTokenSilently())
        .then(async (res) => {
          if (res.ok) {
            const accountResponse = (await res.json()) as AccountResponseType;

            setApplicantExists(true);
            setAccountName(accountResponse.name);
            setMatchesPaused(accountResponse.isPaused);
          } else {
            if (res.status === 404) {
              // TODO: Once API returns 200, revert to handleCaughtErrorResponse
              setApplicantExists(false);
            } else if (res.status === 401) {
              router.push(APPLICANT_SIGNUP_LINK);
            } else {
              handleCaughtErrorResponse(res);
            }
          }
        })
        .catch(handleUncaughtErrorResponse);
    };

    const loadUserData = async () => {
      await getAccountData();
      await getSubmissions();
      setTimeout(() => setShowContent(true), 1000);
    };

    if (!isLoading) {
      if (isAuthenticated) {
        loadUserData();
      } else {
        router.push(BASE_LINK);
      }
    }
  }, [isAuthenticated, isLoading]);

  const updateMatchStatus = async (pause: boolean): Promise<void> => {
    put(applicantStateEndpoint, { pause }, await getAccessTokenSilently())
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

  const onDeleteConfirm = async (): Promise<void> => {
    deleteRequest(existingApplicantEndpoint, await getAccessTokenSilently())
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

  const greenCheck = (
    <div className="mr-1 h-[16px] w-[16px] p-1">
      {<GreenCheckSvg height="12px" width="12px" color="#00A870" />}
    </div>
  );

  const iOutline = <IOutlineSVG height="16px" width="16px" color="#317BB5" />;

  return (
    <div className="m-auto w-full max-w-[928px] px-6 pb-36 pt-24">
      {showContent ? (
        <>
          <h3
            data-name="account-greeting"
            className="mb-2 font-display text-h3-desktop text-black-text"
          >
            {`${ACCOUNT_PAGE_TEXT.WELCOME}${
              accountName ? ', ' + accountName : accountName
            }`}
          </h3>
          <h4
            data-name="account-subhead"
            className="mb-6 font-display text-h4-desktop text-black-text"
          >
            {ACCOUNT_PAGE_TEXT.MANAGE}
          </h4>
        </>
      ) : (
        <div className="mb-5 grid grid-cols-10 space-y-3">
          <div className="col-span-3 animate-pulse rounded bg-gray-4 py-[9px]" />
          <div className="row-start-2  animate-pulse rounded bg-gray-4 py-[9px]" />
        </div>
      )}
      {/* Bordered Settings Box */}
      <div className="border border-gray-3 p-10">
        {showContent ? (
          <>
            <div
              data-name="actions-header"
              className="mb-6 font-display text-small-caption-desktop text-gray-1"
            >
              {ACCOUNT_PAGE_TEXT.ACCOUNT}
            </div>

            <div className="space-y-5">
              {/* Application Status Section */}
              <div
                className={`space-y-2 ${
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
                    ></AccountLink>
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

              {/* Data Control Section */}
              <div className="space-y-5">
                {/* Pause Status */}
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
              </div>
            </div>
          </>
        ) : (
          <div className="mb-5 grid grid-cols-10 space-y-3">
            <div className="col-span-3 animate-pulse rounded bg-gray-4 py-[9px]" />
            <div className="row-start-2  animate-pulse rounded bg-gray-4 py-[9px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
