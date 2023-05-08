import Button from '@/components/buttons/Button/Button';
import {
  AttributionOtpions,
  AuthorizationOptions,
  CauseOptions,
  CommitmentOptions,
  RelocationOptions,
  RemoteOptions,
  RoleOptions,
  USDROptions,
  YesNoOptions,
} from '@/lib/constants/selects';
import { USDR_DISCLAIMER } from '@/lib/constants/text';
import {
  CausesValidator,
  CommitmentTypeValidator,
  GovtJobType,
  OpenToRelocate,
  OpenToRemote,
  OptionalString,
  ReferenceAttribution,
  RequiredEssay,
  RequiredString,
  RolesValidator,
  TrueFalseString,
  WorkAuthorization,
} from '@/lib/enums';
import {
  mapBoolToString,
  mapStringToBool,
  resetForm,
} from '@/lib/helpers/formHelpers';
import {
  DraftSubmissionType,
  InterestFieldsType,
  InterestRefType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioGroupField,
  RankChoiceField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { useEffect, useRef, useState } from 'react';

export interface IInterestForm {
  handleSubmit: (_values: InterestFieldsType) => void;
  handleSave: (_values: DraftSubmissionType) => void;
  savedForm: DraftSubmissionType | undefined;
}

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<InterestRefType>(null);
  const [employmentType, setEmploymentType] = useState(
    savedForm?.interestEmploymentType || []
  );
  const [interestGovt, setInterestGov] = useState(
    savedForm?.interestGovt || false
  );

  useEffect(() => {
    // Need to use the inital value once we get it,
    // so we have to reset the form for it to initialize
    setEmploymentType(savedForm?.interestEmploymentType || []);
    setInterestGov(savedForm?.interestGovt || false);
    resetForm(formRef);
  }, [savedForm]);

  const convertStringFieldsToBool = <T,>(value: T): T => {
    const newVals = { ...savedForm, ...value };

    // Bc of radio group weirdness, we need to convert the values here
    if (typeof newVals.interestGovt === 'string') {
      newVals.interestGovt = mapStringToBool(newVals.interestGovt);
    }
    if (typeof newVals.previousImpactExperience === 'string') {
      newVals.previousImpactExperience = mapStringToBool(
        newVals.previousImpactExperience
      );
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

  const doSubmit = (values: InterestFieldsType) => {
    if (formRef.current) {
      // We need to convert strings to booleans for specific fields
      // because radio inputs need to have string values
      handleSubmit(convertStringFieldsToBool(values));
    }
  };

  return (
    <Form<InterestFieldsType>
      onSubmit={(values) => doSubmit(values)}
      ref={formRef}
    >
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
            onChange={(val) => {
              setEmploymentType(val);
            }}
            listOptions={CommitmentOptions}
            isSubmitted={isSubmitted}
            initialValue={employmentType}
            validator={CommitmentTypeValidator}
          />
          {/* Hours per week */}
          <FreeTextField
            fieldName="hoursPerWeek"
            listenTo={['interestEmploymentType']}
            label="Hours per week you are able to commit (optional)"
            placeholder="Approximate number of hours"
            disabled={
              employmentType.length === 1 && employmentType[0] === 'full'
            }
            isSubmitted={isSubmitted}
            initialValue={savedForm?.hoursPerWeek || ''}
            validator={OptionalString}
          />
          {/* Roles */}
          <MultiSelectField
            fieldName="interestRoles"
            label="What role(s) are you interested in?"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Roles selected"
            selectionLabelSingle=" Role selected"
            listOptions={RoleOptions.filter((role) => role.value !== 'other')}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestRoles || []}
            validator={RolesValidator}
          />
          {/* Location */}
          <FreeTextField
            fieldName="currentLocation"
            label="Current location"
            placeholder="City, state and/or country"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.currentLocation || ''}
            validator={RequiredString}
          />
          {/* Reloaction*/}
          <SingleSelectField
            fieldName="openToRelocate"
            label="Open to relocating?"
            placeholder="Choose one"
            listOptions={RelocationOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.openToRelocate}
            validator={OpenToRelocate}
          />
          {/* Remote */}
          <SingleSelectField
            fieldName="openToRemote"
            label="Open to remote?"
            placeholder="Choose one"
            listOptions={RemoteOptions}
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
            validator={OptionalString}
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
            initialValue={savedForm?.interestCauses}
            validator={CausesValidator}
          />
          {/* Other Causes*/}
          <FreeTagField
            fieldName="otherCauses"
            label="Other causes (optional)"
            placeholder="Additional causes separated by commas"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.otherCauses || []}
            validator={OptionalString.array()}
          />
          {/* Work Auth*/}
          <SingleSelectField
            fieldName="workAuthorization"
            label="Work authorization (optional)"
            placeholder="Choose one"
            listOptions={AuthorizationOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.workAuthorization || undefined}
            validator={WorkAuthorization}
          />
          {/* Gov Interest*/}
          <RadioGroupField
            fieldName="interestGovt"
            label="Are you interested in U.S. state or local government opportunities?"
            helperText={USDR_DISCLAIMER}
            onChange={(val) => {
              setInterestGov(val);
            }}
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={mapBoolToString(interestGovt)}
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
            validator={GovtJobType.array().optional()}
            disabled={interestGovt?.toString() !== 'true'}
          />
          {/* Previous XP */}
          <RadioGroupField
            fieldName="previousImpactExperience"
            label="Do you have previous experience working at a nonprofit or public service organization?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={mapBoolToString(
              savedForm?.previousImpactExperience || false
            )}
            validator={TrueFalseString}
          />
          {/* Essay */}
          <LongTextField
            fieldName="essayResponse"
            label="If you had unlimited resources what problem would you choose to solve and why?"
            placeholder="Write as much as you’d like, suggested up to 250 words."
            isSubmitted={isSubmitted}
            initialValue={savedForm ? savedForm.essayResponse : ''}
            validator={RequiredEssay}
          />
          {/* Reference */}
          <SingleSelectField
            fieldName="referenceAttribution"
            label="How did you hear about Tekalo? (optional)"
            placeholder="Choose one"
            listOptions={AttributionOtpions}
            isSubmitted={isSubmitted}
            initialValue={
              savedForm ? savedForm.referenceAttribution?.toString() : ''
            }
            validator={ReferenceAttribution}
          />
          {/* Form Control Buttons */}
          <div className="pt-2">
            <Button
              className="w-full text-component-large"
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
