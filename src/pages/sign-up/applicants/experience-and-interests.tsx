import Modal from '@/components/modal/Modal/Modal/Modal';
import Timeline from '@/components/timeline/Timeline';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { ApplicantDraftSubmission, ApplicantSubmission } from '@/lib/schemas';
import { ITimelineItem, NextPageWithLayout } from '@/lib/types';
import ExperienceForm from '@/sections/sign-up/applicants/experienceForm/ExperienceForm';
import InterestForm from '@/sections/sign-up/applicants/interestForm/InterestForm';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isInterestFormVisible, setIsInterestFormVisible] = useState(false);
  const [rawFormValues, setRawFormValues] = useState({});
  const [finalFormValues, setFinalFormValues] = useState({});

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

  // FUNCTION: When finalFormValues updates submit the form
  useEffect(() => {
    console.log('SUBMIT THE FORM!', finalFormValues);
  }, [finalFormValues]);

  // FUNCTION: Saves form responses to parent state and generates final form
  const handleSubmit = async (values: any) => {
    // Preserve the raw form state
    const rawFormState = { ...rawFormValues, ...values };
    setRawFormValues(rawFormState);

    // Update rawFormState to conform to ApplicationSubmission type
    const submissionFormValue: z.infer<typeof ApplicantSubmission> = {
      ...rawFormState,
      interestGovt: rawFormState.interestGovt === 'true',
      previousImpactExperience:
        rawFormState.previousImpactExperience === 'true',
    };

    // Update state to trigger form submission
    setFinalFormValues(submissionFormValue);
  };

  // FUNCTION: Saves form responses to parent state
  const handleNext = (values: any) => {
    setRawFormValues({ ...rawFormValues, ...values });
    setIsInterestFormVisible(true);
  };

  // FUNCTION: Saves form responses to parent state and submits to save endpoint
  const handleSave = (values: any) => {
    const rawFormState = { ...rawFormValues, ...values };
    setRawFormValues(rawFormState);

    const submissionFormValue: z.infer<typeof ApplicantDraftSubmission> = {
      ...rawFormState,
      interestGovt: rawFormState.interestGovt === 'true',
      previousImpactExperience:
        rawFormState.previousImpactExperience === 'true',
    };

    // TODO: Call the API with the partial form values

    setShowSaveModal(true);
  };

  return (
    <>
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
              savedForm={rawFormValues}
              handleSubmit={handleSubmit}
              handleSave={handleSave}
            />
          ) : (
            <ExperienceForm
              savedForm={rawFormValues}
              handleSubmit={handleNext}
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
    </>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
