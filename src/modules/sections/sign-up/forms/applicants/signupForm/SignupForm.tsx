import Button from '@/components/buttons/Button/Button';
import {
  APPLICANT_FORM_TEXT,
  CONTACT_OPTION_TEXT,
  TERMS_LINK,
} from '@/lang/en';
import {
  PreferredContactOptions,
  SearchStatusOptions,
} from '@/lib/constants/selects';
import {
  contactPhoneLinkedValidation,
  Email,
  OptionalString,
  PreferredContact,
  PrivacyPolicy,
  RequiredString,
  SearchStatus,
  ToS,
} from '@/lib/enums';
import { post, verifyTurnstileEndpoint } from '@/lib/helpers/apiHelpers';
import { NewCandidateType } from '@/lib/types';
import LoadingInput from '@/modules/components/loadingInput/LoadingInput';
import {
  BooleanField,
  FreeTextField,
  RadioGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Turnstile,
  TurnstileInstance,
  TurnstileServerValidationResponse,
} from '@marsidev/react-turnstile';
import { Form } from 'houseform';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export interface ISignupForm {
  handleSubmit: (_values: NewCandidateType) => void;
  setShowPrivacyModal: (_showPrivacyModal: boolean) => void;
}

const TERMS_DISCLAIMER = (
  <>
    {APPLICANT_FORM_TEXT.TERMS_DISCLAIMER.text}
    <span className="text-blue-1 underline underline-offset-4">
      <Link target="_blank" href={TERMS_LINK}>
        {APPLICANT_FORM_TEXT.TERMS_DISCLAIMER.linkText}
      </Link>
    </span>
  </>
);

const PRIVACY_DISCLAIMER = (setShowPrivacyModal: (_arg: boolean) => void) => {
  return (
    <>
      {APPLICANT_FORM_TEXT.PRIVACY_DISCLAIMER.text}
      <span
        className="cursor-pointer whitespace-nowrap text-blue-1 underline underline-offset-4"
        onClick={(e) => {
          e.preventDefault();
          setShowPrivacyModal(true);
        }}
      >
        {APPLICANT_FORM_TEXT.PRIVACY_DISCLAIMER.linkText}
      </span>
    </>
  );
};

const SignupForm: React.FC<ISignupForm> = ({
  handleSubmit,
  setShowPrivacyModal,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const turnstileRef = useRef<TurnstileInstance>(null);

  const executeScroll = () => window.scrollTo({ top: 0, behavior: 'auto' });
  useEffect(executeScroll, []);

  // TODO: Use form values like in candidate flow
  const [contactValue, setContactValue] = useState<string>();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  return (
    <Form<NewCandidateType> onSubmit={(values) => handleSubmit(values)}>
      {({ isValid, isSubmitted, submit }) => (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // Validate the Turnstile token and if success submit form otherwise show error

            const turnstile = await post(verifyTurnstileEndpoint, {
              token: turnstileToken,
            });

            // TODO: Having an issue right here with how we handle responses
            // Might have to handle "where to call" from within our general api file instead...
            const data: TurnstileServerValidationResponse =
              await turnstile.json();

            console.log(data);

            if (data.success) {
              submit();
            } else {
              console.log('Turnstile Error: ', data);
            }
          }}
          className="flex flex-col space-y-8"
        >
          {/* Name */}
          {isLoading ? (
            <LoadingInput label={'Name'} />
          ) : (
            <FreeTextField
              fieldName="name"
              label={APPLICANT_FORM_TEXT.FIELDS.name.label}
              placeholder={APPLICANT_FORM_TEXT.FIELDS.name.placeholder}
              isSubmitted={isSubmitted}
              initialValue={isAuthenticated ? user?.name : undefined}
              validator={RequiredString}
              disabled={isAuthenticated}
            />
          )}

          {/* Email */}
          {isLoading ? (
            <LoadingInput label={'Name'} />
          ) : (
            <FreeTextField
              fieldName="email"
              label={APPLICANT_FORM_TEXT.FIELDS.email.label}
              tooltipText={APPLICANT_FORM_TEXT.FIELDS.email.tooltipText}
              placeholder={APPLICANT_FORM_TEXT.FIELDS.email.placeholder}
              isSubmitted={isSubmitted}
              initialValue={isAuthenticated ? user?.email : undefined}
              validator={Email}
              disabled={isAuthenticated}
            />
          )}

          {/* Pronouns */}
          <FreeTextField
            fieldName="pronouns"
            label={APPLICANT_FORM_TEXT.FIELDS.pronouns.label}
            placeholder={APPLICANT_FORM_TEXT.FIELDS.pronouns.placeholder}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalString}
          />
          {/* Search Status */}
          <RadioGroupField
            fieldName="searchStatus"
            label={APPLICANT_FORM_TEXT.FIELDS.searchStatus.label}
            listOptions={SearchStatusOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={SearchStatus}
          />
          {/* TODO: Move all fields with dependencies into their own fields
          so we can centralize the logic */}
          {/* Contact Method */}
          <SingleSelectField
            fieldName="preferredContact"
            label={APPLICANT_FORM_TEXT.FIELDS.preferredContact.label}
            placeholder={
              APPLICANT_FORM_TEXT.FIELDS.preferredContact.placeholder
            }
            listOptions={PreferredContactOptions}
            isSubmitted={isSubmitted}
            onChange={(val) => {
              setContactValue(val);
            }}
            initialValue={undefined}
            validator={PreferredContact}
          />
          {/* Phone Number */}
          <FreeTextField
            listenTo={['preferredContact']}
            fieldName="phone"
            tooltipText={APPLICANT_FORM_TEXT.FIELDS.phone.tooltipText}
            label={
              contactValue === CONTACT_OPTION_TEXT.email
                ? APPLICANT_FORM_TEXT.FIELDS.phone.labelOptional
                : APPLICANT_FORM_TEXT.FIELDS.phone.label
            }
            placeholder={APPLICANT_FORM_TEXT.FIELDS.phone.placeholder}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={contactPhoneLinkedValidation}
          />
          {/* Privacy Info */}
          <BooleanField
            fieldName="acceptedPrivacy"
            label={PRIVACY_DISCLAIMER(setShowPrivacyModal)}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={PrivacyPolicy}
          />
          {/* Terms of Use */}
          <BooleanField
            fieldName="acceptedTerms"
            label={TERMS_DISCLAIMER}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={ToS}
          />
          {/* Follow-up opt-in */}
          <BooleanField
            fieldName="followUpOptIn"
            label={APPLICANT_FORM_TEXT.FIELDS.followUpOptIn.label}
            isSubmitted={isSubmitted}
            initialValue={undefined}
          />
          <Turnstile
            ref={turnstileRef}
            onSuccess={setTurnstileToken}
            className="mx-auto"
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || ''}
          />

          {/* Form Cotnrol Button*/}
          <Button
            className="mt-10 w-full lg:mt-14"
            label={APPLICANT_FORM_TEXT.BUTTONS.submit.label}
            type="submit"
            disabled={isSubmitted && !isValid}
            // onClick={() => submit()}
          />
        </form>
      )}
    </Form>
  );
};

export default SignupForm;
