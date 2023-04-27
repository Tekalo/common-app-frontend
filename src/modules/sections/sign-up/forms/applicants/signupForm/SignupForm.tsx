import Button from '@/components/buttons/Button/Button';
import {
  PreferredContactOptions,
  searchStatusOptions,
} from '@/lib/constants/selects';
import { PRIVACY_DISCLAIMER, TERMS_DISCLAIMER } from '@/lib/constants/text';
import {
  PreferredContact,
  SearchStatus,
  contactPhoneLinkedValidation,
  validations,
} from '@/lib/schemas';
import { NewApplicant } from '@/lib/types';
import {
  BooleanField,
  FreeTextField,
  RadioGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { z } from 'zod';

export interface ISignupForm {
  handleSubmit: (_values: NewApplicant) => void;
  setShowPrivacyModal: (_showPrivacyModal: boolean) => void;
}

const SignupForm: React.FC<ISignupForm> = ({
  handleSubmit,
  setShowPrivacyModal,
}) => {
  return (
    <Form<NewApplicant> onSubmit={(values) => handleSubmit(values)}>
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
            initialValue={''}
            validator={validations.requiredString}
          />

          {/* Email */}
          <FreeTextField
            fieldName="email"
            label="Email"
            placeholder="Your email address"
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={validations.email}
          />

          {/* Pronouns */}
          <FreeTextField
            fieldName="pronouns"
            label="Pronouns (optional)"
            placeholder="E.g. she/her/hers"
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={z.string().optional()}
          />

          {/* Search Status */}
          <RadioGroupField
            fieldName="searchStatus"
            label="Which describes you best?"
            listOptions={searchStatusOptions}
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={SearchStatus}
          />

          {/* Contact Method */}
          <SingleSelectField
            fieldName="preferredContact"
            label="Preferred contact method to receive matches"
            placeholder="Choose one"
            listOptions={PreferredContactOptions}
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={PreferredContact}
          />

          {/* Phone Number */}
          <FreeTextField
            listenTo={['preferredContact']}
            fieldName="phone"
            label="Phone number (optional)"
            placeholder="+1 (555) 555-5555"
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={contactPhoneLinkedValidation}
          />

          {/* TODO Privacy Info */}
          <BooleanField
            fieldName="acceptedPrivacy"
            label={PRIVACY_DISCLAIMER(setShowPrivacyModal)}
            isSubmitted={isSubmitted}
            initialValue={false}
            validator={validations.privacyPolicy}
          />

          {/* Terms of Service */}
          <BooleanField
            fieldName="acceptedTerms"
            label={TERMS_DISCLAIMER}
            isSubmitted={isSubmitted}
            initialValue={false}
            validator={validations.termsOfService}
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
