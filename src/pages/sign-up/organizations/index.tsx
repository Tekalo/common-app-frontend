import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import OrgFormPage from '@/modules/sections/sign-up/OrgFormPage/OrgFormPage';
import OrgReviewPage from '@/modules/sections/sign-up/OrgReviewPage/OrgReviewPage';
import { useState } from 'react';

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

  return (
    <>
      {showReview ? (
        <OrgReviewPage orgInfo={orgInfo} orgRoles={orgRoles} />
      ) : (
        <OrgFormPage
          activeIndex={activeIndex}
          orgInfo={orgInfo}
          orgRoles={orgRoles}
          handleNewRole={handleNewRole}
          handleEditRole={handleEditRole}
          handleOrgSignup={handleOrgSignup}
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
