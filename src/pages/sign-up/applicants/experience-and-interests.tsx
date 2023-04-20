import Modal from '@/components/modal/Modal/Modal/Modal';
import Timeline from '@/components/timeline/Timeline';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { ITimelineItem, NextPageWithLayout } from '@/lib/types';
import ExperienceForm from '@/sections/sign-up/applicants/experienceForm/ExperienceForm';
import InterestForm from '@/sections/sign-up/applicants/interestForm/InterestForm';
import { useState } from 'react';

const ApplicantSignup: NextPageWithLayout = () => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isInterestFormVisible, setIsInterestFormVisible] = useState(false);
  const [formValues, setFormValues] = useState({});

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

  // Submits the full form data from this state to the API
  const handleSubmit = async (values: any) => {
    // Update form state
    setFormValues({ ...formValues, ...values });

    console.log('Submitting form data', formValues);

    // TODO: Uncomment this when the API is ready
    // try {
    //   const response = await fetch('/api/applicants', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   console.log(response);

    //   if (response.ok) {
    //     // Success -- Move them to the next page
    //     router.push('/sign-up/applicants/experience-and-interests');
    //     // TODO: Use iron-session or similar to authenticate the user
    //   } else {
    //     // Handle error response
    //     // TODO -- Show error modal
    //     console.error('Failed to submit form data');
    //     alert(await response.text());
    //   }
    // } catch (error) {
    //   // Handle fetch error
    //   console.error('Failed to fetch', error);
    //   alert('Failed to submit form data!');
    // }
  };

  // Saves form responses to parent state
  const handleNext = (values: any) => {
    setFormValues({ ...formValues, ...values });
    setIsInterestFormVisible(true);
  };

  // Saves form responses to parent state without submission
  const handleSave = (values: any) => {
    setFormValues({ ...formValues, ...values });
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
              savedForm={formValues}
              handleSubmit={handleSubmit}
              handleSave={handleSave}
            />
          ) : (
            <ExperienceForm
              savedForm={formValues}
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
