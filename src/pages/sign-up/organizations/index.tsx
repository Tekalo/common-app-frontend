import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/Modal/ConfirmModal/ConfirmModal';
import ErrorModal from '@/components/modal/Modal/ErrorModal/ErrorModal';
import { CONFIRM_MODAL, ERROR_MODAL_TEXT, ORG_SUCCESS_LINK } from '@/lang/en';
import {
  opportunityBatchEndpoint,
  post,
  postWithTurnstile,
} from '@/lib/helpers/apiHelpers';
import { executeScroll } from '@/lib/helpers/formHelpers';
import OrganizationLayout from '@/lib/layouts/organization/OrganizationLayout';
import { DebugContext } from '@/lib/providers/debugProvider';
import { NewOrgType, NewRoleType, NextPageWithLayout } from '@/lib/types';
import OrgForms from '@/sections/sign-up/forms/organizations';
import ReviewForm from '@/sections/sign-up/forms/organizations/reviewForm/ReviewForm';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const OrganizationSignup: NextPageWithLayout = () => {
  const router = useRouter();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const debugCtx = useContext(DebugContext);

  // activeIdx -1 = orgInfo else orgRoles[activeIdx]
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [orgInfo, setOrgInfo] = useState<NewOrgType>();
  const [orgRoles, setOrgRoles] = useState<NewRoleType[]>([]);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isTurnstileValid, setIsTurnstileValid] = useState<boolean>(true);

  const handleSubmit = async (
    acceptedPrivacy: boolean,
    turnstileToken: string
  ) => {
    const values = {
      contact: orgInfo?.contact,
      organization: orgInfo?.organization,
      submissions: orgRoles,
      acceptedPrivacy,
      referenceAttribution: orgInfo?.referenceAttribution,
      referenceAttributionOther: orgInfo?.referenceAttributionOther,
    };

    // TODO: This and the candidate form function are identical with
    // different value types, we can refactor these
    let authToken = '';
    let req;

    if (isAuthenticated) {
      authToken = await getAccessTokenSilently();
    }

    // Send the payload to the API
    if (debugCtx.debugIsActive) {
      req = post(opportunityBatchEndpoint, values, authToken);
    } else {
      req = postWithTurnstile(
        opportunityBatchEndpoint,
        values,
        turnstileToken,
        authToken
      );
    }

    req
      .then((res) => {
        switch (res.status) {
          case 200: // good submission
            router.push(ORG_SUCCESS_LINK);
            break;
          case 418: // the user is a teapot
            setIsTurnstileValid(false);
            console.error(res.statusText);
            break;
          default: // we have no idea
            setShowErrorModal(true);
            console.error(res.statusText);
        }
      })
      .catch((error) => {
        setShowErrorModal(true);
        setIsTurnstileValid(false);
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
    executeScroll();
  };

  const handleEditRole = (editedRole: NewRoleType, reviewReady = false) => {
    const newOpportunityList = [...orgRoles];
    newOpportunityList[activeIndex] = editedRole;
    setOrgRoles(newOpportunityList);
    setActiveIndex(activeIndex + 1);
    setShowReview(reviewReady);
    executeScroll();
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
          debugIsActive={debugCtx.debugIsActive}
          orgInfo={orgInfo}
          orgRoles={orgRoles}
          handleGoToOrg={handleGoToOrg}
          handleGoToRole={handleGoToRole}
          handleDeleteRole={handleDeleteRole}
          handleSubmit={handleSubmit}
          isTurnstileValid={isTurnstileValid}
          setIsTurnstileValid={setIsTurnstileValid}
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
        titleText={ERROR_MODAL_TEXT.requestFailed}
        descriptionText={ERROR_MODAL_TEXT.somethingWrong}
        buttonText={ERROR_MODAL_TEXT.okButton}
        closeModal={() => {
          setShowErrorModal(false);
        }}
      />
    </>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = function getLayout(page) {
  return <OrganizationLayout>{page}</OrganizationLayout>;
};
