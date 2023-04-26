import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import { SkillOptions, YoEOptions } from '@/lib/constants/selects';
import { Skills, YOE } from '@/lib/schemas';
import { DraftSubmission, ExperienceFields } from '@/lib/types';
import {
  FreeTagField,
  FreeTextField,
  MultiSelectField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { FormInstance } from 'houseform/dist/form/types';
import { useEffect, useRef } from 'react';
import { z } from 'zod';

export interface IExperienceForm {
  handleSubmit: (_values: ExperienceFields) => void;
  handleSave: (_values: DraftSubmission) => void;
  savedForm: DraftSubmission | undefined;
}

const ExperienceForm: React.FC<IExperienceForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormInstance<ExperienceFields>>(null);

  useEffect(() => {
    // Need to use the inital value so we have to reset the form
    formRef.current?.reset();
  }, [savedForm]);

  const doSave = () => {
    if (formRef.current) {
      handleSave({ ...savedForm, ...formRef.current.value });
    }
  };

  const doNext = () => {
    if (formRef.current && formRef.current.isValid) {
      console.log(formRef.current.value);

      const experienceFields: ExperienceFields = {
        ...(formRef.current.value as ExperienceFields),
      };

      handleSubmit(experienceFields);
    }
  };

  return (
    <Form<ExperienceFields>
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
          {/* Current Role */}
          <FreeTextField
            fieldName="lastRole"
            label="Current or most recent role"
            placeholder="Role"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.lastRole}
            validator={z.string().nonempty({ message: 'Role is Required' })}
          />

          {/* Current Org */}
          <FreeTextField
            fieldName="lastOrg"
            label="Current or most recent organization"
            placeholder="Name of organization"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.lastOrg}
            validator={z.string().optional()}
          />

          {/* Years Experience */}
          <SingleSelectField
            fieldName="yoe"
            label="Years of relevant experience"
            placeholder="Choose one"
            listOptions={YoEOptions}
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
            validator={z.array(Skills).optional()}
          />

          {/* Other Skills */}
          <FreeTagField
            fieldName="otherSkills"
            label="Other skills (optional)"
            placeholder="Skills separated by commas"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.otherSkills || []}
            validator={z.array(z.string()).optional()}
          />

          {/* LinkedIn */}
          <FreeTextField
            fieldName="linkedInUrl"
            label="LinkedIn (optional)"
            placeholder="LinkedIn URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.linkedInUrl || ''}
          />

          {/* Portfolio */}
          <FreeTextField
            fieldName="portfolioUrl"
            label="Portfolio (optional)"
            placeholder="Portfolio URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.portfolioUrl || ''}
          />

          {/* Portfolio Password */}
          <FreeTextField
            fieldName="portfolioPassword"
            label="portfolioPassword (optional)"
            placeholder="Password to view website"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.portfolioPassword || ''}
          />

          {/* Github */}
          <FreeTextField
            fieldName="githubUrl"
            label="Github (optional)"
            placeholder="Github URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.githubUrl || ''}
          />

          {/* Resume */}
          <FreeTextField
            fieldName="resumeUrl"
            label="Resume (optional)"
            placeholder="Resume URL"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.resumeUrl || ''}
          />

          {/* Resume Password */}
          <FreeTextField
            fieldName="resumePassword"
            label="Resume password (optional)"
            placeholder="Password to view resume"
            isSubmitted={isSubmitted}
            initialValue={savedForm?.resumePassword || ''}
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
              className="mt-4 w-full text-component-large"
              label="Next"
              type="submit"
              onClick={doNext}
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default ExperienceForm;
