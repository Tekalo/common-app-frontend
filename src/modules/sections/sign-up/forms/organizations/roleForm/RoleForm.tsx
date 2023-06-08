import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import {
  EMPLOYMENT_TYPE_TEXT,
  ERROR_TEXT,
  ORG_ROLE_FORM_TEXT,
} from '@/lang/en';
import {
  EmploymentOptions,
  PaidOptions,
  RoleOptions,
  SkillOptions,
  VisaSponsorshipOptions,
  YOERangeOptions,
  YesNoOptions,
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
import { jumpToFirstErrorMessage } from '@/lib/helpers/formHelpers';
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
  handleNewRole: (values: NewRoleType, reviewReady?: boolean) => void;
  handleEditRole: (values: NewRoleType, reviewReady?: boolean) => void;
}

const filterIfUnpaid = [
  EMPLOYMENT_TYPE_TEXT.fte,
  EMPLOYMENT_TYPE_TEXT.contractor,
  EMPLOYMENT_TYPE_TEXT.consultant,
  EMPLOYMENT_TYPE_TEXT.internship,
];

// returns a list of roles based on whether the role is paid and part time
const getEmploymentOptions = (isPaid = true, isPartTime: boolean) => {
  if (isPaid && isPartTime) {
    // If they are paid and part time, remove FTE and volunteer
    return EmploymentOptions.filter(
      (option) =>
        option.value !== EMPLOYMENT_TYPE_TEXT.volunteer &&
        option.value !== EMPLOYMENT_TYPE_TEXT.fte
    );
  } else if (isPaid && !isPartTime) {
    // If they are paid and full time, remove volunteer
    return EmploymentOptions.filter(
      (option) => option.value !== EMPLOYMENT_TYPE_TEXT.volunteer
    );
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
        const showEndDateField =
          partTimeOnly || employmentType !== EMPLOYMENT_TYPE_TEXT.fte;

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
                  label={ORG_ROLE_FORM_TEXT.FIELDS.paid.label}
                  rowAlign={true}
                  listOptions={PaidOptions}
                  isSubmitted={isSubmitted}
                  initialValue={previousForm?.paid ?? true}
                  validator={z.boolean()}
                />
              </div>

              <SingleSelectField
                fieldName="roleType"
                label={ORG_ROLE_FORM_TEXT.FIELDS.roleType.label}
                placeholder={ORG_ROLE_FORM_TEXT.FIELDS.roleType.placeholder}
                listOptions={RoleOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.roleType}
                validator={Roles}
              />

              {/* // HACK: Using the includes is risky here if we ever add a role with a " - " in it it may throw this component off */}
              <div className={fullTimeOnly ? 'hidden' : 'space-y-8'}>
                <SingleSelectField
                  fieldName="employmentTypeSelect"
                  label={ORG_ROLE_FORM_TEXT.FIELDS.employmentTypeSelect.label}
                  placeholder={
                    ORG_ROLE_FORM_TEXT.FIELDS.employmentTypeSelect.placeholder
                  }
                  listOptions={getEmploymentOptions(isPaid, partTimeOnly)}
                  isSubmitted={isSubmitted}
                  initialValue={
                    previousForm?.employmentType.includes(' - ')
                      ? previousForm?.employmentType.split(' - ')[0]
                      : previousForm?.employmentType ?? EMPLOYMENT_TYPE_TEXT.fte
                  }
                  validator={EmploymentType}
                />

                <FreeTextField
                  fieldName="employmentTypeText"
                  label={ORG_ROLE_FORM_TEXT.FIELDS.employmentTypeText.label}
                  placeholder={
                    ORG_ROLE_FORM_TEXT.FIELDS.employmentTypeText.placeholder
                  }
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
                label={ORG_ROLE_FORM_TEXT.FIELDS.positionTitle.label}
                placeholder={
                  ORG_ROLE_FORM_TEXT.FIELDS.positionTitle.placeholder
                }
                isSubmitted={isSubmitted}
                initialValue={previousForm?.positionTitle}
                validator={RequiredString}
              />

              <FreeTextField
                fieldName="jdUrl"
                label={ORG_ROLE_FORM_TEXT.FIELDS.jdUrl.label}
                placeholder={ORG_ROLE_FORM_TEXT.FIELDS.jdUrl.placeholder}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.jdUrl}
                validator={OptionalString}
              />
            </>
            {/* Pay Section */}
            <>
              <FreeTextField
                fieldName="salaryRange"
                label={
                  fullTimeOnly
                    ? ORG_ROLE_FORM_TEXT.FIELDS.salaryRange.labelFte
                    : ORG_ROLE_FORM_TEXT.FIELDS.salaryRange.labelPte
                }
                placeholder={ORG_ROLE_FORM_TEXT.FIELDS.salaryRange.placeholder}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.salaryRange}
                validator={isPaid ? RequiredString : OptionalString}
                disabled={!isPaid}
              />
              {!fullTimeOnly && (
                <FreeTextField
                  fieldName="desiredHoursPerWeek"
                  label={ORG_ROLE_FORM_TEXT.FIELDS.desiredHoursPerWeek.label}
                  placeholder={
                    ORG_ROLE_FORM_TEXT.FIELDS.desiredHoursPerWeek.placeholder
                  }
                  isSubmitted={isSubmitted}
                  initialValue={previousForm?.desiredHoursPerWeek}
                  validator={OptionalString}
                  disabled={employmentType === EMPLOYMENT_TYPE_TEXT.fte}
                />
              )}
            </>
            {/* Location Section */}
            <>
              <RadioSelectField
                fieldName="fullyRemote"
                label={ORG_ROLE_FORM_TEXT.FIELDS.fullyRemote.label}
                rowAlign={true}
                listOptions={YesNoOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.fullyRemote ?? false}
                validator={z.boolean()}
              />

              <FreeTextField
                fieldName="location"
                label={ORG_ROLE_FORM_TEXT.FIELDS.location.label}
                placeholder={ORG_ROLE_FORM_TEXT.FIELDS.location.placeholder}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.location}
                validator={OptionalString}
              />

              <SingleSelectField
                fieldName="visaSponsorship"
                label={ORG_ROLE_FORM_TEXT.FIELDS.visaSponsorship.label}
                placeholder={
                  ORG_ROLE_FORM_TEXT.FIELDS.visaSponsorship.placeholder
                }
                listOptions={VisaSponsorshipOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.visaSponsorship}
                validator={
                  employmentType === EMPLOYMENT_TYPE_TEXT.volunteer
                    ? undefined
                    : VisaSponsorship
                }
                disabled={employmentType === EMPLOYMENT_TYPE_TEXT.volunteer}
              />
            </>
            {/* Date Section */}
            <>
              <FreeTextField
                fieldName="desiredStartDate"
                label={ORG_ROLE_FORM_TEXT.FIELDS.desiredStartDate.label}
                placeholder={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredStartDate.placeholder
                }
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredStartDate}
                validator={OptionalDate}
              />

              {showEndDateField && (
                <FreeTextField
                  fieldName="desiredEndDate"
                  label={ORG_ROLE_FORM_TEXT.FIELDS.desiredEndDate.label}
                  placeholder={
                    ORG_ROLE_FORM_TEXT.FIELDS.desiredEndDate.placeholder
                  }
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
                label={ORG_ROLE_FORM_TEXT.FIELDS.desiredYoe.label}
                placeholder={ORG_ROLE_FORM_TEXT.FIELDS.desiredYoe.placeholder}
                selectionLabelMulti={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredYoe.selectionLabelMulti
                }
                selectionLabelSingle={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredYoe.selectionLabelSingle
                }
                listOptions={YOERangeOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredYoe || []}
                validator={YOE_RANGE.array().min(1, ERROR_TEXT.required)}
              />
              <MultiSelectField
                fieldName="desiredSkills"
                label={ORG_ROLE_FORM_TEXT.FIELDS.desiredSkills.label}
                placeholder={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredSkills.placeholder
                }
                selectionLabelMulti={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredSkills.selectionLabelMulti
                }
                selectionLabelSingle={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredSkills.selectionLabelSingle
                }
                listOptions={SkillOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredSkills || []}
                validator={Skills.array().optional()}
              />
              <FreeTagField
                fieldName="desiredOtherSkills"
                label={ORG_ROLE_FORM_TEXT.FIELDS.desiredOtherSkills.label}
                placeholder={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredOtherSkills.placeholder
                }
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredOtherSkills || []}
                validator={RequiredString.array().optional()}
              />
              <RadioSelectField
                fieldName="similarStaffed"
                label={ORG_ROLE_FORM_TEXT.FIELDS.similarStaffed.label}
                rowAlign={true}
                listOptions={YesNoOptions}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.similarStaffed ?? false}
                validator={z.boolean()}
              />
              <LongTextField
                fieldName="desiredImpactExp"
                label={ORG_ROLE_FORM_TEXT.FIELDS.desiredImpactExp.label}
                placeholder={
                  ORG_ROLE_FORM_TEXT.FIELDS.desiredImpactExp.placeholder
                }
                isSubmitted={isSubmitted}
                initialValue={previousForm?.desiredImpactExp}
                validator={OptionalEssay}
              />
              <LongTextField
                fieldName="pitchEssay"
                label={ORG_ROLE_FORM_TEXT.FIELDS.pitchEssay.label}
                placeholder={ORG_ROLE_FORM_TEXT.FIELDS.pitchEssay.placeholder}
                isSubmitted={isSubmitted}
                initialValue={previousForm?.pitchEssay}
                validator={RequiredEssay}
              />
            </>
            {/* Form Control Button*/}
            <div className="space-y-6">
              <Button
                name="addRole"
                className="mt-4 w-full text-component-large"
                label={ORG_ROLE_FORM_TEXT.BUTTONS.addRole.label}
                variant={ButtonVariant.OUTLINED}
                disabled={activeIndex >= 3}
                type="submit"
              />
              <Button
                name="review"
                className="mt-4 w-full text-component-large"
                label={ORG_ROLE_FORM_TEXT.BUTTONS.review.label}
                onClick={() => {
                  reviewReadyRef.current = isValid;
                  submit().then(() => {
                    jumpToFirstErrorMessage();
                  });
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
