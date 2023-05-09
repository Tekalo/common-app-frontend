import Button from '@/components/buttons/Button/Button';
import TableModal from '@/components/modal/Modal/TableModal/TableModal';
import {
  PRIVACY_DISCLAIMER,
  PRIVACY_MODAL_BODY_TEXT,
  PRIVACY_MODAL_EXTRAS,
  PRIVACY_MODAL_HEADER_TEXT,
} from '@/lib/constants/text';
import { PrivacyPolicy } from '@/lib/enums';
import { NewOrgType, NewRoleType } from '@/lib/types';
import { BooleanField } from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { useState } from 'react';
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

const ReviewFormPage: React.FC<IReviewFormPage> = ({
  orgInfo,
  orgRoles,
  handleGoToOrg,
  handleGoToRole,
  handleDeleteRole,
  handleSubmit,
}) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  return (
    <div className="mx-auto w-full max-w-content-area px-6 pb-28 pt-10 lg:pb-32">
      {/* Header */}
      <div className="mx-auto text-center font-display text-h3-mobile text-black-text lg:text-h3-desktop">
        {'Review your intake form'}
      </div>
      {/* Org Info */}
      <OrgDetailReview
        titleText={'Contact and organization'}
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
                  label="Submit"
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
            headerText={PRIVACY_MODAL_HEADER_TEXT}
            bodyText={PRIVACY_MODAL_BODY_TEXT}
            extras={PRIVACY_MODAL_EXTRAS}
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
