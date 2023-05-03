import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import OrgFormPage from '@/modules/sections/sign-up/OrgFormPage/OrgFormPage';
import { useState } from 'react';

// TODO: Render Review Page

const OrganizationSignup: NextPageWithLayout = () => {
  /**
   * If activeIndex is -1 show the OrgSignupForm
   * Else index orgRoles
   */
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);

  const handleOrgSignup = (values: NewOrgType) => {
    setOrgInfo(values);
    setActiveIndex(0);
  };

  const handleNewRole = (newRole: NewRoleType, goToReview = false) => {
    const newOpportunityList = [...orgRoles, newRole];
    setOrgRoles(newOpportunityList);
    setActiveIndex(
      goToReview ? newOpportunityList.length : newOpportunityList.length + 1
    );
  };

  const handleEditRole = (editedRole: NewRoleType, goToReview = false) => {
    const newOpportunityList = [...orgRoles];
    newOpportunityList[activeIndex] = editedRole;
    setOrgRoles(newOpportunityList);
    setActiveIndex(
      goToReview ? activeIndex + 1 : newOpportunityList.length + 1
    );
  };

  return (
    <>
      {activeIndex > orgRoles.length ? (
        <div>Hello</div>
      ) : (
        <OrgFormPage
          activeIndex={activeIndex}
          orgInfo={orgInfo}
          setActiveIndex={setActiveIndex}
          orgRoles={orgRoles}
          handleNewRole={handleNewRole}
          handleEditRole={handleEditRole}
          handleOrgSignup={handleOrgSignup}
        />
      )}
    </>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => (
  <ApplicationLayout>{page}</ApplicationLayout>
);
