import { APPLICANT_SIGNUP_LINK, BASE_LINK } from '@/lang/en';
import { ApplicantContext } from '@/lib/providers/applicantProvider';
import { SubmissionContext } from '@/lib/providers/submissionProvider';
import {
  AccountResponseType,
  NextPageWithLayout,
  SubmissionResponseType,
} from '@/lib/types';
import AccountApplicationStatus from '@/sections/account/components/accountApplicationStatus';
import AccountDataControl from '@/sections/account/components/accountDataControl';
import AccountGreeting from '@/sections/account/components/accountGreeting';
import AccountModals from '@/sections/account/components/accountModals';
import AccountSettingsBox from '@/sections/account/components/accountSettingsBox';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const AccountSection: NextPageWithLayout = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const applicantCtx = useContext(ApplicantContext);
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
      applicantCtx
        .getAccountData(await getAccessTokenSilently())
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

  return (
    <div className="m-auto w-full max-w-[928px] px-6 pb-36 pt-24">
      <AccountGreeting accountName={accountName} showContent={showContent} />

      <AccountSettingsBox showContent={showContent}>
        <AccountApplicationStatus
          applicantExists={applicantExists}
          applicationSubmitted={applicationSubmitted}
          lastEditedDate={lastEditedDate}
        />

        <AccountDataControl
          applicationSubmitted={applicationSubmitted}
          matchesPaused={matchesPaused}
          setShowDeleteModal={setShowDeleteModal}
          setShowPauseModal={setShowPauseModal}
          setShowResumeModal={setShowResumeModal}
        />

        <AccountModals
          handleCaughtErrorResponse={handleCaughtErrorResponse}
          handleUncaughtErrorResponse={handleUncaughtErrorResponse}
          setMatchesPaused={setMatchesPaused}
          showDeleteModal={showDeleteModal}
          showErrorModal={showErrorModal}
          showPauseModal={showPauseModal}
          showResumeModal={showResumeModal}
          setShowDeleteModal={setShowDeleteModal}
          setShowErrorModal={setShowErrorModal}
          setShowPauseModal={setShowPauseModal}
          setShowResumeModal={setShowResumeModal}
        />
      </AccountSettingsBox>
    </div>
  );
};

export default AccountSection;
