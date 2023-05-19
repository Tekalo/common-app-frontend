import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import TableModal from '@/components/modal/Modal/TableModal/TableModal';
import NavTitle from '@/components/navigation/NavTitle/NavTitle';
import {
  APPLICANT_EXPERIENCE_LINK,
  APPLICANT_FORM_TEXT,
  ORG_SIGNUP_LINK,
  PRIVACY_LINK,
  PRIVACY_MODAL_TEXT,
  SIGN_IN_LINK,
} from '@/lang/en';
import { applicantsEndpoint, post } from '@/lib/helpers/apiHelpers';
import { stripEmptyFields } from '@/lib/helpers/formHelpers';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NewCandidateType, NextPageWithLayout } from '@/lib/types';
import { applicantContentTableData } from '@/sections/privacy/PrivacyInfo';
import ApplicantSignupForm from '@/sections/sign-up/forms/applicants/signupForm/SignupForm';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';

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
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isConflict, setIsConflict] = useState(false);

  const displayErrorModal = (isConflict = false): void => {
    setIsConflict(isConflict);
    setShowErrorModal(true);
  };

  const handleSubmit = async (values: NewCandidateType) => {
    post(applicantsEndpoint, stripEmptyFields(values))
      .then((res) => {
        if (res.ok) {
          router.push(APPLICANT_EXPERIENCE_LINK);
        } else if (res.status === 409) {
          // Reg conflict
          displayErrorModal(true);
        } else {
          displayErrorModal(false);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        displayErrorModal(false);
        console.error('Failed to submit form data', error);
      });
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <div className="px-6 pb-28 pt-10 md:px-24">
        <NavTitle
          title={APPLICANT_FORM_TEXT.HEADER}
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
        tableData={applicantContentTableData}
        headerText={PRIVACY_MODAL_TEXT.HEADER}
        bodyText={PRIVACY_MODAL_TEXT.BODY}
        extras={privacyModalExtras}
        isOpen={showPrivacyModal}
        closeModal={() => {
          setShowPrivacyModal(false);
        }}
      />
      <ErrorModal
        isOpen={showErrorModal}
        isConflict={isConflict}
        closeModal={() => {
          setShowErrorModal(false);
        }}
      />
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};