import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import { GreenCheckSvg, IOutlineSVG } from '@/lib/constants/svgs';
import { APPLICANT_EXPERIENCE_LINK } from '@/lib/constants/text';
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
  const [accountName, setAccountName] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [matchesPaused, setMatchesPaused] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // User must be logged in to view this page, check for auth
  useEffect(() => {
    const getSubmissions = async () => {
      get(applicantSubmissionsEndpoint, await getAccessTokenSilently()).then(
        async (res) => {
          if (res.ok) {
            const submissionResponse =
              (await res.json()) as SubmissionResponseType;
            setApplicationSubmitted(submissionResponse.isFinal);
          } else {
            console.error(res.statusText);
          }
        }
      );
    };

    const getAccountData = async () => {
      get(existingApplicantEndpoint, await getAccessTokenSilently())
        .then(async (res) => {
          if (res.ok) {
            const accountResponse = (await res.json()) as AccountResponseType;
            setAccountName(accountResponse.name);
            setMatchesPaused(accountResponse.isPaused);
          } else {
            console.error(res.statusText);
          }
        })
        .catch((err) => console.error(err));
    };

    if (!isLoading) {
      if (isAuthenticated) {
        getAccountData();
        getSubmissions();
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  const updateMatchStatus = async (pause: boolean): Promise<void> => {
    put(applicantStateEndpoint, { pause }, await getAccessTokenSilently())
      .then(async (res) => {
        if (res.ok) {
          const accountResponse: AccountResponseType = await res.json();
          setMatchesPaused(accountResponse.isPaused);
          pause ? setShowPauseModal(false) : setShowResumeModal(false);
        } else {
          console.error(res.statusText);
        }
      })
      .catch((err) => console.error(err));
  };

  const onDeleteConfirm = async (): Promise<void> => {
    deleteRequest(
      existingApplicantEndpoint,
      await getAccessTokenSilently()
    ).then((res) => {
      if (res.ok) {
        setShowDeleteModal(false);
        logout({ logoutParams: { returnTo: window.location.origin } });
      }
    });
  };

  const onPauseConfirm = async (): Promise<void> => {
    updateMatchStatus(true);
  };

  const onResumeConfirm = async (): Promise<void> => {
    updateMatchStatus(false);
  };

  const deleteModalConfirm = 'Delete account';
  const deleteModalHeadline = 'Permanently delete your account and data';
  const deleteModalText = `Are you sure you want to permanently delete you account and data? This may take up to 30 days. Choose “delete account” to start deletion.`;

  const pauseModalConfirm = 'Pause matches';
  const pauseModalHeadline = 'Pause your matches';
  const pauseModalText = 'Are you sure you want to pause your matches?';

  const resumeModalConfirm = 'Resume matches';
  const resumeModalHeadline = 'Resume your matches';
  const resumeModalText = 'Are you sure you want to resume your matches?';

  return (
    <div className="m-auto w-full max-w-[928px] px-6 pb-36 pt-24">
      <div className="mb-2 font-display text-h3-desktop text-black-text">
        {`Welcome Back, ${accountName}`}
      </div>
      <div className="mb-6 font-display text-h4-desktop text-black-text">
        {`Manage your settings`}
      </div>
      {/* Bordered Settings Box */}
      <div className="border border-gray-3 p-10">
        <div className="mb-6 font-display text-small-caption-desktop text-gray-1">
          {`Your Account`}
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
                  <div className="">{' Application submitted'}</div>
                </div>
                <div className="text-p3-desktop text-gray-1">
                  {
                    "You're all set. We'll contact you via your preferred method."
                  }
                </div>
              </>
            ) : (
              <>
                <div className="text-component-medium text-blue-1">
                  <Link href={APPLICANT_EXPERIENCE_LINK}>
                    {'Continue my application >'}
                  </Link>
                </div>
                <div className="text-p3-desktop text-gray-1">
                  Your application has not been submitted yet.
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
                      <div className="ml-1">{'Opt back in for matches >'}</div>
                    </div>
                  </div>
                  <div className="text-p3-desktop text-gray-1">
                    {'Your matches are paused until you opt back in.'}
                  </div>
                  <ConfirmModal
                    bodyText={resumeModalText}
                    cancelBtnText={'Cancel'}
                    confirmBtnText={resumeModalConfirm}
                    headline={resumeModalHeadline}
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
                    {' Pause my matches >'}
                  </div>
                  <div className="text-p3-desktop text-gray-1">
                    {
                      "If you're not looking for matches now, we'll stop contacting you until you opt back in."
                    }
                  </div>
                  <ConfirmModal
                    bodyText={pauseModalText}
                    cancelBtnText={'Cancel'}
                    confirmBtnText={pauseModalConfirm}
                    headline={pauseModalHeadline}
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
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => setShowDeleteModal(true)}
              >
                {'Delete my account and data >'}
              </div>
              <div className="text-p3-desktop text-gray-1">
                {'Permanently delete your account and saved data.'}
              </div>
            </div>
            <ConfirmModal
              bodyText={deleteModalText}
              confirmBtnVariant={ButtonVariant.RED}
              cancelBtnText={'Cancel'}
              confirmBtnText={deleteModalConfirm}
              headline={deleteModalHeadline}
              isOpen={showDeleteModal}
              closeModal={() => setShowDeleteModal(false)}
              onCancel={() => setShowDeleteModal(false)}
              onConfirm={onDeleteConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSection;
