import { NextPageWithLayout } from '@/lib/types';
import OrgSignupForm from '@/modules/sections/sign-up/forms/organizations/signupForm/SignupForm';
import Link from 'next/link';
import { useState } from 'react';

const OrganizationSignup: NextPageWithLayout = () => {
  // const [orgContactInfo, setOrgContactInfo] =
  //   useState<z.infer<typeof OrgSchema>>();
  const [orgContactInfo, setOrgContactInfo] = useState({});
  const [orgOpportunities, setOrgOpportunities] = useState([]);

  const handleOrgSignup = (values: any) => {
    console.log(values);
    const newFormState = { ...orgContactInfo, orgOpportunities, ...values };
    setOrgContactInfo(values);
  };

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <div className="px-6 pb-28 pt-10 md:px-24">
        {/* Title */}
        <div className="mb-4 px-2 text-center text-h3-desktop md:mb-6 md:max-w-[584px]">
          {'Recruit qualified candidates from the Tekalo network'}
        </div>
        {/* Navaway is an applicant*/}
        <div className="text-center text-component-medium">
          {'If you’re a candidate looking for opportunities, '}
          <span className="text-blue-1 underline underline-offset-4">
            <Link href="/sign-up/applicants">{'sign up here'}</Link>
          </span>
        </div>

        <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
          {/* TODO: New org form */}
          <OrgSignupForm handleSubmit={handleOrgSignup} />
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignup;
