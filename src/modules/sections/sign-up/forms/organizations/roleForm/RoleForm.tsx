// TODO Breadcrumbs based on the number of submitted roles
// TODO Aware of what "type" of role form to render
// TODO On submit, add the current form to state, clear the form, move breadcrumb to the next form
// TODO Should allow someone to click a breadcrumb to "navigate" to that form and edit it!

/**
 * Therefore this component needs to know:
 * - How many forms have been submitted (to render breadcrumbs)
 * - Which form is currently being submitted
 * - Which type of form fields to render based on part time, full time, or both
 *
 * So the props need to be:
 * - formList: Array of forms that have been submitted
 * - currentForm: The form that is currently being submitted
 * - formType: The type of form to render (part time, full time, or both)
 *
 * GOOD MORNING! Current state is based on the previous commetns
 * You just wrote the aprent handleNewOpportunity function and needed to update this component props... then render the form...
 */

import Button from '@/components/buttons/Button/Button';
import {
  OpportunityOptions,
  RoleOptions,
  RoleYoeOptions,
  SkillOptions,
  VisaSponsorshipOptions,
  YesNoOptions,
} from '@/lib/constants/selects';
import { ROLE_YOE, Skills } from '@/lib/schemas';
import { NewRole, OrgRoles } from '@/lib/types';
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
  formType: OrgRoles | undefined;
  handleNewRole: (values: NewRole) => void;
  // handleEditRole: (values: NewRole) => void;
}

const RoleForm: React.FC<IRoleForm> = ({
  // formList,
  formType,
  handleNewRole,
  // handleEditRole,
}) => {
  return (
    <Form<NewRole>
      onSubmit={(values) => {
        console.log(values);
        handleNewRole(values);
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
          {/* Description Section */}
          {/* TODO: Conditionally render */}
          <RadioSelectField
            fieldName="paid"
            label="Is this role paid or unpaid?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.boolean()}
          />

          <SingleSelectField
            fieldName="roleType"
            label="What type of role is this?"
            placeholder="Choose one"
            listOptions={RoleOptions.concat({
              value: 'other',
              displayText: 'Other',
            })}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255)}
          />

          <FreeTextField
            fieldName="roleType"
            label="If you chose other, please specify (optional"
            placeholder="Type of role"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255).optional()}
          />

          {/* TODO: Conditionally render */}
          <SingleSelectField
            fieldName="employmentType"
            label="What type of opportunity is this?"
            placeholder="Choose one"
            listOptions={OpportunityOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255)}
          />

          <FreeTextField
            fieldName="positionTitle"
            label="Positon Title"
            placeholder="Position title"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255)}
          />

          <FreeTextField
            fieldName="jdUrl"
            label="Link to job description (optional)"
            placeholder="Job description URL"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255).optional()}
          />

          {/* Pay Section */}
          {/* TODO: Conditional Label */}
          <FreeTextField
            fieldName="salaryRange"
            label="Pay range"
            placeholder="Eg: $40 - 60 / hour"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255)}
          />

          {/* TODO: Conditional Render */}
          <FreeTextField
            fieldName="desiredHoursPerWeek"
            label="Desired hours per week (optional)"
            placeholder="Approximate number of hours"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255).optional().nullable()}
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
            validator={z.string().max(255).optional()}
          />

          {/* TODO: Disable if Volunteer selected in oppType */}
          <SingleSelectField
            fieldName="visaSponsorship"
            label="Do you offer Visa sponsorship?"
            placeholder="Choose one"
            listOptions={VisaSponsorshipOptions}
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255)}
          />

          {/* Date Section */}
          <FreeTextField
            fieldName="desiredStartDate"
            label="Desired start date (optional)"
            placeholder="mm/dd/yyyy"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255).optional()}
          />

          {/* TODO: Conditionally render */}
          <FreeTextField
            fieldName="desiredEndDate"
            label="Desired end date (optional)"
            placeholder="mm/dd/yyyy"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255).optional()}
          />

          {/* Requirement Section */}
          <MultiSelectField
            fieldName="desiredYoe"
            label="Desired years of experience"
            placeholder="Choose all that apply"
            selectionLabelMulti=" options selected"
            selectionLabelSingle=" option selected"
            listOptions={RoleYoeOptions}
            isSubmitted={isSubmitted}
            initialValue={[]}
            validator={z.array(ROLE_YOE)}
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
            validator={z.array(Skills).optional()}
          />

          <FreeTagField
            fieldName="desiredOtherSkills"
            label="Other desired skills if not listed above (optional)"
            placeholder="Desired skills separated by commas"
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(255).optional()}
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
            validator={z.string().max(5000).optional()}
          />

          <LongTextField
            fieldName="pitchEssay"
            label="How would you pitch this role in a few sentences?"
            placeholder="Your answer here. Maximum 200 words."
            isSubmitted={isSubmitted}
            initialValue={undefined}
            validator={z.string().max(5000).optional()}
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
