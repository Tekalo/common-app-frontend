import Button from '@/components/buttons/Button/Button';
import {
  EmploymentOptions,
  PaidOptions,
  RoleOptions,
  SkillOptions,
  VisaSponsorshipOptions,
  YesNoOptions,
  YOERangeOptions,
} from '@/lib/constants/selects';
import {
  EmploymentType,
  OptionalDate,
  OptionalEssay,
  OptionalString,
  RequiredEssay,
  RequiredString,
  Roles,
  Skills,
  VisaSponsorship,
  YOE_RANGE,
} from '@/lib/enums';
import { CommitmentType, NewRoleType } from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioSelectField,
  SingleSelectField,
} from '@/modules/sections/sign-up/fields';
import { Form } from 'houseform';
import { z } from 'zod';

export interface IRoleForm {
  // formList: [];
  formType: CommitmentType[] | undefined;
  handleNewRole: (values: NewRoleType) => void;
  // handleEditRole: (values: NewRole) => void;
}

const RoleForm: React.FC<IRoleForm> = ({
  // formList,
  formType,
  handleNewRole,
  // handleEditRole,
}) => {
  return (
    <Form<NewRoleType>
      onSubmit={(values) => {
        console.log(values);
        handleNewRole(values);
      }}
    >
      {({ isSubmitted, submit, reset }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit().then(() => {
              reset();
            });
          }}
          className="flex flex-col space-y-8"
        >
          {/* Description Section */}
          {/* TODO: Conditionally render */}
          <RadioSelectField
            fieldName="paid"
            label="Is this role paid or unpaid?"
            rowAlign={true}
            listOptions={PaidOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.boolean()}
          />

          <SingleSelectField
            fieldName="roleType"
            label="What type of role is this?"
            placeholder="Choose one"
            listOptions={RoleOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={Roles}
          />

          {/* TODO: Conditionally render */}
          <SingleSelectField
            fieldName="employmentType"
            label="What type of opportunity is this?"
            placeholder="Choose one"
            listOptions={EmploymentOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={EmploymentType}
          />

          <FreeTextField
            fieldName="employmentType"
            label="If you chose other, please specify (optional)"
            placeholder="Type of opportunity"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalString}
          />

          <FreeTextField
            fieldName="positionTitle"
            label="Positon Title"
            placeholder="Position title"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={RequiredString}
          />

          <FreeTextField
            fieldName="jdUrl"
            label="Link to job description (optional)"
            placeholder="Job description URL"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalString}
          />

          {/* Pay Section */}
          {/* TODO: Conditional Label */}
          <FreeTextField
            fieldName="salaryRange"
            label="Pay range"
            placeholder="Eg: $40 - 60 / hour"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={RequiredString}
          />

          {/* TODO: Conditional Render */}
          <FreeTextField
            fieldName="desiredHoursPerWeek"
            label="Desired hours per week (optional)"
            placeholder="Approximate number of hours"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalString}
          />

          {/* Location Section */}
          <RadioSelectField
            fieldName="fullyRemote"
            label="Is this role fully remote?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.boolean()}
          />

          <FreeTextField
            fieldName="location"
            label="Location (optional)"
            placeholder="City, state"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalString}
          />

          {/* TODO: Disable if Volunteer selected in oppType */}
          <SingleSelectField
            fieldName="visaSponsorship"
            label="Do you offer Visa sponsorship?"
            placeholder="Choose one"
            listOptions={VisaSponsorshipOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={VisaSponsorship}
          />

          {/* Date Section */}
          <FreeTextField
            fieldName="desiredStartDate"
            label="Desired start date (optional)"
            placeholder="mm/dd/yyyy"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalDate}
          />

          {/* TODO: Conditionally render */}
          <FreeTextField
            fieldName="desiredEndDate"
            label="Desired end date (optional)"
            placeholder="mm/dd/yyyy"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalDate}
          />

          {/* Requirement Section */}
          <MultiSelectField
            fieldName="desiredYoe"
            label="Desired years of experience"
            placeholder="Choose all that apply"
            selectionLabelMulti=" options selected"
            selectionLabelSingle=" option selected"
            listOptions={YOERangeOptions}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={YOE_RANGE}
          />

          <MultiSelectField
            fieldName="desiredSkills"
            label="Desired skills for the role (optional)"
            placeholder="Choose all that apply"
            selectionLabelMulti=" options selected"
            selectionLabelSingle=" option selected"
            listOptions={SkillOptions}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={Skills.optional()}
          />

          <FreeTagField
            fieldName="desiredOtherSkills"
            label="Other desired skills if not listed above (optional)"
            placeholder="Desired skills separated by commas"
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={OptionalString.array()}
          />

          <RadioSelectField
            fieldName="similarStaffed"
            label="Are there employees on staff with the same or similar role?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.boolean()}
          />

          {/* TODO: Essay Section */}
          <LongTextField
            fieldName="desiredImpactExp"
            label="Desired impact-related experience or passion that you are looking for in a candidate (optional)"
            placeholder="Your answer here. Maximum 200 words."
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={OptionalEssay}
          />

          <LongTextField
            fieldName="pitchEssay"
            label="How would you pitch this role in a few sentences?"
            placeholder="Your answer here. Maximum 200 words."
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={RequiredEssay}
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

export default RoleForm;
