import Button from '@/components/buttons/Button/Button';
import {
  CauseOptions,
  CommitmentOptions,
  OrgSizeOptions,
  OrgTypeOptions,
  TrueFalseOptions,
} from '@/lib/constants/selects';
import { EEOC_LABEL } from '@/lib/constants/text';
import {
  Causes,
  CommitmentType,
  Email,
  EOE,
  OrgSize,
  OrgType,
  PhoneNumber,
  RequiredString,
} from '@/lib/enums';

import { NewOrgType } from '@/lib/types';
import {
  FreeTextField,
  MultiSelectField,
  SelectBooleanField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';

export interface ISignupForm {
  handleSubmit: (values: NewOrgType) => void;
}

const SignupForm: React.FC<ISignupForm> = ({ handleSubmit }) => {
  return (
    <Form<NewOrgType>
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex flex-col space-y-8"
        >
          {/* Org Name */}
          <FreeTextField
            fieldName="organization.name"
            label="Organization name"
            placeholder="Organization's legal name"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={RequiredString}
          />

          {/* Org Type */}
          <SingleSelectField
            fieldName="organization.type"
            label="Organization type"
            placeholder="Choose one"
            listOptions={OrgTypeOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OrgType}
          />

          {/* Org Size */}
          <SingleSelectField
            fieldName="organization.size"
            label="Organization size"
            placeholder="Choose one"
            listOptions={OrgSizeOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OrgSize}
          />

          {/* Org Impact Areas */}
          <MultiSelectField
            fieldName="organization.impactAreas"
            label="Impact area(s) the organization works on"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Areas selected"
            selectionLabelSingle=" Area selected"
            listOptions={CauseOptions}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={Causes}
          />

          {/* Contact name */}
          <FreeTextField
            fieldName="contact.name"
            label="Contact name"
            placeholder="Full name"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={RequiredString}
          />

          {/* Contact email */}
          <FreeTextField
            fieldName="contact.email"
            label="Contact email"
            placeholder="Email address"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={Email}
          />

          {/* Contact number */}
          <FreeTextField
            fieldName="contact.phone"
            label="Contact phone (optional)"
            placeholder="+1 (555) 555-5555"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={PhoneNumber.optional()}
          />

          {/* Org Employment Types */}
          <SelectGroupField
            fieldName="organization.employmentTypes"
            label={
              'What type(s) of positions are you looking to fill? Choose all that apply.'
            }
            helperText={
              'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.'
            }
            listOptions={CommitmentOptions}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={CommitmentType.array()}
          />

          {/* Org EOE */}
          <SelectBooleanField
            fieldName="organization.eoe"
            label={EEOC_LABEL}
            placeholder="Choose one"
            listOptions={TrueFalseOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={EOE}
          />

          {/* Form Control Button*/}
          <Button
            className="mt-4 w-full text-component-large"
            label="Next"
            type="submit"
          />
        </form>
      )}
    </Form>
  );
};

export default SignupForm;
