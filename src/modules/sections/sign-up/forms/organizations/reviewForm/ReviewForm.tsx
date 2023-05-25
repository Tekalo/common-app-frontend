import Button from '@/components/buttons/Button/Button';
import TableModal from '@/components/modal/Modal/TableModal/TableModal';
import {
  ORG_CONTENT_TABLE_TEXT,
  PRIVACY_LINK,
  PRIVACY_MODAL_TEXT,
  REVIEW_FORM_TEXT,
} from '@/lang/en';
import { PrivacyPolicy } from '@/lib/enums';
import { NewOrgType, NewRoleType } from '@/lib/types';
import { BooleanField } from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import OrgDetailReview from './sections/OrgDetailReview';
import RoleDetailReview from './sections/RoleDetailReview';

export interface IReviewFormPage {
  orgInfo: NewOrgType | undefined;
  orgRoles: NewRoleType[];
  handleGoToOrg: () => void;
  handleGoToRole: (idx: number) => void;
  handleDeleteRole: (idx: number) => void;
  handleSubmit: (privacyAcceptance: boolean) => void;
}

const privacyModalExtras = (
  <div className="text-p3-desktop">
    {PRIVACY_MODAL_TEXT.EXTRAS[0]}
    <span className="text-blue-1 underline underline-offset-4">
      <Link target="_blank" href={PRIVACY_LINK}>
        {PRIVACY_MODAL_TEXT.EXTRAS[1]}
      </Link>
    </span>
    {PRIVACY_MODAL_TEXT.EXTRAS[2]}
  </div>
);

const PRIVACY_DISCLAIMER = (setShowPrivacyModal: (_arg: boolean) => void) => {
  return (
    <>
      {REVIEW_FORM_TEXT.PRIVACY_DISCLAIMER.text}
      <span
        className="cursor-pointer whitespace-nowrap text-blue-1 underline underline-offset-4"
        onClick={(e) => {
          e.preventDefault();
          setShowPrivacyModal(true);
        }}
      >
        {REVIEW_FORM_TEXT.PRIVACY_DISCLAIMER.linkText}
      </span>
    </>
  );
};

const ReviewFormPage: React.FC<IReviewFormPage> = ({
  orgInfo,
  orgRoles,
  handleGoToOrg,
  handleGoToRole,
  handleDeleteRole,
  handleSubmit,
}) => {
  const executeScroll = () => window.scrollTo({ top: 0, behavior: 'auto' });
  useEffect(executeScroll, []);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  return (
    <div className="mx-auto w-full max-w-content-area px-6 pb-28 pt-10 lg:pb-32">
      {/* Header */}
      <div className="mx-auto text-center font-display text-h3-mobile text-black-text lg:text-h3-desktop">
        {REVIEW_FORM_TEXT.HEADER}
      </div>
      {/* Org Info */}
      <OrgDetailReview
        titleText={REVIEW_FORM_TEXT.ORG_DETAIL.title}
        orgInfo={orgInfo}
        handleGoToOrg={handleGoToOrg}
      />
      {/* Roles */}
      <RoleDetailReview
        orgRoles={orgRoles}
        handleGoToRole={handleGoToRole}
        handleDeleteRole={handleDeleteRole}
      />
      {/* Privacy Acknowledgement */}
      <>
        <Form
          onSubmit={(values) => {
            handleSubmit(values.acceptedPrivacy);
          }}
        >
          {({ isValid, isSubmitted, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-6 space-y-8"
            >
              {/* Privacy Info */}
              <BooleanField
                fieldName="acceptedPrivacy"
                label={PRIVACY_DISCLAIMER(setShowPrivacyModal)}
                isSubmitted={isSubmitted}
                initialValue={false}
                validator={PrivacyPolicy}
              />
              {/* Form Cotnrol Button*/}
              <div className="mt-10">
                <Button
                  className="mt-10 w-full flex-none md:w-auto md:px-36 lg:mt-14"
                  label={REVIEW_FORM_TEXT.BUTTONS.submit.label}
                  type="submit"
                  disabled={isSubmitted && !isValid}
                  onClick={() => submit()}
                />
              </div>
            </form>
          )}
        </Form>
        {showPrivacyModal && (
          <TableModal
            tableData={ORG_CONTENT_TABLE_TEXT}
            headerText={PRIVACY_MODAL_TEXT.HEADER}
            bodyText={PRIVACY_MODAL_TEXT.BODY}
            extras={privacyModalExtras}
            isOpen={showPrivacyModal}
            closeModal={() => {
              setShowPrivacyModal(false);
            }}
          />
        )}
      </>
    </div>
  );
};

export default ReviewFormPage;
