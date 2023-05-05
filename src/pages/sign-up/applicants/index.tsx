import TableModal from '@/components/modal/Modal/TableModal/TableModal';
import NavTitle from '@/components/navigation/NavTitle/NavTitle';
import {
  APPLICANT_EXPERIENCE_LINK,
  ORG_SIGNUP_LINK,
  PRIVACY_MODAL_BODY_TEXT,
  PRIVACY_MODAL_EXTRAS,
  PRIVACY_MODAL_HEADER_TEXT,
  SIGN_IN_LINK,
  applicantFormHeader,
} from '@/lib/constants/text';
import { applicantsEndpoint, post } from '@/lib/helpers/apiHelpers';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ApplicantSignupForm from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

const ApplicantSignup: NextPageWithLayout = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSubmit = async (values: unknown) => {
    post(applicantsEndpoint, values)
      .then((res) => {
        if (res.ok) {
          router.push(APPLICANT_EXPERIENCE_LINK);
        } else {
          // TODO: Error handling, from API
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        // TODO: Error handling, from FE
        console.error('Failed to submit form data', error);
      });
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <div className="px-6 pb-28 pt-10 md:px-24">
        <NavTitle
          title={applicantFormHeader}
          navawayText={'Already have an account? '}
          navLink={SIGN_IN_LINK}
          navText={'Sign in'}
        />
        <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
          {/* New user form */}
          <ApplicantSignupForm
            handleSubmit={handleSubmit}
            setShowPrivacyModal={setShowPrivacyModal}
          />
        </div>
        {/* Navaway for organizations */}
        <div className="mt-6 text-center">
          {"If you're an organization, "}
          <span className="text-blue-1 underline underline-offset-4">
            <Link href={ORG_SIGNUP_LINK}>{'apply here'}</Link>
          </span>
        </div>
      </div>
      <TableModal
        headerText={PRIVACY_MODAL_HEADER_TEXT}
        bodyText={PRIVACY_MODAL_BODY_TEXT}
        extras={PRIVACY_MODAL_EXTRAS}
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
