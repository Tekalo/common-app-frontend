import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
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
import {
  CommitmentType,
  FieldBooleanType,
  FieldStringType,
  NewRoleType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioSelectField,
  SingleSelectField,
} from '@/modules/sections/sign-up/fields';
import { Form } from 'houseform';
import { useEffect, useRef } from 'react';
import { z } from 'zod';

export interface IRoleForm {
  formType: CommitmentType[] | undefined;
  handleNewRole: (values: NewRoleType) => void;
  handleEditRole: (values: NewRoleType) => void;
  previousForm: NewRoleType | undefined;
  activeIndex: number;
  isLastRole: boolean;
}

const RoleForm: React.FC<IRoleForm> = ({
  formType,
  handleNewRole,
  handleEditRole,
  previousForm,
  activeIndex,
  isLastRole,
}) => {
  const partTimeForm = !(formType?.length === 1 && formType?.includes('full'));
  const isPaidRef = useRef<FieldBooleanType>(null);
  const employmentTypeRef = useRef<FieldStringType>(null);

  const executeScroll = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  useEffect(executeScroll);

  return (
    <Form<NewRoleType>
      onSubmit={(values) => {
        if (previousForm) {
          handleEditRole(values);
        } else {
          handleNewRole(values);
        }
      }}
      key={activeIndex}
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
          {partTimeForm && (
            <RadioSelectField
              fieldName="paid"
              label="Is this role paid or unpaid?"
              rowAlign={true}
              listOptions={PaidOptions}
              isSubmitted={isSubmitted}
              initialValue={previousForm?.paid}
              validator={z.boolean()}
              ref={isPaidRef}
            />
          )}

          <SingleSelectField
            fieldName="roleType"
            label="What type of role is this?"
            placeholder="Choose one"
            listOptions={RoleOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.roleType}
            validator={Roles}
          />

          {partTimeForm && (
            <>
              <SingleSelectField
                fieldName="employmentType"
                label="What type of opportunity is this?"
                placeholder="Choose one"
                listOptions={
                  isPaidRef.current?.value
                    ? EmploymentOptions.filter(
                        (option) => option.value !== 'volunteer'
                      )
                    : EmploymentOptions
                }
                isSubmitted={isSubmitted}
                initialValue={previousForm?.employmentType}
                validator={EmploymentType}
                ref={employmentTypeRef}
              />

              <FreeTextField
                fieldName="employmentType"
                label="If you chose other, please specify (optional)"
                placeholder="Type of opportunity"
                isSubmitted={isSubmitted}
                initialValue={previousForm?.employmentType}
                validator={OptionalString}
              />
            </>
          )}

          <FreeTextField
            fieldName="positionTitle"
            label="Positon Title"
            placeholder="Position title"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.positionTitle}
            validator={RequiredString}
          />

          <FreeTextField
            fieldName="jdUrl"
            label="Link to job description (optional)"
            placeholder="Job description URL"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.jdUrl}
            validator={OptionalString}
          />

          {/* Pay Section */}
          <FreeTextField
            fieldName="salaryRange"
            label={partTimeForm ? 'Pay range' : 'Salary range'}
            placeholder={partTimeForm ? 'Eg: $40 - 60 / hour' : 'Enter a range'}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.salaryRange}
            validator={RequiredString}
            disabled={!isPaidRef.current?.value}
          />

          {partTimeForm && (
            <FreeTextField
              fieldName="desiredHoursPerWeek"
              label="Desired hours per week (optional)"
              placeholder="Approximate number of hours"
              isSubmitted={isSubmitted}
              initialValue={previousForm?.desiredHoursPerWeek}
              validator={OptionalString}
              disabled={
                employmentTypeRef.current?.value === 'full-time employee'
              }
            />
          )}

          {/* Location Section */}
          <RadioSelectField
            fieldName="fullyRemote"
            label="Is this role fully remote?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.fullyRemote}
            validator={z.boolean()}
          />

          <FreeTextField
            fieldName="location"
            label="Location (optional)"
            placeholder="City, state"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.location}
            validator={OptionalString}
          />

          {/* TODO: Disable if Volunteer selected in oppType */}
          <SingleSelectField
            fieldName="visaSponsorship"
            label="Do you offer Visa sponsorship?"
            placeholder="Choose one"
            listOptions={VisaSponsorshipOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.visaSponsorship}
            validator={VisaSponsorship}
            disabled={employmentTypeRef.current?.value === 'volunteer'}
          />

          {/* Date Section */}
          <FreeTextField
            fieldName="desiredStartDate"
            label="Desired start date (optional)"
            placeholder="mm/dd/yyyy"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.desiredEndDate}
            validator={OptionalDate}
          />

          {partTimeForm && (
            <FreeTextField
              fieldName="desiredEndDate"
              label="Desired end date (optional)"
              placeholder="mm/dd/yyyy"
              isSubmitted={isSubmitted}
              initialValue={previousForm?.desiredEndDate}
              validator={OptionalDate}
            />
          )}

          {/* Requirement Section */}
          <MultiSelectField
            fieldName="desiredYoe"
            label="Desired years of experience"
            placeholder="Choose all that apply"
            selectionLabelMulti=" options selected"
            selectionLabelSingle=" option selected"
            listOptions={YOERangeOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.desiredYoe || []}
            validator={YOE_RANGE.array()}
          />

          <MultiSelectField
            fieldName="desiredSkills"
            label="Desired skills for the role (optional)"
            placeholder="Choose all that apply"
            selectionLabelMulti=" options selected"
            selectionLabelSingle=" option selected"
            listOptions={SkillOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.desiredSkills || []}
            validator={Skills.array().optional()}
          />

          <FreeTagField
            fieldName="desiredOtherSkills"
            label="Other desired skills if not listed above (optional)"
            placeholder="Desired skills separated by commas"
            isSubmitted={isSubmitted}
            initialValue={previousForm?.desiredOtherSkills}
            validator={OptionalString.array()}
          />

          <RadioSelectField
            fieldName="similarStaffed"
            label="Are there employees on staff with the same or similar role?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={previousForm?.similarStaffed}
            validator={z.boolean()}
          />

          <LongTextField
            fieldName="desiredImpactExp"
            label="Desired impact-related experience or passion that you are looking for in a candidate (optional)"
            placeholder="Your answer here. Maximum 200 words."
            isSubmitted={isSubmitted}
            initialValue={previousForm?.desiredImpactExp}
            validator={OptionalEssay}
          />

          <LongTextField
            fieldName="pitchEssay"
            label="How would you pitch this role in a few sentences?"
            placeholder="Your answer here. Maximum 200 words."
            isSubmitted={isSubmitted}
            initialValue={previousForm?.pitchEssay}
            validator={RequiredEssay}
          />

          {/* Form Control Button*/}
          <div className="space-y-6">
            <Button
              className="mt-4 w-full text-component-large"
              label={isLastRole ? 'Add another role' : 'Go to next role'}
              variant={ButtonVariant.OUTLINED}
              disabled={activeIndex >= 3}
              type="submit"
            />
            <Button
              className="mt-4 w-full text-component-large"
              label={'Go to review'}
              onClick={() => {
                console.log('Wees');
              }}
              type="button"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default RoleForm;
