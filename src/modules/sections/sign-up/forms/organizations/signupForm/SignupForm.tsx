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
  EOE,
  Email,
  OrgSize,
  OrgType,
  PhoneNumber,
  RequiredString,
} from '@/lib/enums';

import Button from '@/components/buttons/Button/Button';
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
  previousForm: NewOrgType | undefined;
}

const SignupForm: React.FC<ISignupForm> = ({ previousForm, handleSubmit }) => {
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
          className="flex flex-col space-y-8 lg:space-y-7"
        >
          {/* Org Name */}
          <FreeTextField
            fieldName="organization.name"
            label="Organization name"
            placeholder="Organization's legal name"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.name}
            validator={RequiredString}
          />

          {/* Org Type */}
          <SingleSelectField
            fieldName="organization.type"
            label="Organization type"
            placeholder="Choose one"
            listOptions={OrgTypeOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.type}
            tooltipText="We accept applications from 501(c)(3) organizations. Other types of impact-driven organizations are welcome to submit opportunities and will be considered on a case by case basis."
            validator={OrgType}
          />

          {/* Org Size */}
          <SingleSelectField
            fieldName="organization.size"
            label="Organization size"
            placeholder="Choose one"
            listOptions={OrgSizeOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.size}
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
            initialValue={previousForm?.organization.impactAreas || []}
            validator={Causes.array().min(1, {
              message: 'You must choose at least one impact area',
            })}
          />

          {/* Contact name */}
          <FreeTextField
            fieldName="contact.name"
            label="Contact name"
            placeholder="Full name"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.contact.name}
            validator={RequiredString}
          />

          {/* Contact email */}
          <FreeTextField
            fieldName="contact.email"
            label="Contact email"
            placeholder="Email address"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.contact.email}
            validator={Email}
          />

          {/* Contact number */}
          <FreeTextField
            fieldName="contact.phone"
            label="Contact phone (optional)"
            placeholder="+1 (555) 555-5555"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.contact.phone}
            validator={PhoneNumber.optional()}
            tooltipText="If provided, your number will be used to contact you about your application. It won’t be used for marketing."
          />

          {/* Org Employment Types */}
          <SelectGroupField
            fieldName="commitmentTypes"
            label={
              'What type(s) of positions are you looking to fill? Choose all that apply.'
            }
            helperText={
              'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.'
            }
            listOptions={CommitmentOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.commitmentTypes}
            validator={CommitmentType.array()}
          />

          {/* Org EOE */}
          <SelectBooleanField
            fieldName="organization.eoe"
            label={EEOC_LABEL}
            placeholder="Choose one"
            listOptions={TrueFalseOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.organization.eoe}
            validator={EOE}
          />

          {/* Form Control Button*/}
          <div className="pt-2">
            <Button
              className="w-full text-component-large"
              label="Next"
              type="submit"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default SignupForm;
