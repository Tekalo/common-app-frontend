import {
  PRIVACY_DISCLAIMER,
  PRIVACY_MODAL_BODY_TEXT,
  PRIVACY_MODAL_EXTRAS,
  PRIVACY_MODAL_HEADER_TEXT,
} from '@/lib/constants/text';
import { PrivacyPolicy } from '@/lib/enums';
import { NewOrgType, NewRoleType } from '@/lib/types';
import Button from '@/modules/components/buttons/Button/Button';
import TableModal from '@/modules/components/modal/Modal/TableModal/TableModal';
import { BooleanField } from '@/modules/sections/sign-up/fields';
import { Form } from 'houseform';
import { useState } from 'react';
import OrgDetails from './sections/OrgDetails';
import RoleDetails from './sections/RoleDetails';

export interface IReviewFormPage {
  orgInfo: NewOrgType | undefined;
  orgRoles: NewRoleType[];
}

const ReviewFormPage: React.FC<IReviewFormPage> = ({ orgInfo, orgRoles }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);

  return (
    <div className="mx-6 mt-16 w-full sm:mx-40">
      {/* Header */}
      <div className="mx-auto text-center font-display text-h3-desktop text-black-text">
        {'Review your intake form'}
      </div>
      {/* Org Info */}
      <OrgDetails titleText={'Contact and organization'} orgInfo={orgInfo} />
      {/* Roles */}
      <RoleDetails orgRoles={orgRoles} />
      {/* Privacy Acknowledgement */}
      <>
        <Form
          onSubmit={(values) => {
            console.log('Submit everything');
          }}
        >
          {({ isValid, isSubmitted, submit }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mb-40 mt-16 space-y-8"
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
              <Button
                className="mt-10 w-full flex-none md:w-auto md:px-36 lg:mt-14"
                label="Submit"
                type="submit"
                disabled={isSubmitted && !isValid}
                onClick={() => submit()}
              />
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
