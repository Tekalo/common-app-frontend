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
  NewRoleType,
  PartialNewRoleType,
  RoleRefType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioSelectField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { SyntheticEvent, useEffect, useRef } from 'react';
import { z } from 'zod';

export interface IRoleForm {
  formType: CommitmentType[] | undefined;
  previousForm: NewRoleType | undefined;
  activeIndex: number;
  isLastRole: boolean;
  handleNewRole: (values: NewRoleType, reviewReady?: boolean) => void;
  handleEditRole: (values: NewRoleType, reviewReady?: boolean) => void;
}

const filterIfUnpaid = [
  'full-time employee',
  'contractor',
  'consultant',
  'internship',
];

// returns a list of roles based on whether the role is paid and part time
const getEmploymentOptions = (isPaid = true, isPartTime: boolean) => {
  if (isPaid && isPartTime) {
    // If they are paid and part time, remove FTE and volunteer
    return EmploymentOptions.filter(
      (option) =>
        option.value !== 'volunteer' && option.value !== 'full-time employee'
    );
  } else if (isPaid && !isPartTime) {
    // If they are paid and full time, remove volunteer
    return EmploymentOptions.filter((option) => option.value !== 'volunteer');
  } else if ((!isPaid && isPartTime) || (!isPaid && !isPartTime)) {
    // If they are unpaid and full or part time, remove filterIfUnpaid options
    return EmploymentOptions.filter((option) => {
      return !filterIfUnpaid.includes(option.value);
    });
  } else {
    return EmploymentOptions;
  }
};

const RoleForm: React.FC<IRoleForm> = ({
  formType,
  handleNewRole,
  handleEditRole,
  previousForm,
  activeIndex,
  isLastRole,
}) => {
  const partTimeOnly = formType?.length === 1 && formType?.includes('part');
  const fullTimeOnly = formType?.length === 1 && formType?.includes('full');

  const formRef = useRef<RoleRefType>(null);
  const reviewReadyRef = useRef<boolean>(false);

  const executeScroll = () => window.scrollTo({ top: 0, behavior: 'auto' });
  useEffect(executeScroll, []);

  const doSubmit = (values: any) => {
    const employmentType = values.employmentTypeText
      ? values.employmentTypeSelect + ' - ' + values.employmentTypeText
      : values.employmentTypeSelect;

    // for each value if it is an empty string empty array set it to undefined
    Object.keys(values).forEach((key) => {
      if (values[key] === '' || values[key].length === 0) {
        values[key] = undefined;
      }
    });

    const NewRole: NewRoleType = {
      ...values,
      source: '',
      employmentType,
    };

    if (previousForm) {
      handleEditRole(NewRole, reviewReadyRef.current);
    } else {
      handleNewRole(NewRole, reviewReadyRef.current);
    }
  };

  return (
    <Form<PartialNewRoleType>
      onSubmit={(values) => {
        doSubmit(values);
      }}
      key={activeIndex}
      ref={formRef}
    >
      {({ isSubmitted, isValid, submit, value: formValue }) => {
        const isPaid = formValue.paid;
        const employmentType = formValue.employmentTypeSelect;

        return (
          <form
            onSubmit={(e: SyntheticEvent) => {
              e.preventDefault();
              submit();
            }}
            className="flex flex-col space-y-8"
          >
            {/* Description Section */}
            <>
              <div className={fullTimeOnly ? 'hidden' : ''}>
                <RadioSelectField
                  fieldName="paid"
                  label="Is this role paid or unpaid?"
                  rowAlign={true}
                  listOptions={PaidOptions}
                  isSubmitted={isSubmitted}
                  initialValue={previousForm?.paid ?? true}
                  validator={z.boolean()}
                />
              </div>

              <SingleSelectField
                fieldName="roleType"
                label="What type of role is this?"
                placeholder="Choose one"
                listOptions={RoleOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.roleType}
                validator={Roles}
              />

              {/* // HACK: Using the includes is risky here if we ever add a role with a " - " in it it may throw this component off */}
              <div className={fullTimeOnly ? 'hidden' : 'space-y-8'}>
                <SingleSelectField
                  fieldName="employmentTypeSelect"
                  label="What type of opportunity is this?"
                  placeholder="Choose one"
                  listOptions={getEmploymentOptions(isPaid, partTimeOnly)}
                  isSubmitted={isSubmitted}
                  initialValue={
                    previousForm?.employmentType.includes(' - ')
                      ? previousForm?.employmentType.split(' - ')[0]
                      : previousForm?.employmentType ?? undefined
                  }
                  validator={EmploymentType}
                />

                <FreeTextField
                  fieldName="employmentTypeText"
                  label="If you chose other, please specify (optional)"
                  placeholder="Type of opportunity"
                  isSubmitted={isSubmitted}
                  initialValue={
                    previousForm?.employmentType.includes(' - ')
                      ? previousForm?.employmentType.split(' - ')[1]
                      : undefined
                  }
                  validator={OptionalString}
                />
              </div>

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
            </>
            {/* Pay Section */}
            <>
              <FreeTextField
                fieldName="salaryRange"
                label={fullTimeOnly ? 'Salary range' : 'Pay range'}
                placeholder={'Enter a range'}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.salaryRange}
                validator={isPaid ? RequiredString : OptionalString}
                disabled={!isPaid}
              />
              {!fullTimeOnly && (
                <FreeTextField
                  fieldName="desiredHoursPerWeek"
                  label="Desired hours per week (optional)"
                  placeholder="Approximate number of hours"
                  isSubmitted={isSubmitted}
                  initialValue={previousForm?.desiredHoursPerWeek}
                  validator={OptionalString}
                  disabled={employmentType === 'full-time employee'}
                />
              )}
            </>
            {/* Location Section */}
            <>
              <RadioSelectField
                fieldName="fullyRemote"
                label="Is this role fully remote?"
                rowAlign={true}
                listOptions={YesNoOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.fullyRemote ?? false}
                validator={z.boolean()}
              />

              <FreeTextField
                fieldName="location"
                label="Location (optional)"
                placeholder="City, state (separate multiple locations with commas)"
                isSubmitted={isSubmitted}
                initialValue={previousForm?.location}
                validator={OptionalString}
              />

              <SingleSelectField
                fieldName="visaSponsorship"
                label="Do you offer Visa sponsorship?"
                placeholder="Choose one"
                listOptions={VisaSponsorshipOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.visaSponsorship}
                validator={
                  employmentType === 'volunteer' ? undefined : VisaSponsorship
                }
                disabled={employmentType === 'volunteer'}
              />
            </>
            {/* Date Section */}
            <>
              <FreeTextField
                fieldName="desiredStartDate"
                label="Desired start date (optional)"
                placeholder="mm/dd/yyyy"
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredEndDate}
                validator={OptionalDate}
              />

              {partTimeOnly && (
                <FreeTextField
                  fieldName="desiredEndDate"
                  label="Desired end date (optional)"
                  placeholder="mm/dd/yyyy"
                  isSubmitted={isSubmitted}
                  initialValue={previousForm?.desiredEndDate}
                  validator={OptionalDate}
                />
              )}
            </>
            {/* Requirement Section */}
            <>
              <MultiSelectField
                fieldName="desiredYoe"
                label="Desired years of experience"
                placeholder="Choose all that apply"
                selectionLabelMulti=" options selected"
                selectionLabelSingle=" option selected"
                listOptions={YOERangeOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredYoe || []}
                validator={YOE_RANGE.array().min(1)}
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
                initialValue={previousForm?.desiredOtherSkills || []}
                validator={RequiredString.array().optional()}
              />

              <RadioSelectField
                fieldName="similarStaffed"
                label="Are there employees on staff with the same or similar role?"
                rowAlign={true}
                listOptions={YesNoOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.similarStaffed ?? false}
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
            </>
            {/* Form Control Button*/}
            <div className="space-y-6">
              <Button
                name="nextRole"
                className="mt-4 w-full text-component-large"
                label={isLastRole ? 'Add another role' : 'Go to next role'}
                variant={ButtonVariant.OUTLINED}
                disabled={activeIndex >= 3}
                type="submit"
              />
              <Button
                name="review"
                className="mt-4 w-full text-component-large"
                label={'Go to review'}
                onClick={() => {
                  reviewReadyRef.current = isValid;
                  submit();
                }}
                type="button"
              />
            </div>
          </form>
        );
      }}
    </Form>
  );
};

export default RoleForm;
