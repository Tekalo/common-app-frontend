import Button from '@/components/buttons/Button/Button';
import {
  PreferredContactOptions,
  SearchStatusOptions,
} from '@/lib/constants/selects';
import { PRIVACY_DISCLAIMER, TERMS_DISCLAIMER } from '@/lib/constants/text';
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

export interface ISignupForm {
  handleSubmit: (_values: NewCandidateType) => void;
  setShowPrivacyModal: (_showPrivacyModal: boolean) => void;
}

const SignupForm: React.FC<ISignupForm> = ({
  handleSubmit,
  setShowPrivacyModal,
}) => {
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
            placeholder="Your email address"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={Email}
          />

          {/* Pronouns */}
          <FreeTextField
            fieldName="pronouns"
            label="Pronouns (optional)"
            placeholder="E.g. she/her/hers"
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

          {/* Contact Method */}
          <SingleSelectField
            fieldName="preferredContact"
            label="Preferred contact method to receive matches"
            placeholder="Choose one"
            listOptions={PreferredContactOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={PreferredContact}
          />

          {/* Phone Number */}
          <FreeTextField
            listenTo={['preferredContact']}
            fieldName="phone"
            label="Phone number (optional)"
            placeholder="+1 (555) 555-5555"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={contactPhoneLinkedValidation}
          />

          {/* TODO Privacy Info */}
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
