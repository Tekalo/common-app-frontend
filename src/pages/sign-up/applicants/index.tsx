import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import TableModal from '@/modules/components/modal/Modal/TableModal/TableModal';
import SignupForm from '@/sections/sign-up/applicants/signupForm/SignupForm';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

const ApplicantSignup: NextPageWithLayout = () => {
  let [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
        console.error('Failed to submit form data');
        alert(await response.text());
      }
    } catch (error) {
      // Handle fetch error
      console.error('Failed to fetch', error);
      alert('Failed to submit form data!');
    }
  };

  const headerText = 'Privacy Info';

  const bodyText =
    'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.';

  const extras = (
    <div className="text-p3-desktop">
      See our&nbsp;
      <span className="text-blue-1 underline underline-offset-4">
        <Link target="_blank" href="/privacy-info">
          Privacy FAQ
        </Link>
      </span>
      &nbsp;for more information
    </div>
  );

  return (
    <div className="px-6 pb-28 pt-10 md:px-24">
      {/* Title */}
      <div className="mb-4 px-2 text-center text-h3-desktop md:mb-6 md:max-w-[584px]">
        Join a network with over XX00 organizations to find your match.
      </div>
      {/* Navaway has an account*/}
      <div className="text-center text-component-medium">
        {'Already have an account? '}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">Sign in</Link>
        </span>
      </div>
      <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
        {/* New user form */}
        <SignupForm
          handleSubmit={handleSubmit}
          setShowPrivacyModal={setShowPrivacyModal}
        />
      </div>
      {/* Navaway for organizations */}
      <div className="mt-6 text-center">
        {"If you're an organization, "}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href="/sign-in">apply here</Link>
        </span>
      </div>
      <TableModal
        headerText={headerText}
        bodyText={bodyText}
        extras={extras}
        isOpen={showPrivacyModal}
        closeModal={() => {
          setShowPrivacyModal(false);
        }}
      />
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
