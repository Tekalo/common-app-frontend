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
import { createOptionList } from '@/lib/helpers';
import {
  ApplicantDraftSubmission,
  ApplicantInterests,
  EmploymentType,
  InterestGovtEmplTypes,
  OpenToRelocate,
  OpenToRemote,
  ReferenceAttribution,
  Roles,
} from '@/lib/schemas';
import {
  FreeTagField,
  FreeTextField,
  LongTextField,
  MultiSelectField,
  RadioSelectField,
  SelectGroupField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { FieldInstance, Form, FormInstance } from 'houseform';
import { useRef } from 'react';
import { z } from 'zod';

export interface IInterestForm {
  handleSubmit: (_values: z.infer<typeof ApplicantInterests>) => void;
  handleSave: (_values: z.infer<typeof ApplicantDraftSubmission>) => void;
  savedForm: z.infer<typeof ApplicantDraftSubmission>;
}

type InterestFormType = z.infer<typeof ApplicantInterests>;
type FormRefType = FormInstance<InterestFormType>;

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormRefType>(null);
  const employmentTypeRef = useRef<FieldInstance<string[], any>>(null);
  const govRef = useRef<FieldInstance<boolean, any>>(null);

  const doSave = () => {
    if (formRef.current) {
      handleSave({ ...savedForm, ...formRef.current });
    }
  };

  return (
    <Form<InterestFormType>
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
            listOptions={EmploymentOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm.interestEmploymentType}
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
            initialValue={savedForm.hoursPerWeek || ''}
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
            initialValue={savedForm.interestRoles}
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
            initialValue={savedForm.currentLocation}
            validator={z.string().nonempty('Current location is required')}
          />

          {/* Reloaction*/}
          <SingleSelectField
            fieldName="openToRelocate"
            label="Open to relocating?"
            placeholder="Choose one"
            listOptions={createOptionList(OpenToRelocate.options)}
            isSubmitted={isSubmitted}
            initialValue={savedForm.openToRelocate}
            validator={OpenToRelocate}
          />

          {/* Remote */}
          <SingleSelectField
            fieldName="openToRemote"
            label="Open to remote?"
            placeholder="Choose one"
            listOptions={createOptionList(OpenToRemote.options)}
            isSubmitted={isSubmitted}
            initialValue={savedForm.openToRemote}
            validator={OpenToRemote}
          />

          {/* Salary*/}
          <FreeTextField
            fieldName="desiredSalary"
            label="Desired salary (optional)"
            placeholder="Enter a range"
            isSubmitted={isSubmitted}
            initialValue={savedForm.desiredSalary || ''}
            validator={z.string().optional()}
          />

          {/* Causes */}
          <MultiSelectField
            fieldName="interestCauses"
            label={
              'Which causes are you interested in hearing opportunities for?'
            }
            placeholder="Choose all that apply"
            selectionLabelMulti=" Cause selected"
            selectionLabelSingle=" Causes selected"
            listOptions={CauseOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm.interestCauses || []}
            validator={z
              .array(z.string())
              .nonempty('You must select at least one cause')}
          />

          {/* TODO: Cause Rank*/}
          <div>TODO: Cause Rank</div>

          {/* Other Causes*/}
          <FreeTagField
            fieldName="otherCauses"
            label="Other causes (optional)"
            placeholder="Additional causes separated by commas"
            isSubmitted={isSubmitted}
            initialValue={savedForm.otherCauses || []}
            validator={z.array(z.string()).nullable().optional()}
          />

          {/* Work Auth*/}
          <SingleSelectField
            fieldName="workAuthorization"
            label="Work authorization (optional)"
            placeholder="Choose one"
            listOptions={AuthorizationOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm.workAuthorization}
            validator={z.boolean()}
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
            initialValue={savedForm.interestGovt}
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
            initialValue={savedForm.interestGovtEmplTypes || []}
            validator={z.array(InterestGovtEmplTypes).optional()}
            disabled={!govRef.current?.value}
          />

          {/* Previous XP*/}
          <RadioSelectField
            fieldName="previousImpactExperience"
            label="Do you have previous experience working at a non-profit or a public service organization?"
            rowAlign={true}
            listOptions={YesNoOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm.previousImpactExperience}
            validator={z.boolean()}
          />

          {/* Essay */}
          <LongTextField
            fieldName="essayResponse"
            label="If you had unlimited resources, what problem would you choose to solve and why?"
            placeholder="Write as much as you’d like, suggested up to 250 words."
            isSubmitted={isSubmitted}
            initialValue={savedForm.essayResponse || ''}
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
            initialValue={savedForm.yoe}
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
