import Modal from '@/components/modal/Modal/Modal/Modal';
import Timeline from '@/components/timeline/Timeline';
import { APPLICANT_SUCCESS_LINK } from '@/lib/constants/text';
import {
  applicantDraftSubmissionsEndpoint,
  applicantSubmissionsEndpoint,
  get,
  post,
} from '@/lib/helpers/apiHelpers';
import { stripEmptyFields } from '@/lib/helpers/formHelpers';
import {
  DraftSubmissionType,
  ExperienceFieldsType,
  ITimelineItem,
  InterestFieldsType,
  NextPageWithLayout,
} from '@/lib/types';
import ExperienceForm from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import InterestForm from '@/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { useAuth0 } from '@auth0/auth0-react';
import router from 'next/router';
import { useEffect, useState } from 'react';

const ApplicantSignup: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [isInterestFormVisible, setIsInterestFormVisible] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [draftFormValues, setDraftFormValues] = useState<DraftSubmissionType>();
  const [experienceFields, setExperienceFields] =
    useState<ExperienceFieldsType>();
  const [interestFields, setInterestFields] = useState<InterestFieldsType>();

  useEffect(() => {
    if (isSubmitted) {
      doSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  useEffect(() => {
    getSubmissions();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  const getAuthToken = async () => {
    return isAuthenticated ? await getAccessTokenSilently() : '';
  };

  // Hits the submission endpoint to submit the form
  const doSubmit = async () => {
    const finalFormValues = {
      ...stripEmptyFields(experienceFields),
      ...stripEmptyFields(interestFields),
      originTag: '',
    };

    post(applicantSubmissionsEndpoint, finalFormValues, await getAuthToken())
      .then((res) => {
        console.log(res);
        if (res.ok) {
          router.push(APPLICANT_SUCCESS_LINK);
        } else {
          // TODO: Error handling, API
          alert(res.statusText);
        }
      })
      .catch((error) => {
        // TODO: Error handling, FE
        console.error('Failed to fetch', error);
        alert('Failed to submit form data!');
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
          // TODO: Error handling, API
          alert(res.statusText);
        }
      })
      .catch((error) => {
        // TODO: Error handling, FE
        alert(error);
      });
  };

  // FUNCTION: Saves form responses to parent state
  const handleNext = (values: ExperienceFieldsType) => {
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
          const response: any = await res.json();
          setDraftFormValues(response.submission);
        } else {
          // TODO: Error Handling
          if (res.status === 401) {
            router.push('/');
          } else {
            alert(res.statusText);
          }
        }
      })
      .catch((error) => {
        // TODO: Error Handling
        alert(error);
      });
  }

  const timelineItems: Array<ITimelineItem> = [
    {
      content: (
        <div
          className={isInterestFormVisible ? `cursor-pointer text-blue-1` : ''}
          onClick={() => setIsInterestFormVisible(false)}
        >
          {'Your experience'}
        </div>
      ),
      isActive: true,
    },
    {
      content: 'Your interests',
      isActive: isInterestFormVisible,
    },
  ];

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      {/* Form Content */}
      <div className="mb-40 grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
        {/* Title */}
        <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
          {'Join a network with over XX00 organizations to find your match.'}
        </div>

        {/* Breadcrumb Timeline */}
        <div className="col-span-4 col-start-5 mb-12 mt-10 flex content-center justify-center">
          <Timeline timelineItems={timelineItems} horizontal={true} />
        </div>

        {/* Form Area */}
        <div className="col-span-4 col-start-5 space-y-8">
          {isInterestFormVisible ? (
            <InterestForm
              savedForm={draftFormValues}
              handleSubmit={handleSubmit}
              handleSave={handleSave}
            />
          ) : (
            <ExperienceForm
              savedForm={draftFormValues}
              handleNext={handleNext}
              handleSave={handleSave}
            />
          )}
        </div>
      </div>
      {/* Save Modal */}
      <Modal
        headline="Your progress has been saved!"
        bodyText="If you need to leave, you can click “Sign in” from the homepage, then return to the application."
        buttonText="Ok"
        isOpen={showSaveModal}
        closeModal={() => setShowSaveModal(false)}
        onConfirm={() => setShowSaveModal(false)}
      />
    </div>
  );
};

export default ApplicantSignup;
