import Button from '@/components/buttons/Button/Button';
import {
  ERROR_TEXT,
  ORG_CONTENT_TABLE_TEXT,
  PRIVACY_LINK,
  PRIVACY_MODAL_TEXT,
  REVIEW_FORM_TEXT,
} from '@/lang/en';
import {
  executeScroll,
  hasLengthError,
  jumpToFirstErrorMessage,
} from '@/lib/helpers/utilities';
import { NewOrgType, NewRoleType } from '@/lib/types';
import { PrivacyPolicy } from '@/lib/validators/literal';
import TableModal from '@/modules/components/modal/TableModal/TableModal';
import RoleDetailReview from '@/modules/sections/sign-up/forms/organizations/reviewForm/sections/roleDetailReview/RoleDetailReview';
import { BooleanField } from '@/sections/sign-up/fields';
import OrgDetailReview from '@/sections/sign-up/forms/organizations/reviewForm/sections/OrgDetailReview';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Form } from 'houseform';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export interface IReviewFormPage {
  debugIsActive: boolean;
  isTurnstileValid: boolean;
  orgInfo: NewOrgType | undefined;
  orgRoles: NewRoleType[];
  handleDeleteRole: (idx: number) => void;
  handleGoToOrg: () => void;
  handleGoToRole: (idx: number) => void;
  handleSubmit: (privacyAcceptance: boolean, _turnstileToken: string) => void;
  setIsTurnstileValid: (_isTurnstileValid: boolean) => void;
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
  debugIsActive,
  isTurnstileValid,
  orgInfo,
  orgRoles,
  handleDeleteRole,
  handleGoToOrg,
  handleGoToRole,
  handleSubmit,
  setIsTurnstileValid,
}) => {
  useEffect(executeScroll, []);
  const turnstileOrgRef = useRef<TurnstileInstance>(null);

  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  useEffect(() => {
    if (!isTurnstileValid) {
      turnstileOrgRef.current?.reset();
    }
  }, [isTurnstileValid]);

  return (
    <div className="mx-auto w-full max-w-content-area px-6 pb-28 pt-10 lg:pb-32">
      {/* Header */}
      <h3
        data-name="review-page-title"
        className="mx-auto text-center font-display text-h3-mobile text-black-text lg:text-h3-desktop"
      >
        {REVIEW_FORM_TEXT.HEADER}
      </h3>
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
            handleSubmit(values.acceptedPrivacy, turnstileToken);
          }}
        >
          {({ isValid, isSubmitted, submit, errors }) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                if (
                  !debugIsActive &&
                  (turnstileToken === '' ||
                    turnstileOrgRef.current?.getResponse() === undefined)
                ) {
                  setIsTurnstileValid(false);
                  turnstileOrgRef.current?.reset();
                  return;
                } else {
                  submit().then(() => {
                    jumpToFirstErrorMessage();
                  });
                }
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

              {/* Turnstile */}
              {!debugIsActive ? (
                <div id="turnstile-container" className="mx-auto">
                  <Turnstile
                    id="org-form-turnstile"
                    ref={turnstileOrgRef}
                    onSuccess={setTurnstileToken}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || ''}
                    onAfterInteractive={() => setIsTurnstileValid(true)}
                  />
                  {isTurnstileValid ? null : (
                    <div
                      className={
                        'mt-1 text-left text-component-small text-red-error'
                      }
                    >
                      {ERROR_TEXT.somethingWrong}
                    </div>
                  )}
                </div>
              ) : null}

              {/* Form Control Button*/}
              <div className="mt-10">
                <Button
                  className="mt-10 w-full flex-none md:w-auto md:px-36 lg:mt-14"
                  label={REVIEW_FORM_TEXT.BUTTONS.submit.label}
                  name="submit-org-form"
                  disabled={(isSubmitted && !isValid) || hasLengthError(errors)}
                  type="submit"
                />
              </div>
            </form>
          )}
        </Form>
        {showPrivacyModal && (
          <TableModal
            tableData={ORG_CONTENT_TABLE_TEXT}
            headerText={PRIVACY_MODAL_TEXT.HEADER}
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
