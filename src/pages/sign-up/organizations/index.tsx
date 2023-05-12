import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import { CONFIRM_MODAL, ORG_SUCCESS_LINK } from '@/lang/en';
import { opportunityBatchEndpoint, post } from '@/lib/helpers/apiHelpers';
import OrganizationLayout from '@/lib/layouts/organization/OrganizationLayout';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import OrgForms from '@/sections/sign-up/forms/organizations';
import ReviewForm from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';
import { useRouter } from 'next/router';
import { useState } from 'react';

const OrganizationSignup: NextPageWithLayout = () => {
  const router = useRouter();

  // activeIdx -1 = orgInfo else orgRoles[activeIdx]
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (acceptedPrivacy: boolean) => {
    const values = {
      contact: orgInfo?.contact,
      organization: orgInfo?.organization,
      submissions: orgRoles,
      acceptedPrivacy,
    };

    // Send the payload to the API
    post(opportunityBatchEndpoint, values)
      .then((res) => {
        if (res.ok) {
          router.push(ORG_SUCCESS_LINK);
        } else {
          setShowErrorModal(true);
          console.error(res.statusText);
        }
      })
      .catch((error) => {
        setShowErrorModal(true);
        console.error('Failed to submit form data', error);
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
          headline={CONFIRM_MODAL.HEADER}
          bodyText={CONFIRM_MODAL.BODY}
          cancelBtnText={CONFIRM_MODAL.CTA_CANCEL}
          confirmBtnText={CONFIRM_MODAL.CTA_CONFIRM}
          isOpen={showDeleteModal}
          confirmBtnVariant={ButtonVariant.RED}
          closeModal={() => setShowDeleteModal(false)}
          onConfirm={handleRoleRemoval}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      <ErrorModal
        isOpen={showErrorModal}
        closeModal={() => {
          setShowErrorModal(false);
        }}
      />
    </>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => (
  <OrganizationLayout>{page}</OrganizationLayout>
);
