import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import Modal from '@/components/modal/Modal/Modal/Modal';
import Timeline from '@/components/timeline/Timeline';
import {
  ACCOUNT_LINK,
  APPLICANT_FORM_TEXT,
  APPLICANT_SUCCESS_LINK,
  BASE_LINK,
  ERROR_MODAL_TEXT,
  SAVE_MODAL,
  TRACKING,
  UPLOAD_ERROR_TEXT,
} from '@/lang/en';
import { stripEmptyFields } from '@/lib/helpers/formHelpers';
import { SubmissionContext } from '@/lib/providers/SubmissionProvider';
import { CandidateInterestsSchema } from '@/lib/schemas/clientSchemas';
import {
  DraftSubmissionType,
  ExperienceFieldsType,
  ITimelineItem,
  InterestFieldsType,
  SubmissionResponseType,
} from '@/lib/types';
import ExperienceForm from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import InterestForm from '@/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { Url } from 'url';

enum MODAL_ERROR_TYPE {
  GENERAL = 1,
  UPLOAD,
}

export interface IApplicantForms {
  isEditing?: boolean;
}

const ApplicantForms: React.FC<IApplicantForms> = ({ isEditing = false }) => {
  // Providers
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const submissionCtx = useContext(SubmissionContext);

  // Form Values
  const [draftFormValues, setDraftFormValues] = useState<DraftSubmissionType>();
  const [experienceFields, setExperienceFields] =
    useState<ExperienceFieldsType>();

  // Form States
  const [isInterestFormStarted, setIsInterestFormStarted] = useState(false);
  const [isInterestFormVisible, setIsInterestFormVisible] = useState(false);
  const [delayedNavUrl, setDelayedNavUrl] = useState<string>();
  const [useNavLock] = useState<boolean>(isEditing);
  const [unsubscribe, setUnsubscribe] = useState<() => void>();

  // Modals
  const [modalError, setModalError] = useState<MODAL_ERROR_TYPE>();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showNavWarningModal, setShowNavWarningModal] = useState(false);

  // Triggers
  const submitExperienceForm: Subject<void> = new Subject<void>();

  // Navigation lock effect
  useEffect(() => {
    if (!useNavLock) return;

    const handleBrowseAway = (navUrl: Url) => {
      if (!useNavLock) return;

      setShowNavWarningModal(true);
      setDelayedNavUrl(navUrl.toString());
      router.events.emit('routeChangeError');
      throw 'routeChange aborted';
    };

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!useNavLock) return;
      e.preventDefault();

      return (e.returnValue = APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.TEXT);
    };

    // Set route change subscriptions
    router.events.on('routeChangeStart', handleBrowseAway);
    window.addEventListener('beforeunload', handleWindowClose);

    // The function to unsubscribe
    const unsubFn = () => {
      router.events.off('routeChangeStart', handleBrowseAway);
      window.removeEventListener('beforeunload', handleWindowClose);
    };

    setUnsubscribe(() => unsubFn);

    return unsubFn;
  }, [useNavLock]);

  useEffect(() => {
    if (!isLoading) {
      getSubmissions();
    }
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  const checkApplicationSubmitted = (
    response: SubmissionResponseType
  ): void => {
    // If they haven't submitted yet, they can't edit
    if (isEditing && !response.isFinal) {
      unlockedNavigation(ACCOUNT_LINK);
    }
  };

  const getAuthToken = async () => {
    return isAuthenticated ? await getAccessTokenSilently() : '';
  };

  const getErrorModalHeader = (): string => {
    switch (modalError) {
      case MODAL_ERROR_TYPE.GENERAL:
        return ERROR_MODAL_TEXT.requestFailed;
      case MODAL_ERROR_TYPE.UPLOAD:
        return UPLOAD_ERROR_TEXT.header;
      default:
        return '';
    }
  };

  async function getSubmissions(): Promise<void> {
    submissionCtx
      .getCandidateSubmissions(await getAuthToken())
      .then(async (res) => {
        if (res.ok) {
          const response: SubmissionResponseType = await res.json();

          checkApplicationSubmitted(response);
          setDraftFormValues(response.submission);
          setIsInterestFormStarted(
            interestFormHasBeenStarted(response.submission)
          );
        } else if (res.status === 401) {
          unlockedNavigation(BASE_LINK);
        } else {
          setModalError(MODAL_ERROR_TYPE.GENERAL);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setModalError(MODAL_ERROR_TYPE.GENERAL);
        console.error('failed to fetch submissions', error);
      });
  }

  // FUNCTION: Saves form responses to parent state
  const handleNext = (values: ExperienceFieldsType) => {
    window.dataLayerEvent(TRACKING.CANDIDATE_NEXT_BTN);

    setDraftFormValues({ ...draftFormValues, ...values });
    setExperienceFields(values);
    setIsInterestFormVisible(true);
  };

  // FUNCTION: Saves form responses to parent state and submits to save endpoint
  const handleSave = async (values: DraftSubmissionType) => {
    const newFormState = { ...draftFormValues, ...values };
    setDraftFormValues(newFormState);

    submissionCtx
      .saveCandidateDraft(stripEmptyFields(newFormState), await getAuthToken())
      .then((res) => {
        if (res.ok) {
          setShowSaveModal(true);
        } else {
          setModalError(MODAL_ERROR_TYPE.GENERAL);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setModalError(MODAL_ERROR_TYPE.GENERAL);
        console.error('failed to save form', error);
      });
  };

  // FUNCTION: Saves form responses to parent state and generates final form
  const handleSubmit = async (values: InterestFieldsType) => {
    const newFormState = { ...draftFormValues, ...values };
    setDraftFormValues(newFormState);

    const finalFormValues = {
      ...stripEmptyFields(experienceFields),
      ...stripEmptyFields(values),
      originTag: '',
    };

    const submitFn = isEditing
      ? submissionCtx.submitCandidateEdits
      : submissionCtx.submitCandidateApplication;

    submitFn(finalFormValues, await getAuthToken())
      .then((res) => {
        if (res.ok) {
          if (isEditing) {
            unlockedNavigation(ACCOUNT_LINK);
          } else {
            window.dataLayerEvent(TRACKING.CANDIDATE_APP_SUBMITTED);
            unlockedNavigation(APPLICANT_SUCCESS_LINK);
          }
        } else {
          setModalError(MODAL_ERROR_TYPE.GENERAL);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setModalError(MODAL_ERROR_TYPE.GENERAL);
        console.error('Failed to submit', error);
      });
  };

  const interestFormHasBeenStarted = (values?: DraftSubmissionType) => {
    type InterestKeys = keyof InterestFieldsType;

    const isFilled = (
      val: string | string[] | boolean | null | undefined
    ): boolean => {
      switch (typeof val) {
        case 'object':
        case 'string':
          return val?.length !== 0 && val !== null;
        case 'boolean':
          return val !== false;
        default:
          return val !== undefined;
      }
    };

    if (values) {
      // We are just mapping the form values of only the interest fields to an array and checking to see if any of them are filled out
      const interestValues = (
        Object.keys(CandidateInterestsSchema.shape) as InterestKeys[]
      ).map((k) => {
        return values[k];
      });

      return interestValues.some(isFilled);
    }

    return false;
  };

  // Allows navigation without the warning (nav lock)
  const unlockedNavigation = (url: string) => {
    if (unsubscribe) {
      unsubscribe();
    }

    router.push(url);
  };

  const timelineItems: Array<ITimelineItem> = [
    {
      content: (
        <div
          data-name="nav-experience-form"
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
          data-name="nav-interest-form"
          onClick={
            !isInterestFormVisible && isInterestFormStarted
              ? () => submitExperienceForm.next()
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
        <h3
          data-name="page-header"
          className="mx-auto max-w-[584px] pt-16 font-display text-h3-desktop text-black-text"
        >
          {isEditing
            ? APPLICANT_FORM_TEXT.EDIT.HEADER
            : APPLICANT_FORM_TEXT.HEADER}
        </h3>

        {/* Breadcrumb Timeline */}
        <div
          data-name="timeline"
          className="mb-12 mt-10 flex content-center justify-center"
        >
          <Timeline timelineItems={timelineItems} horizontal={true} />
        </div>

        {/* Form Area */}
        <div
          data-name="form-area"
          className="m-auto w-full max-w-[344px] space-y-8"
        >
          {isInterestFormVisible ? (
            <InterestForm
              isEditing={isEditing}
              savedForm={draftFormValues}
              handleSubmit={handleSubmit}
              handleSave={handleSave}
            />
          ) : (
            <ExperienceForm
              isEditing={isEditing}
              savedForm={draftFormValues}
              showUploadErrorModal={() =>
                setModalError(MODAL_ERROR_TYPE.UPLOAD)
              }
              handleNext={handleNext}
              handleSave={handleSave}
              forceSubmitForm={submitExperienceForm.asObservable()}
            />
          )}
          {isEditing && (
            <Link
              data-name="back-to-account-link"
              className="mt-6 block text-component-large text-blue-1"
              href={ACCOUNT_LINK}
            >
              {APPLICANT_FORM_TEXT.EDIT.BACK_TO_ACCOUNT}
            </Link>
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
      <ConfirmModal
        bodyText={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.TEXT}
        cancelBtnText={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.CANCEL_BTN}
        closeModal={() => setShowNavWarningModal(false)}
        confirmBtnText={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.CONFIRM_BTN}
        confirmBtnVariant={ButtonVariant.RED}
        headline={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.TITLE}
        isOpen={showNavWarningModal}
        onCancel={() => setShowNavWarningModal(false)}
        onConfirm={() => {
          if (delayedNavUrl) {
            unlockedNavigation(delayedNavUrl);
          }
        }}
      />
      <ErrorModal
        isOpen={!!modalError}
        titleText={getErrorModalHeader()}
        descriptionText={ERROR_MODAL_TEXT.somethingWrong}
        buttonText={ERROR_MODAL_TEXT.okButton}
        closeModal={() => {
          setModalError(undefined);
        }}
      />
    </div>
  );
};

export default ApplicantForms;
