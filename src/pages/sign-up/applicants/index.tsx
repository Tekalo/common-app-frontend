import NavTitle from '@/components/navigation/NavTitle/NavTitle';
import {
  ACCOUNT_LINK,
  APPLICANT_CONTENT_TABLE_TEXT,
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_FORM_TEXT,
  ERROR_MODAL_TEXT,
  ORG_SIGNUP_LINK,
  PRIVACY_LINK,
  PRIVACY_MODAL_TEXT,
  SIGN_IN_LINK,
  TRACKING,
} from '@/lang/en';
import { post, postWithTurnstile } from '@/lib/helpers/api/apiHelpers';
import { applicantsEndpoint } from '@/lib/helpers/api/endpoints';
import { stripEmptyFields } from '@/lib/helpers/transformers';
import { jumpToFirstErrorMessage } from '@/lib/helpers/utilities';
import ApplicationLayout from '@/lib/layouts/forms/application/ApplicationLayout';
import { ApplicantContext } from '@/lib/providers/applicantProvider';
import { DebugContext } from '@/lib/providers/debugProvider';
import { GTMContext } from '@/lib/providers/gtmProvider/gtmProvider';
import { SubmissionContext } from '@/lib/providers/submissionProvider';
import { NewCandidateType, NextPageWithLayout } from '@/lib/types';
import LoadingSpinner from '@/modules/components/loadingSpinner/LoadingSpinner';
import ErrorModal from '@/modules/components/modal/ErrorModal/ErrorModal';
import TableModal from '@/modules/components/modal/TableModal/TableModal';
import ApplicantSignupForm from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import router from 'next/router';
import { useContext, useEffect, useState } from 'react';

const privacyModalExtras = (
  <div className="text-p3-desktop">
    {PRIVACY_MODAL_TEXT.EXTRAS[0]}
    <span className="text-blue-1 underline underline-offset-4">
      <Link target="_blank" href={PRIVACY_LINK}>
        {PRIVACY_MODAL_TEXT.EXTRAS[1]}
      </Link>
    </span>
    {PRIVACY_MODAL_TEXT.EXTRAS[2]}
  </div>
);

const ApplicantSignup: NextPageWithLayout = () => {
  const {
    isAuthenticated,
    getAccessTokenSilently,
    isLoading: auth0IsLoading,
    user,
  } = useAuth0();
  const applicantCtx = useContext(ApplicantContext);
  const { data: accountData, isLoading: accountIsLoading } =
    applicantCtx.useAccount();
  const debugCtx = useContext(DebugContext);
  const gtmCtx = useContext(GTMContext);
  const submissionCtx = useContext(SubmissionContext);
  const { data: submissionData, isLoading: submissionIsLoading } =
    submissionCtx.useSubmission();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isConflict, setIsConflict] = useState(false);
  const [isTurnstileValid, setIsTurnstileValid] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    applicantCtx.getAccountInfo();
    submissionCtx.getSubmissions();
  }, []);

  useEffect(() => {
    const hasAccountData = (): boolean => {
      return !!accountData;
    };

    const hasSubmitted = (): boolean => {
      if (submissionData) {
        return submissionData.isFinal;
      } else {
        return false;
      }
    };

    const redirectUserCheck = () => {
      const hasSubmittedApplication = hasSubmitted();
      const hasAccount = hasAccountData();

      if (hasSubmittedApplication) {
        router.push(ACCOUNT_LINK);
      } else if (hasAccount) {
        router.push(APPLICANT_EXPERIENCE_LINK);
      } else {
        setShowContent(true);
      }
    };

    if (!auth0IsLoading && !accountIsLoading && !submissionIsLoading) {
      if (isAuthenticated && user) {
        redirectUserCheck();
      } else {
        setShowContent(true);
      }
    }
  }, [
    accountData,
    accountIsLoading,
    auth0IsLoading,
    isAuthenticated,
    submissionData,
    submissionIsLoading,
    user,
  ]);

  const displayErrorModal = (): void => {
    setShowErrorModal(true);
  };

  const handleSubmit = async (
    values: NewCandidateType,
    turnstileToken: string
  ) => {
    // TODO: This and the organization form function are identical with
    // different value types, we can refactor these
    const applicantPayload = {
      ...stripEmptyFields(values),
      utmParams: gtmCtx.getGtmParams(),
    };

    let authToken = '';
    let req;

    if (isAuthenticated) {
      authToken = await getAccessTokenSilently();
    }

    setIsConflict(false);

    if (debugCtx.debugIsActive) {
      req = post(
        applicantsEndpoint,
        applicantPayload,
        authToken,
        debugCtx.debugSecret
      );
    } else {
      req = postWithTurnstile(
        applicantsEndpoint,
        applicantPayload,
        turnstileToken,
        authToken
      );
    }

    req
      .then((res) => {
        switch (res.status) {
          case 200: // good submission
            applicantCtx.invalidateQuery();
            window.dataLayerEvent(TRACKING.CANDIDATE_SIGNUP);
            router.push(APPLICANT_EXPERIENCE_LINK);
            break;
          case 418: // the user is a teapot
            setIsTurnstileValid(false);
            console.error(res.statusText);
            break;
          case 409: // user exists already
            setIsConflict(true);
            setTimeout(() => {
              jumpToFirstErrorMessage();
            }, 250);
            break;
          default: // we have no idea
            displayErrorModal();
            console.error(res.statusText);
        }
      })
      .catch((error) => {
        displayErrorModal();
        setIsTurnstileValid(false);
        console.error('Failed to submit form data', error);
      });
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      {auth0IsLoading ? (
        <div id="loading-spinner" className="mb-1/2 space-y-3">
          <LoadingSpinner />
          <h3 className="text-component-small-desktop text-center ">
            {'Hang tight'}
          </h3>
        </div>
      ) : (
        { showContent } && (
          <>
            <div
              id="applicant-signup-page"
              className="px-6 pb-28 pt-10 md:px-24"
            >
              <NavTitle
                title={APPLICANT_FORM_TEXT.HEADER}
                navawayText={APPLICANT_FORM_TEXT.NAVAWAY}
                navLink={SIGN_IN_LINK}
                navText={APPLICANT_FORM_TEXT.SIGN_IN_LINK_COPY}
              />
              <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
                {/* New user form */}
                <ApplicantSignupForm
                  showUserExistsError={isConflict}
                  isAuthenticated={isAuthenticated}
                  debugIsActive={debugCtx.debugIsActive}
                  user={user}
                  handleSubmit={handleSubmit}
                  setShowPrivacyModal={setShowPrivacyModal}
                  isTurnstileValid={isTurnstileValid}
                  setIsTurnstileValid={setIsTurnstileValid}
                />
              </div>
              {/* Navaway for organizations */}
              <div
                id="applicant-signup-org-navaway"
                className="mt-6 text-center"
              >
                {APPLICANT_FORM_TEXT.IFORG[0]}
                <span className="text-blue-1 underline underline-offset-4">
                  <Link href={ORG_SIGNUP_LINK}>
                    {APPLICANT_FORM_TEXT.IFORG[1]}
                  </Link>
                </span>
              </div>
            </div>
            <TableModal
              tableData={APPLICANT_CONTENT_TABLE_TEXT}
              headerText={PRIVACY_MODAL_TEXT.HEADER}
              extras={privacyModalExtras}
              isOpen={showPrivacyModal}
              closeModal={() => {
                setShowPrivacyModal(false);
              }}
            />
            <ErrorModal
              isOpen={showErrorModal}
              titleText={ERROR_MODAL_TEXT.requestFailed}
              descriptionText={ERROR_MODAL_TEXT.somethingWrong}
              buttonText={ERROR_MODAL_TEXT.okButton}
              buttonHandler={() => {
                setShowErrorModal(false);
              }}
              closeModal={() => {
                setShowErrorModal(false);
              }}
            />
          </>
        )
      )}
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = function getLayout(page) {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
