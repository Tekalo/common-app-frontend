import Button from '@/components/buttons/Button/Button';
import {
  APPLICANT_FORM_TEXT,
  CONTACT_OPTION_TEXT,
  ERROR_TEXT,
  TERMS_LINK,
} from '@/lang/en';
import {
  PreferredContactOptions,
  SearchStatusOptions,
} from '@/lib/constants/selects';
import {
  Email,
  OptionalString,
  PreferredContact,
  PrivacyPolicy,
  RequiredString,
  SearchStatus,
  ToS,
  contactPhoneLinkedValidation,
} from '@/lib/enums';
import {
  executeScroll,
  jumpToFirstErrorMessage,
} from '@/lib/helpers/formHelpers';
import { NewCandidateType } from '@/lib/types';
import {
  BooleanField,
  FreeTextField,
  RadioGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { User } from '@auth0/auth0-react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Form, FormInstance } from 'houseform';
import Link from 'next/link';
import { ForwardedRef, useEffect, useRef, useState } from 'react';

export interface ISignupForm {
  showUserExistsError: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
  handleSubmit: (_values: NewCandidateType, _turnstileToken: string) => void;
  setShowPrivacyModal: (_showPrivacyModal: boolean) => void;
  isTurnstileValid: boolean;
  setIsTurnstileValid: (_isTurnstileValid: boolean) => void;
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
  showUserExistsError,
  isAuthenticated,
  user,
  handleSubmit,
  setShowPrivacyModal,
  isTurnstileValid,
  setIsTurnstileValid,
}) => {
  const [contactValue, setContactValue] = useState<string>();
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const formRef: ForwardedRef<FormInstance<NewCandidateType>> = useRef(null);
  const turnstileCandidateRef = useRef<TurnstileInstance>(null);

  useEffect(executeScroll, []);

  useEffect(() => {
    // Check if user exists when submitting
    if (showUserExistsError && formRef.current) {
      formRef.current.formFieldsRef.current
        .at(1)
        ?.setErrors([ERROR_TEXT.userAlreadyExists]);
    }
  }, [showUserExistsError]);

  useEffect(() => {
    // Reset Turnstile
    if (!isTurnstileValid) {
      turnstileCandidateRef.current?.reset();
    }
  }, [isTurnstileValid]);

  return (
    <>
      <Form<NewCandidateType>
        ref={formRef}
        onSubmit={(values) => handleSubmit(values, turnstileToken)}
      >
        {({ isValid, isSubmitted, submit }) => (
          <form
            className="flex flex-col space-y-8"
            onSubmit={async (e) => {
              e.preventDefault();

              if (
                turnstileToken === '' ||
                turnstileCandidateRef.current?.getResponse() === undefined
              ) {
                setIsTurnstileValid(false);
                turnstileCandidateRef.current?.reset();
                return;
              } else {
                submit().then(() => {
                  jumpToFirstErrorMessage();
                });
              }
            }}
          >
            {/* Name */}

            <FreeTextField
              fieldName="name"
              label={APPLICANT_FORM_TEXT.FIELDS.name.label}
              placeholder={APPLICANT_FORM_TEXT.FIELDS.name.placeholder}
              isSubmitted={isSubmitted}
              initialValue={isAuthenticated ? user?.name : undefined}
              validator={RequiredString}
              disabled={isAuthenticated}
            />

            {/* Email */}
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

            {/* Pronouns */}
            <FreeTextField
              fieldName="pronoun"
              label={APPLICANT_FORM_TEXT.FIELDS.pronoun.label}
              placeholder={APPLICANT_FORM_TEXT.FIELDS.pronoun.placeholder}
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
            <div className="space-y-4">
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
            </div>

            {/* Turnstile */}
            <div
              id="turnstile-container"
              className="mx-auto"
              data-turnstile-ready={`${turnstileToken.length > 0}`}
            >
              <Turnstile
                id="candidate-form-turnstile"
                ref={turnstileCandidateRef}
                onSuccess={setTurnstileToken}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || ''}
                onAfterInteractive={() => setIsTurnstileValid(true)}
              />
              {isTurnstileValid ? null : (
                <div
                  className={
                    'mt-1 text-center text-component-small text-red-error'
                  }
                >
                  {ERROR_TEXT.somethingWrong}
                </div>
              )}
            </div>

            {/* Form Control Button*/}
            <Button
              name="submit-candidate-sign-up"
              className="mt-10 w-full lg:mt-14"
              label={APPLICANT_FORM_TEXT.BUTTONS.submit.label}
              type="submit"
              disabled={isSubmitted && !isValid}
            />
          </form>
        )}
      </Form>
    </>
  );
};

export default SignupForm;
