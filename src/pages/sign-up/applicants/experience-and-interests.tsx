import Modal from '@/components/modal/Modal/Modal/Modal';
import Timeline from '@/components/timeline/Timeline';
import {
  ApplicantDraftSubmission,
  ApplicantExperience,
  ApplicantInterests,
} from '@/lib/schemas';
import { ITimelineItem, NextPageWithLayout } from '@/lib/types';
import ExperienceForm from '@/sections/sign-up/forms/applicants/experienceForm/ExperienceForm';
import InterestForm from '@/sections/sign-up/forms/applicants/interestForm/InterestForm';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  const [isInterestFormVisible, setIsInterestFormVisible] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draftFormValues, setDraftFormValues] = useState<
    z.infer<typeof ApplicantDraftSubmission>
  >({});
  const [applicantExperience, setApplicantExperience] =
    useState<z.infer<typeof ApplicantExperience>>();
  const [applicantInterests, setApplicantInterests] =
    useState<z.infer<typeof ApplicantInterests>>();

  useEffect(() => {
    if (!isSubmitted) {
      doSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const doSubmit = () => {
    const finalFormValues = {
      ...applicantExperience,
      ...applicantInterests,
      originTag: '',
    };

    // TODO: Send to API

    console.log(finalFormValues);
  };

  // FUNCTION: Saves form responses to parent state and submits to save endpoint
  const handleSave = (values: z.infer<typeof ApplicantDraftSubmission>) => {
    const newFormState = { ...draftFormValues, ...values };
    setDraftFormValues(newFormState);

    // TODO: Send to API

    setShowSaveModal(true);
  };

  // FUNCTION: Saves form responses to parent state
  const handleNext = (values: z.infer<typeof ApplicantExperience>) => {
    setDraftFormValues({ ...draftFormValues, ...values });
    setApplicantExperience(values);
    setIsInterestFormVisible(true);
  };

  // FUNCTION: Saves form responses to parent state and generates final form
  const handleSubmit = (values: z.infer<typeof ApplicantInterests>) => {
    const newFormState = { ...draftFormValues, ...values };
    setDraftFormValues(newFormState);
    setApplicantInterests(values);
    setIsSubmitted(true);
  };

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
              savedForm={draftFormValues}
              handleSubmit={handleSubmit}
              handleSave={handleSave}
            />
          ) : (
            <ExperienceForm
              savedForm={draftFormValues}
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
