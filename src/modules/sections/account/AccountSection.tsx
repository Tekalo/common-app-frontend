import { APPLICANT_SIGNUP_LINK, BASE_LINK } from '@/lang/en/en';
import { ApplicantContext } from '@/lib/providers/applicantProvider';
import { SubmissionContext } from '@/lib/providers/submissionProvider';
import { NextPageWithLayout, SubmissionResponseType } from '@/lib/types';
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
  const { isAuthenticated, isLoading: auth0IsLoading } = useAuth0();
  const applicantCtx = useContext(ApplicantContext);
  const {
    data: accountData,
    error: accountError,
    isLoading: accountIsLoading,
  } = applicantCtx.useAccount();
  const submissionCtx = useContext(SubmissionContext);
  const {
    data: submissionData,
    error: submissionError,
    isLoading: submissionIsLoading,
  } = submissionCtx.useSubmission();

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

  // Auth
  useEffect(() => {
    if (!auth0IsLoading && !isAuthenticated) {
      router.push(BASE_LINK);
    }
  }, [auth0IsLoading, isAuthenticated, router]);

  // Loading
  useEffect(() => {
    if (!accountIsLoading && !submissionIsLoading) {
      setShowContent(true);
    }
  }, [accountIsLoading, submissionIsLoading]);

  // Account Request
  useEffect(() => {
    if (!auth0IsLoading && isAuthenticated) {
      if (accountData) {
        setApplicantExists(true);
        setAccountName(accountData.name);
        setMatchesPaused(accountData.isPaused);
      } else if (accountError) {
        const errorCause = accountError.cause as Response;

        if (errorCause.status === 404) {
          setApplicantExists(false);
        } else if (errorCause.status === 401) {
          router.push(APPLICANT_SIGNUP_LINK);
        } else {
          handleCaughtErrorResponse(errorCause);
        }
      }
    }
  }, [
    accountData,
    accountError,
    accountIsLoading,
    applicantCtx,
    auth0IsLoading,
    isAuthenticated,
    router,
  ]);

  // Submissions Request
  useEffect(() => {
    const checkApplicationEdited = (sub: SubmissionResponseType): void => {
      const createdAt = new Date(sub.submission.createdAt);
      const updatedAt = new Date(sub.submission.updatedAt);
      const displayDate: Date =
        createdAt.getTime() > updatedAt.getTime() ? createdAt : updatedAt;

      setLastEditedDate(formatDate(displayDate));
    };

    if (!auth0IsLoading && isAuthenticated) {
      if (submissionData) {
        const isFinal = submissionData.isFinal;

        if (isFinal) {
          checkApplicationEdited(submissionData);
        }

        setApplicationSubmitted(isFinal);
      } else if (submissionError) {
        const errorCause = submissionError.cause as Response;

        if (errorCause.status === 404) {
          console.log('No submissions for this user');
        } else if (errorCause.status === 401) {
          router.push(APPLICANT_SIGNUP_LINK);
        } else {
          handleCaughtErrorResponse(errorCause);
        }
      }
    }
  }, [
    submissionData,
    submissionError,
    submissionIsLoading,
    auth0IsLoading,
    isAuthenticated,
    router,
  ]);

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
