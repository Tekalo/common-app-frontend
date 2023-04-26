import Button from '@/components/buttons/Button/Button';
import {
  AuthorizationOptions,
  CauseOptions,
  EmploymentOptions,
  RoleOptions,
  USDROptions,
  YesNoOptions,
} from '@/lib/constants/selects';
import { USDR_DISCLAIMER } from '@/lib/constants/text';
import { createOptionList } from '@/lib/helpers/formHelpers';
import {
  EmploymentType,
  InterestGovtEmplTypes,
  OpenToRelocate,
  OpenToRemote,
  ReferenceAttribution,
  Roles,
  TrueFalseString,
  WorkAuthorization,
} from '@/lib/schemas';
import { DraftSubmission, InterestFields } from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioGroupField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import RankChoiceField from '@/sections/sign-up/fields/RankChoiceField';
import { FieldInstance, Form, FormInstance } from 'houseform';
import { useEffect, useRef } from 'react';
import { z } from 'zod';

export interface IInterestForm {
  handleSubmit: (_values: InterestFields) => void;
  handleSave: (_values: DraftSubmission) => void;
  savedForm: DraftSubmission | undefined;
}

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormInstance<InterestFields>>(null);
  const employmentTypeRef =
    useRef<FieldInstance<string[], IInterestForm>>(null);
  const govRef = useRef<FieldInstance<boolean, IInterestForm>>(null);

  useEffect(() => {
    // Need to use the inital value once we get it,
    // so we have to reset the form for it to initialize
    formRef.current?.reset();
    formRef.current?.recomputeErrors();
  }, [savedForm]);

  const convertStringFieldsToBool = <T,>(value: T): T => {
    const newVals = { ...savedForm, ...value };

    // Bc of radio group weirdness, we need to convert the values here
    if (typeof newVals.interestGovt === 'string') {
      newVals.interestGovt = newVals.interestGovt === 'true';
    }
    if (typeof newVals.previousImpactExperience === 'string') {
      newVals.previousImpactExperience =
        newVals.previousImpactExperience === 'true';
    }

    return newVals as T;
  };

  const doSave = () => {
    if (formRef.current) {
      // We need to convert strings to booleans for specific fields
      // because radio inputs need to have string values
      handleSave(convertStringFieldsToBool(formRef.current.value));
    }
  };

  const doSubmit = (values: InterestFields) => {
    if (formRef.current) {
      // We need to convert strings to booleans for specific fields
      // because radio inputs need to have string values
      handleSubmit(convertStringFieldsToBool(values));
    }
  };

  return (
    <Form<InterestFields> onSubmit={(values) => doSubmit(values)} ref={formRef}>
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-8"
        >
          {/* Employment */}
          <SelectGroupField
            fieldName="interestEmploymentType"
            label={
              'What type(s) of opportunities are you interested in? Choose all that apply'
            }
            helperText={
              'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.'
            }
            fieldRef={employmentTypeRef}
            listOptions={EmploymentOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestEmploymentType}
            validator={z
              .array(EmploymentType)
              .nonempty('You must select at least one option')}
          />
          {/* Hours per week */}
          <FreeTextField
            fieldName="hoursPerWeek"
            listenTo={['interestEmploymentType']}
            label="Hours per week you are able to commit (optional)"
            placeholder="Approximate number of hours"
            disabled={
              employmentTypeRef.current?.value.length === 1 &&
              employmentTypeRef.current?.value[0] === 'full'
            }
            isSubmitted={isSubmitted}
            initialValue={savedForm?.hoursPerWeek || ''}
            validator={z.string().optional()}
          />
          {/* Roles */}
          <MultiSelectField
            fieldName="interestRoles"
            label="What role(s) are you interested in?"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Role selected"
            selectionLabelSingle=" Roles selected"
            listOptions={RoleOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestRoles || []}
            validator={z
              .array(Roles)
              .nonempty('You must select at least one role')}
          />
          {/* Location */}
          <FreeTextField
            fieldName="currentLocation"
            label="Current location"
            placeholder="City, state and/or country"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.currentLocation || ''}
            validator={z.string().nonempty('Current location is required')}
          />
          {/* Reloaction*/}
          <SingleSelectField
            fieldName="openToRelocate"
            label="Open to relocating?"
            placeholder="Choose one"
            listOptions={createOptionList(OpenToRelocate.options)}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.openToRelocate}
            validator={OpenToRelocate}
          />
          {/* Remote */}
          <SingleSelectField
            fieldName="openToRemote"
            label="Open to remote?"
            placeholder="Choose one"
            listOptions={createOptionList(OpenToRemote.options)}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.openToRemote}
            validator={OpenToRemote}
          />
          {/* Salary*/}
          <FreeTextField
            fieldName="desiredSalary"
            label="Desired salary (optional)"
            placeholder="Enter a range"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.desiredSalary || ''}
            validator={z.string().optional()}
          />
          {/* Causes */}
          <RankChoiceField
            fieldName="interestCauses"
            selectLabel={
              'Which causes are you interested in hearing opportunities for?'
            }
            rankLabel={
              'Rank the causes you would be interested in working on with 1 being the highest.'
            }
            placeholder="Choose all that apply"
            selectionLabelMulti=" Causes selected"
            selectionLabelSingle=" Cause selected"
            listOptions={CauseOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestCauses || []}
            validator={z
              .array(z.string())
              .nonempty('You must select at least one cause')}
          />
          {/* Other Causes*/}
          <FreeTagField
            fieldName="otherCauses"
            label="Other causes (optional)"
            placeholder="Additional causes separated by commas"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.otherCauses || []}
            validator={z.array(z.string()).nullable().optional()}
          />
          {/* Work Auth*/}
          <SingleSelectField
            fieldName="workAuthorization"
            label="Work authorization (optional)"
            placeholder="Choose one"
            listOptions={AuthorizationOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm ? savedForm.workAuthorization : ''}
            validator={WorkAuthorization}
          />
          {/* Gov Interest*/}
          <RadioGroupField
            fieldName="interestGovt"
            label="Are you interested in U.S. state or local government opportunities?"
            helperText={USDR_DISCLAIMER}
            fieldRef={govRef}
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={String(savedForm?.interestGovt)}
            validator={TrueFalseString}
          />
          {/* Gov Opp Type*/}
          <MultiSelectField
            fieldName="interestGovtEmplTypes"
            listenTo={['interestGovt']}
            label="Which opportunities from USDR are you interested in?"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Opportunity selected"
            selectionLabelSingle=" Opportunities selected"
            listOptions={USDROptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestGovtEmplTypes || []}
            validator={z.array(InterestGovtEmplTypes).optional()}
            disabled={govRef.current?.value.toString() === 'false'}
          />
          {/* Previous XP */}
          <RadioGroupField
            fieldName="previousImpactExperience"
            label="Do you have previous experience working at a non-profit or a public service organization?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={String(savedForm?.previousImpactExperience)}
            validator={TrueFalseString}
          />
          {/* Essay */}
          <LongTextField
            fieldName="essayResponse"
            label="If you had unlimited resources, what problem would you choose to solve and why?"
            placeholder="Write as much as you’d like, suggested up to 250 words."
            isSubmitted={isSubmitted}
            initialValue={savedForm ? savedForm.essayResponse : ''}
            validator={z
              .string()
              .nonempty({ message: 'This field is required' })}
          />
          {/* Reference */}
          <SingleSelectField
            fieldName="referenceAttribution"
            label="How did you hear about Tekalo?"
            placeholder="Choose one"
            listOptions={createOptionList(ReferenceAttribution.options)}
            isSubmitted={isSubmitted}
            initialValue={
              savedForm ? savedForm.referenceAttribution?.toString() : ''
            }
            validator={ReferenceAttribution}
          />
          {/* Form Control Buttons */}
          <div className="pt-2">
            <Button
              className="mt-14 w-full text-component-large"
              label="Save your progress"
              type="button"
              onClick={doSave}
            />
            <Button
              className="mt-4 w-full text-component-large"
              label="Submit"
              type="submit"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default InterestForm;
