import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import {
  ACCOUNT_PAGE_TEXT,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_SIGNUP_LINK,
  BASE_LINK,
  DELETE_MODAL,
  ERROR_MODAL_TEXT,
  PAUSE_MODAL,
  RESUME_MODAL,
} from '@/lang/en';
import { GreenCheckSvg, IOutlineSVG } from '@/lib/constants/svgs';
import {
  applicantStateEndpoint,
  applicantSubmissionsEndpoint,
  deleteRequest,
  existingApplicantEndpoint,
  get,
  put,
} from '@/lib/helpers/apiHelpers';
import {
  AccountResponseType,
  NextPageWithLayout,
  SubmissionResponseType,
} from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface ICandidateAccountSection {}

const AccountSection: NextPageWithLayout<ICandidateAccountSection> = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout, getAccessTokenSilently } =
    useAuth0();
  const [applicantExists, setApplicantExists] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [matchesPaused, setMatchesPaused] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showContent, setShowContent] = useState<boolean>(false);

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
      get(applicantSubmissionsEndpoint, await getAccessTokenSilently())
        .then(async (res) => {
          if (res.ok) {
            const submissionResponse =
              (await res.json()) as SubmissionResponseType;
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
  }, [isAuthenticated, isLoading, getAccessTokenSilently, router]);

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

  return (
    <div className="m-auto w-full max-w-[928px] px-6 pb-36 pt-24">
      {showContent ? (
        <>
          <div
            data-name="account-greeting"
            className="mb-2 font-display text-h3-desktop text-black-text"
          >
            {`${ACCOUNT_PAGE_TEXT.WELCOME}${
              accountName ? ', ' + accountName : accountName
            }`}
          </div>
          <div className="mb-6 font-display text-h4-desktop text-black-text">
            {ACCOUNT_PAGE_TEXT.MANAGE}
          </div>
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
            <div className="mb-6 font-display text-small-caption-desktop text-gray-1">
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
                    <div className="flex items-baseline">
                      <div className="mr-1 h-[16px] w-[16px] p-1">
                        {
                          <GreenCheckSvg
                            height="12px"
                            width="12px"
                            color="#00A870"
                          />
                        }
                      </div>
                      <div className="">{ACCOUNT_PAGE_TEXT.APP_SUBMITTED}</div>
                    </div>
                    <div className="text-p3-desktop text-gray-1">
                      {ACCOUNT_PAGE_TEXT.APP_SUBMITTED_BODY}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-component-medium text-blue-1">
                      <Link
                        data-name="continue-application-link"
                        href={
                          applicantExists
                            ? APPLICANT_EXPERIENCE_LINK
                            : APPLICANT_SIGNUP_LINK
                        }
                      >
                        {ACCOUNT_PAGE_TEXT.APP_CONTINUE}
                      </Link>
                    </div>
                    <div className="text-p3-desktop text-gray-1">
                      {ACCOUNT_PAGE_TEXT.APP_CONTINUE_BODY}
                    </div>
                  </>
                )}
              </div>

              {/* Data Control Section */}
              <div className="space-y-5">
                {/* Pause Status */}
                <div className="space-y-2">
                  {matchesPaused ? (
                    <>
                      <div
                        className="cursor-pointer text-component-medium text-blue-1"
                        onClick={() => setShowResumeModal(true)}
                      >
                        <div className="flex">
                          {
                            <IOutlineSVG
                              height="16px"
                              width="16px"
                              color="#317BB5"
                            />
                          }
                          <div className="ml-1">
                            {ACCOUNT_PAGE_TEXT.APP_OPT_IN_TITLE}
                          </div>
                        </div>
                      </div>
                      <div className="text-p3-desktop text-gray-1">
                        {ACCOUNT_PAGE_TEXT.APP_OPT_IN_BODY}
                      </div>
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
                    </>
                  ) : applicationSubmitted ? (
                    <>
                      <div
                        className="cursor-pointer text-component-medium text-blue-1"
                        onClick={() => setShowPauseModal(true)}
                      >
                        {ACCOUNT_PAGE_TEXT.APP_PAUSE_TITLE}
                      </div>
                      <div className="text-p3-desktop text-gray-1">
                        {ACCOUNT_PAGE_TEXT.APP_PAUSE_BODY}
                      </div>
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
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {/* Data Control */}
                <div className="space-y-2">
                  <div
                    data-name="show-delete-modal-link"
                    className="cursor-pointer text-component-medium text-blue-1"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    {ACCOUNT_PAGE_TEXT.APP_DELETE_TITLE}
                  </div>
                  <div className="text-p3-desktop text-gray-1">
                    {ACCOUNT_PAGE_TEXT.APP_DELETE_BODY}
                  </div>
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
