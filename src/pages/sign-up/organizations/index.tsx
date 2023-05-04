import { APPLICANT_SIGNUP_LINK } from '@/lib/constants/text';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import RoleForm from '@/sections/sign-up/forms/organizations/roleForm/RoleForm';
import OrgSignupForm from '@/sections/sign-up/forms/organizations/signupForm/SignupForm';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

const OrganizationSignup: NextPageWithLayout = () => {
  // If the index is -1, then we are on the org signup form
  // Otherwise, we are on the role form athe specified index of orgRoles
  // If the index is greater than the length of orgRoles, then we are on the last role form and appending a new role
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>();

  const handleOrgSignup = (values: NewOrgType) => {
    setOrgInfo(values);
    setActiveIndex(0);
  };

  const handleNewOpportunity = (newRole: NewRoleType) => {
    const newOpportunityList = [...(orgRoles || []), newRole];
    setOrgRoles(newOpportunityList);
  };

  const handleEditOpportunity = (editedRole: NewRoleType, index: number) => {
    const newOpportunityList = [...(orgRoles || [])];
    newOpportunityList[index] = editedRole;
    setOrgRoles(newOpportunityList);
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
            <Link href={APPLICANT_SIGNUP_LINK}>{'sign up here'}</Link>
          </span>
        </div>

        {/* TODO: Map orgRoles into clickable breadcrumb */}
        <div className="mt-8 flex flex-row justify-center space-x-2">
          <div className="flex flex-row items-center space-x-2">
            <div className="text-component-medium">{'Contact'}</div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ChevronRightIcon className="h-4 w-4 fill-gray-2" />
            <div className="text-component-medium">{'Role 1'}</div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ChevronRightIcon className="h-4 w-4 fill-gray-2" />
            <div className="text-component-medium">{'Role 2'}</div>
          </div>
        </div>

        <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
          {/* If activeIndex is -1 show the RoleForm otherwise render OrgSignupForm */}
          {activeIndex === -1 ? (
            <OrgSignupForm handleSubmit={handleOrgSignup} />
          ) : (
            <RoleForm
              // formList={orgRoles}
              formType={orgInfo?.commitmentTypes}
              handleNewRole={handleNewOpportunity}
              // handleEditRole={handleEditOpportunity}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignup;
