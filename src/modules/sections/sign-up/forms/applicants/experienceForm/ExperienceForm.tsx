import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import { SkillOptions, YOEOptions } from '@/lib/constants/selects';
import {
  OptionalString,
  OptionalStringArr,
  RequiredString,
  Skills,
  YOE,
} from '@/lib/enums';
import { resetForm } from '@/lib/helpers/formHelpers';
import {
  DraftSubmissionType,
  ExperienceFieldsType,
  ExperienceRefType,
} from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  MultiSelectField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { useEffect, useRef } from 'react';

export interface IExperienceForm {
  handleNext: (_values: ExperienceFieldsType) => void;
  handleSave: (_values: DraftSubmissionType) => void;
  savedForm: DraftSubmissionType | undefined;
}

const ExperienceForm: React.FC<IExperienceForm> = ({
  handleNext,
  handleSave,
  savedForm,
}) => {
  useEffect(() => {
    // Need to use the inital value once we get it,
    // so we have to reset the form for it to initialize
    resetForm(formRef);
  }, [savedForm]);

  const formRef = useRef<ExperienceRefType>(null);

  const doSave = () => {
    if (formRef.current) {
      handleSave({ ...savedForm, ...formRef.current.value });
    }
  };

  return (
    <Form<ExperienceFieldsType>
      onSubmit={(values) => handleNext(values)}
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
          {/* Current Role */}
          <FreeTextField
            fieldName="lastRole"
            label="Current or most recent role"
            placeholder="Role"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.lastRole}
            validator={RequiredString}
          />

          {/* Current Org */}
          <FreeTextField
            fieldName="lastOrg"
            label="Current or most recent organization"
            placeholder="Name of organization"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.lastOrg}
            validator={RequiredString}
          />

          {/* Years Experience */}
          <SingleSelectField
            fieldName="yoe"
            label="Years of relevant experience"
            placeholder="Choose one"
            listOptions={YOEOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.yoe}
            validator={YOE}
          />

          {/* Skills */}
          <MultiSelectField
            fieldName="skills"
            label="Which of these skills apply to you? (optional)"
            placeholder="Choose all that apply"
            selectionLabelMulti=" Skills selected"
            selectionLabelSingle=" Skill selected"
            listOptions={SkillOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm?.skills || []}
            validator={Skills.array().optional()}
          />

          {/* Other Skills */}
          <FreeTagField
            fieldName="otherSkills"
            label="Other skills (optional)"
            placeholder="Skills separated by commas"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.otherSkills || []}
            validator={OptionalStringArr}
          />

          {/* LinkedIn */}
          <FreeTextField
            fieldName="linkedInUrl"
            label="LinkedIn (optional)"
            placeholder="LinkedIn URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.linkedInUrl || ''}
            validator={OptionalString}
          />

          {/* Portfolio */}
          <FreeTextField
            fieldName="portfolioUrl"
            label="Portfolio (optional)"
            placeholder="Portfolio URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.portfolioUrl || ''}
            validator={OptionalString}
          />

          {/* Portfolio Password */}
          <FreeTextField
            fieldName="portfolioPassword"
            label="portfolioPassword (optional)"
            placeholder="Password to view website"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.portfolioPassword || ''}
            validator={OptionalString}
          />

          {/* Github */}
          <FreeTextField
            fieldName="githubUrl"
            label="Github (optional)"
            placeholder="Github URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.githubUrl || ''}
            validator={OptionalString}
          />

          {/* Resume */}
          <FreeTextField
            fieldName="resumeUrl"
            label="Resume (optional)"
            placeholder="Resume URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.resumeUrl || ''}
            validator={OptionalString}
          />

          {/* Resume Password */}
          <FreeTextField
            fieldName="resumePassword"
            label="Resume password (optional)"
            placeholder="Password to view resume"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.resumePassword || ''}
            validator={OptionalString}
          />

          {/* Form Buttons */}
          <div className="pt-2">
            <Button
              className="w-full text-component-large"
              label="Save your progress"
              type="button"
              variant={ButtonVariant.OUTLINED}
              onClick={doSave}
            />

            <Button
              type="submit"
              className="mt-4 w-full text-component-large"
              label="Next"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default ExperienceForm;
