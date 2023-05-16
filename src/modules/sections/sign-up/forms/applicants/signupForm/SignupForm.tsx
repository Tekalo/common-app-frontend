import Button from '@/components/buttons/Button/Button';
import { APPLICANT_FORM_TEXT, TERMS_LINK } from '@/lang/en';
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
import { NewCandidateType } from '@/lib/types';
import {
  BooleanField,
  FreeTextField,
  RadioGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const executeScroll = () => window.scrollTo({ top: 0, behavior: 'auto' });
  useEffect(executeScroll, []);

  // TODO: Use form values like in candidate flow
  const [contactValue, setContactValue] = useState<string>();

  return (
    <Form<NewCandidateType> onSubmit={(values) => handleSubmit(values)}>
      {({ isValid, isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col space-y-8"
        >
          {/* Name */}
          <FreeTextField
            fieldName="name"
            label="Name"
            placeholder="Full name"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={RequiredString}
          />

          {/* Email */}
          <FreeTextField
            fieldName="email"
            label="Email"
            tooltipText="Your email will be used to contact you about your application. It won’t be used for marketing unless you opt in below."
            placeholder="Your email address"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={Email}
          />

          {/* Pronouns */}
          <FreeTextField
            fieldName="pronouns"
            label="Pronouns (optional)"
            placeholder="E.g. she/her"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalString}
          />

          {/* Search Status */}
          <RadioGroupField
            fieldName="searchStatus"
            label="Which describes you best?"
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
            label="Preferred contact method to receive matches"
            placeholder="Choose one"
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
            // TODO: This should be more directly tied to the validation
            // function this field uses
            tooltipText="If you prefer not to share your phone number, choose email as your preferred contact method. If provided, your number will be used to contact you about your application. It won’t be used for marketing unless you opt in below."
            label={`Phone number ${
              contactValue === 'email' ? '(optional)' : ''
            }`}
            placeholder="+1 (555) 555-5555"
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

          {/* Terms of Service */}
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
            label="I'd like to receive electronic communications with other opportunities, news, and updates from Schmidt Futures (optional)"
            isSubmitted={isSubmitted}
            initialValue={undefined}
          />

          {/* Form Cotnrol Button*/}
          <Button
            className="mt-10 w-full lg:mt-14"
            label="Sign up"
            type="submit"
            disabled={isSubmitted && !isValid}
            onClick={() => submit()}
          />
        </form>
      )}
    </Form>
  );
};

export default SignupForm;
