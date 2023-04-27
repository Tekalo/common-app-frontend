import Button from '@/components/buttons/Button/Button';
import {
  CauseOptions,
  EmploymentOptions,
  TrueFalseOptions,
} from '@/lib/constants/selects';
import { EEOC_LABEL } from '@/lib/constants/text';
import { createOptionList } from '@/lib/helpers/formHelpers';
import {
  Causes,
  EmploymentType,
  OrgSize,
  OrgType,
  validations,
} from '@/lib/schemas';
import { NewOrg } from '@/lib/types';
import {
  FreeTextField,
  MultiSelectField,
  SelectBooleanField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { z } from 'zod';

export interface ISignupForm {
  handleSubmit: (values: NewOrg) => void;
}

const SignupForm: React.FC<ISignupForm> = ({ handleSubmit }) => {
  return (
    <Form<NewOrg>
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
            initialValue={''}
            validator={validations.requiredString}
          />

          {/* Org Type */}
          <SingleSelectField
            fieldName="organization.impactAreas"
            label="Organization type"
            placeholder="Choose one"
            listOptions={createOptionList(OrgType.options)}
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={OrgType}
          />

          {/* Org Size */}
          <SingleSelectField
            fieldName="organization.size"
            label="Organization size"
            placeholder="Choose one"
            listOptions={createOptionList(OrgSize.options).map((option) => {
              return {
                value: option.value,
                displayText: option.displayText + ' employees',
              };
            })}
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={OrgSize}
          />

          {/* Org Impact Areas */}
          <MultiSelectField
            fieldName="organization.impactAreas"
            label="Impact area(s) the organization works on"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Areas selected"
            selectionLabelSingle=" Area selected"
            listOptions={CauseOptions.concat({
              value: 'other',
              displayText: 'Other',
            })}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={z
              .array(Causes)
              .nonempty('You must select at least one impact area')}
          />

          {/* Contact name */}
          <FreeTextField
            fieldName="contact.name"
            label="Contact name"
            placeholder="Full name"
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={validations.requiredString}
          />

          {/* Contact email */}
          <FreeTextField
            fieldName="contact.email"
            label="Contact email"
            placeholder="Email address"
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={validations.email}
          />

          {/* Contact number */}
          <FreeTextField
            fieldName="contact.phone"
            label="Contact phone (optional)"
            placeholder="+1 (555) 555-5555"
            isSubmitted={isSubmitted}
            initialValue={''}
            validator={z.string().optional()}
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
            listOptions={EmploymentOptions}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={z
              .array(EmploymentType)
              .nonempty('You must select at least one option')}
          />

          {/* Org EOE */}
          <SelectBooleanField
            fieldName="organization.eoe"
            label={EEOC_LABEL}
            placeholder="Choose one"
            listOptions={TrueFalseOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.boolean().refine((value) => value === true, {
              message:
                'Tekalo only works with Equal Opportunity Employers as defined by the EEOC.',
            })}
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
