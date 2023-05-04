import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import OrgForms from '@/modules/sections/sign-up/forms/organizations';
import ReviewForm from '@/modules/sections/sign-up/forms/organizations/reviewForm/ReviewForm';
import { useState } from 'react';

// TODO: Delete role and delete role modal confirmation
// TODO: Submit to API and go to success page

const OrganizationSignup: NextPageWithLayout = () => {
  // activeIdx -1 = orgInfo else orgRoles[activeIdx]
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);
  const [showReview, setShowReview] = useState<boolean>(false);

  const handleOrgSignup = (values: NewOrgType) => {
    setOrgInfo(values);
    setActiveIndex(0);
  };

  const handleNewRole = (newRole: NewRoleType, reviewReady = false) => {
    const newOpportunityList = [...orgRoles, newRole];
    setOrgRoles(newOpportunityList);
    setActiveIndex(newOpportunityList.length);
    setShowReview(reviewReady);
  };

  const handleEditRole = (editedRole: NewRoleType, reviewReady = false) => {
    const newOpportunityList = [...orgRoles];
    newOpportunityList[activeIndex] = editedRole;
    setOrgRoles(newOpportunityList);
    setActiveIndex(activeIndex + 1);
    setShowReview(reviewReady);
  };

  const handleDeleteRole = (idx: number) => {
    const newOpportunityList = [...orgRoles];
    newOpportunityList.splice(idx, 1);
    setOrgRoles(newOpportunityList);
    setActiveIndex(newOpportunityList.length - 1);
  };

  const handleGoToOrg = () => {
    setActiveIndex(-1);
    setShowReview(false);
  };

  const handleGoToRole = (idx: number) => {
    setActiveIndex(idx);
    setShowReview(false);
  };

  return (
    <>
      {showReview ? (
        <ReviewForm
          orgInfo={orgInfo}
          orgRoles={orgRoles}
          handleGoToOrg={handleGoToOrg}
          handleGoToRole={handleGoToRole}
        />
      ) : (
        <OrgForms
          activeIndex={activeIndex}
          orgInfo={orgInfo}
          orgRoles={orgRoles}
          handleNewRole={handleNewRole}
          handleEditRole={handleEditRole}
          handleOrgSignup={handleOrgSignup}
          handleDeleteRole={handleDeleteRole}
          setActiveIndex={setActiveIndex}
        />
      )}
    </>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => (
  <ApplicationLayout>{page}</ApplicationLayout>
);
