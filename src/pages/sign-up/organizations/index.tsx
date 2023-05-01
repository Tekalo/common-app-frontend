import { APPLICANT_SIGNUP_LINK } from '@/lib/constants/text';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import Breadcrumb from '@/modules/components/navigation/Breadcrumb/Breadcrumb';
import RoleForm from '@/sections/sign-up/forms/organizations/roleForm/RoleForm';
import OrgSignupForm from '@/sections/sign-up/forms/organizations/signupForm/SignupForm';
import Link from 'next/link';
import { useRef, useState } from 'react';

const OrganizationSignup: NextPageWithLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // -1 index = signup form, else index of current role
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrgSignup = (values: NewOrgType) => {
    setOrgInfo(values);
    setActiveIndex(0);
    scrollToTop();
  };

  const handleNewOpportunity = (newRole: NewRoleType) => {
    const newOpportunityList = [...orgRoles, newRole];
    setOrgRoles(newOpportunityList);
    setActiveIndex(newOpportunityList.length);
    scrollToTop();
  };

  const handleEditOpportunity = (editedRole: NewRoleType, index: number) => {
    const newOpportunityList = [...(orgRoles || [])];
    newOpportunityList[index] = editedRole;
    setOrgRoles(newOpportunityList);
  };

  return (
    <div
      className="flex min-h-screen min-w-full flex-col items-center"
      ref={scrollRef}
    >
      <div className="px-6 pt-10 md:px-24">
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
      </div>

      <div className="m-auto max-w-[344px] md:mt-10 lg:mt-8">
        {/* If activeIndex is -1 show the RoleForm otherwise render OrgSignupForm and breadcrum*/}
        {activeIndex === -1 ? (
          <OrgSignupForm handleSubmit={handleOrgSignup} />
        ) : (
          <>
            <div className="mb-8 flex flex-row justify-center space-x-2">
              <div
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => setActiveIndex(-1)}
              >
                {'Contact'}
              </div>
              <Breadcrumb
                label="Role"
                items={orgRoles}
                activeIndex={activeIndex}
                setActive={setActiveIndex}
              />
            </div>
            <RoleForm
              // formList={orgRoles}
              formType={orgInfo?.commitmentTypes}
              handleNewRole={handleNewOpportunity}
              // handleEditRole={handleEditOpportunity}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrganizationSignup;
