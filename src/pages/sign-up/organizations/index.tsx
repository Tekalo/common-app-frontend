import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import { ORG_SUCCESS_LINK } from '@/lib/constants/text';
import { opportunityBatchEndpoint, post } from '@/lib/helpers/apiHelpers';
import OrganizationLayout from '@/lib/layouts/organization/OrganizationLayout';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import OrgForms from '@/sections/sign-up/forms/organizations';
import ReviewForm from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';
import router from 'next/router';
import { useState } from 'react';

const OrganizationSignup: NextPageWithLayout = () => {
  // activeIdx -1 = orgInfo else orgRoles[activeIdx]
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleSubmit = async (acceptedPrivacy: boolean) => {
    console.log(orgRoles);

    const values = {
      contact: orgInfo?.contact,
      organization: orgInfo?.organization,
      submissions: orgRoles,
      acceptedPrivacy,
    };

    // Send the payload to the API
    post(opportunityBatchEndpoint, values)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          router.push(ORG_SUCCESS_LINK);
        } else {
          // TODO: Error handling, from API
          alert(res.statusText);
        }
      })
      .catch((error) => {
        // TODO: Error handling, from FE
        console.error('Failed to submit form data', error);
        alert(error);
      });
  };

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
          handleSubmit={handleSubmit}
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
  <OrganizationLayout>{page}</OrganizationLayout>
);
