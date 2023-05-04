import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import { ButtonVariant } from '@/modules/components/buttons/Button/Button';
import OrgForms from '@/sections/sign-up/forms/organizations';
import ReviewForm from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';
import { useState } from 'react';

// TODO: Submit to API and go to success page

const OrganizationSignup: NextPageWithLayout = () => {
  // activeIdx -1 = orgInfo else orgRoles[activeIdx]
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

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
    setActiveIndex(idx);
    setShowDeleteModal(true);
  };

  const handleRoleRemoval = () => {
    const newOpportunityList = [...orgRoles];
    newOpportunityList.splice(activeIndex, 1);
    setOrgRoles(newOpportunityList);
    setActiveIndex(newOpportunityList.length - 1);
    setShowDeleteModal(false);
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
          handleDeleteRole={handleDeleteRole}
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
      {showDeleteModal && (
        <ConfirmModal
          headline={'Delete this role'}
          bodyText={
            'Are you sure you want to delete this role? You won’t be able to undo this.'
          }
          cancelBtnText={'Cancel'}
          confirmBtnText={'Delete role'}
          isOpen={showDeleteModal}
          confirmBtnVariant={ButtonVariant.RED}
          closeModal={() => setShowDeleteModal(false)}
          onConfirm={handleRoleRemoval}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => (
  <ApplicationLayout>{page}</ApplicationLayout>
);
