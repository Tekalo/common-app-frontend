import Button from '@/components/buttons/Button/Button';
import { SkillOptions, YoEOptions } from '@/lib/constants/selects';
import {
  ApplicantDraftSubmission,
  ApplicantExperience,
  Skills,
  YOE,
} from '@/lib/schemas';
import {
  FreeTagField,
  FreeTextField,
  MultiSelectField,
  SingleSelectField,
} from '@/sections/sign-up/fields';
import { Form } from 'houseform';
import { FormInstance } from 'houseform/dist/form/types';
import { useRef } from 'react';
import { z } from 'zod';

export interface IExperienceForm {
  handleSubmit: (_values: z.infer<typeof ApplicantExperience>) => void;
  handleSave: (_values: z.infer<typeof ApplicantDraftSubmission>) => void;
  savedForm: z.infer<typeof ApplicantDraftSubmission>;
}

type ExperienceFormType = z.infer<typeof ApplicantExperience>;
type FormRefType = FormInstance<ExperienceFormType>;

const ExperienceForm: React.FC<IExperienceForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormRefType>(null);
  const doSave = () => {
    if (formRef.current) {
      handleSave({ ...savedForm, ...formRef.current });
    }
  };

  return (
    <Form<ExperienceFormType>
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
            initialValue={savedForm.lastRole}
            validator={z.string().nonempty({ message: 'Role is Required' })}
          />

          {/* Current Org */}
          <FreeTextField
            fieldName="lastOrg"
            label="Current or most recent organization"
            placeholder="Name of organization"
            isSubmitted={isSubmitted}
            initialValue={savedForm.lastOrg}
            validator={z.string().optional()}
          />

          {/* Years Experience */}
          <SingleSelectField
            fieldName="yoe"
            label="Years of relevant experience"
            placeholder="Choose one"
            listOptions={YoEOptions}
            isSubmitted={isSubmitted}
            initialValue={savedForm.yoe}
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
            initialValue={savedForm.skills || []}
            validator={z.array(Skills).optional()}
          />

          {/* Other Skills */}
          <FreeTagField
            fieldName="otherSkills"
            label="Other skills (optional)"
            placeholder="Skills separated by commas"
            isSubmitted={isSubmitted}
            initialValue={savedForm.otherSkills || []}
            validator={z.array(z.string()).optional()}
          />

          {/* LinkedIn */}
          <FreeTextField
            fieldName="linkedInUrl"
            label="LinkedIn (optional)"
            placeholder="LinkedIn URL"
            isSubmitted={isSubmitted}
            initialValue={(savedForm && savedForm.linkedInUrl) || ''}
          />

          {/* Portfolio */}
          <FreeTextField
            fieldName="portfolioUrl"
            label="Portfolio (optional)"
            placeholder="Portfolio URL"
            isSubmitted={isSubmitted}
            initialValue={(savedForm && savedForm.portfolioUrl) || ''}
          />

          {/* Portfolio Password */}
          <FreeTextField
            fieldName="portfolioPassword"
            label="portfolioPassword (optional)"
            placeholder="Password to view website"
            isSubmitted={isSubmitted}
            initialValue={(savedForm && savedForm.portfolioPassword) || ''}
          />

          {/* Github */}
          <FreeTextField
            fieldName="githubUrl"
            label="Github (optional)"
            placeholder="Github URL"
            isSubmitted={isSubmitted}
            initialValue={(savedForm && savedForm.githubUrl) || ''}
          />

          {/* Resume */}
          <FreeTextField
            fieldName="resumeUrl"
            label="Resume (optional)"
            placeholder="Resume URL"
            isSubmitted={isSubmitted}
            initialValue={(savedForm && savedForm.resumeUrl) || ''}
          />

          {/* Resume Password */}
          <FreeTextField
            fieldName="resumePassword"
            label="Resume password (optional)"
            placeholder="Password to view resume"
            isSubmitted={isSubmitted}
            initialValue={(savedForm && savedForm.resumePassword) || ''}
          />

          {/* Form Buttons */}
          <div className="pt-2">
            <Button
              className="w-full text-component-large"
              label="Save your progress"
              type="button"
              outlined
              onClick={doSave}
            />

            <Button
              className="mt-4 w-full text-component-large"
              label="Next"
              type="submit"
            />
          </div>
        </form>
      )}
    </Form>
  );
};

export default ExperienceForm;
