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
  CommitmentType,
  GovtJobType,
  OpenToRelocate,
  OpenToRemote,
  OptionalString,
  ReferenceAttribution,
  RequiredEssay,
  RequiredString,
  Roles,
  WorkAuthorization,
} from '@/lib/enums';
import {
  DraftSubmissionType,
  FieldBooleanType,
  FieldStringArrayType,
  InterestFieldsType,
  InterestRefType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioSelectField,
  RankChoiceField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { useRef } from 'react';
import { z } from 'zod';

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
  const employmentTypeRef = useRef<FieldStringArrayType>(null);
  const govRef = useRef<FieldBooleanType>(null);

  const doSave = () => {
    if (formRef.current) {
      handleSave({ ...savedForm, ...formRef.current.value });
    }
  };

  return (
    <Form<InterestFieldsType>
      onSubmit={(values) => handleSubmit(values)}
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
            fieldRef={employmentTypeRef}
            listOptions={CommitmentOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestEmploymentType}
            validator={CommitmentType}
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
            validator={OptionalString}
          />
          {/* Roles */}
          <MultiSelectField
            fieldName="interestRoles"
            label="What role(s) are you interested in?"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Role selected"
            selectionLabelSingle=" Roles selected"
            listOptions={RoleOptions.filter((role) => role.value !== 'other')}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestRoles || []}
            validator={Roles}
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
            validator={RequiredString.array().min(1)}
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
            initialValue={savedForm ? savedForm.workAuthorization : ''}
            validator={WorkAuthorization}
          />
          {/* Gov Interest*/}
          <RadioSelectField
            fieldName="interestGovt"
            label="Are you interested in U.S. state or local government opportunities?"
            helperText={USDR_DISCLAIMER}
            fieldRef={govRef}
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.interestGovt}
            validator={z.boolean()}
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
            initialValue={savedForm ? savedForm.interestGovtEmplTypes : []}
            validator={GovtJobType.array().optional()}
            disabled={!govRef.current?.value}
          />
          {/* Previous XP*/}
          <RadioSelectField
            fieldName="previousImpactExperience"
            label="Do you have previous experience working at a non-profit or a public service organization?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.previousImpactExperience}
            validator={z.boolean()}
          />
          {/* Essay */}
          <LongTextField
            fieldName="essayResponse"
            label="If you had unlimited resources, what problem would you choose to solve and why?"
            placeholder="Write as much as you’d like, suggested up to 250 words."
            isSubmitted={isSubmitted}
            initialValue={savedForm ? savedForm.essayResponse : ''}
            validator={RequiredEssay}
          />
          {/* Reference */}
          <SingleSelectField
            fieldName="referenceAttribution"
            label="How did you hear about Tekalo?"
            placeholder="Choose one"
            listOptions={AttributionOtpions}
            isSubmitted={isSubmitted}
            initialValue={savedForm ? savedForm.yoe : ''}
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
