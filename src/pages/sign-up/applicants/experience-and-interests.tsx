import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ExperienceInterestForm from '@/modules/sections/sign-up/applicants/experienceInterestForm/ExperienceInterestForm';
import router from 'next/router';

// TODO: Create state to house combined form data
// TODO: Handle save and submission at this level

const handleSubmit = async (values: unknown) => {
  try {
    const response = await fetch('/api/applicants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    console.log(response);

    if (response.ok) {
      // Success -- Move them to the next page
      router.push('/sign-up/applicants/experience-and-interests');
      // TODO: Use iron-session or similar to authenticate the user
    } else {
      // Handle error response
      // TODO -- Show error modal
      console.error('Failed to submit form data');
      alert(await response.text());
    }
  } catch (error) {
    // Handle fetch error
    console.error('Failed to fetch', error);
    alert('Failed to submit form data!');
  }
};

const ApplicantSignup: NextPageWithLayout = () => {
  return (
    <div className="mb-40 grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
      {/* Title */}
      <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
        Join a network with over XX00 organizations to find your match.
      </div>
      {/* Experience and interests form */}
      <div className="col-span-4 col-start-5 space-y-8">
        <ExperienceInterestForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
