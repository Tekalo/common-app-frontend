import { RoleType } from '@/lib/enums';
import { OrgSchema, SubmissionSchema } from '@/lib/schemas';
import { NextPageWithLayout } from '@/lib/types';
import RoleForm from '@/modules/sections/sign-up/forms/organizations/roleForm/RoleForm';
import OrgSignupForm from '@/modules/sections/sign-up/forms/organizations/signupForm/SignupForm';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';

type NewOrg = z.infer<typeof OrgSchema>;
type NewRole = z.infer<typeof SubmissionSchema>;

const OrganizationSignup: NextPageWithLayout = () => {
  const [orgInfo, setOrgInfo] = useState<NewOrg>();
  const [orgRoles, setOrgRoles] = useState<NewRole[]>();

  const handleOrgSignup = (values: NewOrg) => {
    setOrgInfo(values);
  };

  const handleNewOpportunity = (newRole: NewRole) => {
    const newOpportunityList = [...(orgRoles || []), newRole];
    setOrgRoles(newOpportunityList);
  };

  const handleEditOpportunity = (editedRole: NewRole, index: number) => {
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
            <Link href="/sign-up/applicants">{'sign up here'}</Link>
          </span>
        </div>

        <div className="m-auto mt-8 max-w-[344px] md:mt-10 lg:mt-8">
          {/* New org form */}
          <OrgSignupForm handleSubmit={handleOrgSignup} />
          <RoleForm
            // formList={orgRoles}
            formType={RoleType.FULL_TIME}
            handleNewRole={handleNewOpportunity}
            handleEditRole={handleEditOpportunity}
          />
          {/* <RoleForm
            formList={orgRoles}
            formType={'part-time'}
            handleNewRole={handleNewOpportunity}
            handleEditRole={handleEditOpportunity}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignup;
