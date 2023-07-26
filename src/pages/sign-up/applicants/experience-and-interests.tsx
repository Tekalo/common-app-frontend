import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import Modal from '@/components/modal/Modal/Modal/Modal';
import Timeline from '@/components/timeline/Timeline';
import {
  APPLICANT_FORM_TEXT,
  APPLICANT_SUCCESS_LINK,
  BASE_LINK,
  ERROR_MODAL_TEXT,
  SAVE_MODAL,
  TRACKING,
  UPLOAD_ERROR_TEXT,
} from '@/lang/en';
import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
  get,
  post,
} from '@/lib/helpers/apiHelpers';
import { stripEmptyFields } from '@/lib/helpers/formHelpers';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import {
  DraftSubmissionType,
  ExperienceFieldsType,
  ITimelineItem,
  InterestFieldsType,
  NextPageWithLayout,
  SubmissionResponseType,
} from '@/lib/types';
import ExperienceForm from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import InterestForm from '@/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { useAuth0 } from '@auth0/auth0-react';
import router from 'next/router';
import { useEffect, useState } from 'react';

const ApplicantForms: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [draftFormValues, setDraftFormValues] = useState<DraftSubmissionType>();
  const [experienceFields, setExperienceFields] =
    useState<ExperienceFieldsType>();
  const [interestFields, setInterestFields] = useState<InterestFieldsType>();
  const [isInterestFormStarted, setIsInterestFormStarted] = useState(false);
  const [isInterestFormVisible, setIsInterestFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showUploadErrorModal, setShowUploadErrorModal] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      doSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  // TODO: Commenting this out for now as the first page values are not being
  // set if we skip the first page, we have to click "Next" button or it breaks
  // useEffect(() => {
  //   setIsInterestFormStarted(interestFormHasBeenStarted(draftFormValues));
  // }, [draftFormValues]);

  useEffect(() => {
    if (!isLoading) {
      getSubmissions();
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  const getAuthToken = async () => {
    return isAuthenticated ? await getAccessTokenSilently() : '';
  };

  // const interestFormHasBeenStarted = (values?: DraftSubmissionType) => {
  //   const isFilled = (val: string | string[] | boolean | null | undefined) => {
  //     switch (typeof val) {
  //       case 'object':
  //       case 'string':
  //         return val?.length !== 0 && val !== null;
  //       case 'boolean':
  //         return val !== false;
  //       default:
  //         return val !== undefined;
  //     }
  //   };

  //   if (values) {
  //     return [
  //       values.interestEmploymentType,
  //       values.hoursPerWeek,
  //       values.interestRoles,
  //       values.currentLocation,
  //       values.openToRelocate,
  //       values.openToRemoteMulti,
  //       values.desiredSalary,
  //       values.interestCauses,
  //       values.otherCauses,
  //       values.interestGovt,
  //       values.interestGovtEmplTypes,
  //       values.previousImpactExperience,
  //       values.workAuthorization,
  //       values.essayResponse,
  //       values.referenceAttribution,
  //     ].some(isFilled);
  //   }

  //   return false;
  // };

  // Hits the submission endpoint to submit the form
  const doSubmit = async () => {
    const finalFormValues = {
      ...stripEmptyFields(experienceFields),
      ...stripEmptyFields(interestFields),
      originTag: '',
    };

    post(applicantSubmissionsEndpoint, finalFormValues, await getAuthToken())
      .then((res) => {
        if (res.ok) {
          window.dataLayerEvent(TRACKING.CANDIDATE_APP_SUBMITTED);
          router.push(APPLICANT_SUCCESS_LINK);
        } else {
          setShowErrorModal(true);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setShowErrorModal(true);
        console.error('Failed to submit', error);
      });
  };

  // FUNCTION: Saves form responses to parent state and submits to save endpoint
  const handleSave = async (values: DraftSubmissionType) => {
    const newFormState = { ...draftFormValues, ...values };
    setDraftFormValues(newFormState);

    post(
      applicantDraftSubmissionsEndpoint,
      stripEmptyFields(newFormState),
      await getAuthToken()
    )
      .then((res) => {
        if (res.ok) {
          setShowSaveModal(true);
        } else {
          setShowErrorModal(true);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setShowErrorModal(true);
        console.error('failed to save form', error);
      });
  };

  // FUNCTION: Saves form responses to parent state
  const handleNext = (values: ExperienceFieldsType) => {
    window.dataLayerEvent(TRACKING.CANDIDATE_NEXT_BTN);

    setDraftFormValues({ ...draftFormValues, ...values });
    setExperienceFields(values);
    setIsInterestFormVisible(true);
  };

  // FUNCTION: Saves form responses to parent state and generates final form
  const handleSubmit = (values: InterestFieldsType) => {
    const newFormState = { ...draftFormValues, ...values };
    setDraftFormValues(newFormState);
    setInterestFields(values);
    setIsSubmitted(true);
  };

  async function getSubmissions(): Promise<void> {
    get(applicantSubmissionsEndpoint, await getAuthToken())
      .then(async (res) => {
        if (res.ok) {
          const response: SubmissionResponseType = await res.json();
          // const interestStarted = interestFormHasBeenStarted(
          //   response.submission
          // );
          const interestStarted = false;

          setDraftFormValues(response.submission);
          setIsInterestFormVisible(interestStarted);
        } else if (res.status === 401) {
          router.push(BASE_LINK);
        } else {
          setShowErrorModal(true);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setShowErrorModal(true);
        console.error('failed to fetch submissions', error);
      });
  }

  const timelineItems: Array<ITimelineItem> = [
    {
      content: (
        <div
          onClick={
            isInterestFormVisible
              ? () => setIsInterestFormVisible(false)
              : () => void {}
          }
        >
          {APPLICANT_FORM_TEXT.EXPERIENCE}
        </div>
      ),
      isEnabled: true,
      isCurrent: !isInterestFormVisible,
    },
    {
      content: (
        <div
          onClick={
            !isInterestFormVisible && isInterestFormStarted
              ? () => setIsInterestFormVisible(true)
              : () => void {}
          }
        >
          {APPLICANT_FORM_TEXT.INTERESTS}
        </div>
      ),
      isEnabled: isInterestFormVisible || isInterestFormStarted,
      isCurrent: isInterestFormVisible,
    },
  ];

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center px-6">
      {/* Form Content */}
      <div className="flex w-full max-w-[1120px] flex-col justify-center gap-8 pb-28 text-center md:pb-32">
        {/* Title */}
        <h3 className="mx-auto max-w-[584px] pt-16 font-display text-h3-desktop text-black-text">
          {APPLICANT_FORM_TEXT.HEADER}
        </h3>

        {/* Breadcrumb Timeline */}
        <div className="mb-12 mt-10 flex content-center justify-center">
          <Timeline timelineItems={timelineItems} horizontal={true} />
        </div>

        {/* Form Area */}
        <div className="m-auto w-full max-w-[344px] space-y-8">
          {isInterestFormVisible ? (
            <InterestForm
              savedForm={draftFormValues}
              handleSubmit={handleSubmit}
              handleSave={handleSave}
            />
          ) : (
            <ExperienceForm
              savedForm={draftFormValues}
              showUploadErrorModal={() => setShowUploadErrorModal(true)}
              handleNext={handleNext}
              handleSave={handleSave}
            />
          )}
        </div>
      </div>
      {/* Save Modal */}
      <Modal
        headline={SAVE_MODAL.HEADER}
        bodyText={SAVE_MODAL.BODY}
        buttonText={SAVE_MODAL.CTA}
        isOpen={showSaveModal}
        positionStyles="absolute left-6 right-6 top-10 z-50 md:top-48"
        closeModal={() => setShowSaveModal(false)}
        onConfirm={() => setShowSaveModal(false)}
      />
      <ErrorModal
        isOpen={showErrorModal || showUploadErrorModal}
        titleText={
          showErrorModal
            ? ERROR_MODAL_TEXT.requestFailed
            : UPLOAD_ERROR_TEXT.header
        }
        descriptionText={
          showErrorModal
            ? ERROR_MODAL_TEXT.somethingWrong
            : UPLOAD_ERROR_TEXT.bodyText
        }
        buttonText={ERROR_MODAL_TEXT.okButton}
        closeModal={() => {
          showErrorModal
            ? setShowErrorModal(false)
            : setShowUploadErrorModal(false);
        }}
      />
    </div>
  );
};

export default ApplicantForms;

ApplicantForms.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
