import Button from '@/components/buttons/Button/Button';
import FreeText from '@/components/input/freeText/FreeText';
import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { printErrorMessages } from '@/lib/helpers';
import {
  ApplicantDraftSubmission,
  ApplicantExperience,
  Skills,
  YOE,
} from '@/lib/schemas';
import { ISelectItem } from '@/lib/types';
import FreeTag from '@/modules/components/input/freeTag/FreeTag';
import { Field, Form } from 'houseform';
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

const YoEOptions: Array<ISelectItem> = [
  {
    value: '< 1',
    displayText: 'Less than 1',
  },

  // Generate objects from 1 to 10
  ...Array.from(Array(10).keys()).map((i) => ({
    value: `${i + 1}`,
    displayText: `${i + 1}`,
  })),

  {
    value: '11+',
    displayText: '11+',
  },
];

const SkillOptions: Array<ISelectItem> = [
  {
    value: 'react',
    displayText: 'React',
  },
  {
    value: 'javascript',
    displayText: 'JavaScript',
  },
  {
    value: 'python',
    displayText: 'Python',
  },
  {
    value: 'java',
    displayText: 'Java',
  },
  {
    value: 'sql',
    displayText: 'SQL',
  },
  {
    value: 'privacy',
    displayText: 'Privacy',
  },
  {
    value: 'security',
    displayText: 'Security',
  },
  {
    value: 'devops',
    displayText: 'DevOps',
  },
  {
    value: 'figma/sketch',
    displayText: 'Figma/Sketch',
  },
  {
    value: 'prototyping',
    displayText: 'Prototyping',
  },
  {
    value: 'user research',
    displayText: 'User research',
  },
  {
    value: 'product development',
    displayText: 'Product development',
  },
  {
    value: 'project management',
    displayText: 'Project management',
  },
];

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
          {/* EXPERIENCE FORM FIELDS */}
          {/* Current Role */}
          <Field<string>
            name="lastRole"
            initialValue={savedForm.lastRole}
            onSubmitValidate={z.string({
              required_error: 'Role is required',
              invalid_type_error: 'Role must be a string',
            })}
            onChangeValidate={z.string({
              required_error: 'Role is required',
              invalid_type_error: 'Role must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-role"
                    label="Current or most recent role"
                    placeholder="Role"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Current Org */}
          <Field<string>
            name="lastOrg"
            initialValue={savedForm.lastOrg}
            onSubmitValidate={z.string({
              required_error: 'Org is required',
              invalid_type_error: 'Org must be a string',
            })}
            onChangeValidate={z.string({
              required_error: 'Org is required',
              invalid_type_error: 'Org must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-org"
                    label="Current or most recent organization"
                    placeholder="Name of organization"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* YOE */}
          <Field<string>
            name="yoe"
            initialValue={savedForm.yoe}
            onSubmitValidate={YOE}
            onChangeValidate={YOE}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <SingleSelect
                    name="input-yoe"
                    labelText="Years of relevant experience"
                    placeholder="Choose one"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    listOptions={YoEOptions}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Skills */}
          <Field<string[]>
            name="skills"
            initialValue={savedForm.skills || []}
            onSubmitValidate={z.array(Skills)}
            onChangeValidate={z.array(Skills)}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <MultiSelect
                    name="input-skills"
                    label="Which of these skills apply to you? (optional)"
                    placeholder="Choose all that apply"
                    selectionLabelMulti=" Skills selected"
                    selectionLabelSingle=" Skill selected"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    selectOptions={SkillOptions}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Other Skills */}
          <Field<string[]>
            name="otherSkills"
            initialValue={savedForm.otherSkills}
            onSubmitValidate={z.array(z.string())}
            onChangeValidate={z.array(z.string())}
          >
            {({ value, setValue, errors }) => {
              return (
                <>
                  <FreeTag
                    name="input-otherSkills"
                    label="Other skills (optional)"
                    placeholder="Skills separated by commas"
                    value={value}
                    setValue={setValue}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* LinkedIn */}
          <Field<string>
            name="linkedInUrl"
            initialValue={savedForm.linkedInUrl || ''}
            onSubmitValidate={z.string({
              invalid_type_error: 'LinkedIn must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'LinkedIn must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-linkedin"
                    label="LinkedIn (optional)"
                    placeholder="LinkedIn URL"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Portfolio */}
          <Field<string>
            name="portfolioUrl"
            initialValue={savedForm.portfolioUrl || ''}
            onSubmitValidate={z.string({
              invalid_type_error: 'Portfolio must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Portfolio must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-portfolio"
                    label="Portfolio (optional)"
                    placeholder="Portfolio URL"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Portfolio Password */}
          <Field<string>
            name="portfolioPassword"
            initialValue={savedForm.portfolioPassword || ''}
            onSubmitValidate={z.string({
              invalid_type_error: 'Password must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Password must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-portfolioPassword"
                    label="Portfolio password (optional)"
                    placeholder="Password to view website"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Github */}
          <Field<string>
            name="githubUrl"
            initialValue={savedForm.githubUrl || ''}
            onSubmitValidate={z.string({
              invalid_type_error: 'Github must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Github must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-github"
                    label="Github (optional)"
                    placeholder="Github URL"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Resume */}
          <Field<string>
            name="resumeUrl"
            initialValue={savedForm.resumeUrl || ''}
            onSubmitValidate={z.string({
              invalid_type_error: 'Resume must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Resume must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-resume"
                    label="Link to resume (optional)"
                    placeholder="Resume URL"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Resume Password */}
          <Field<string>
            name="resumePassword"
            initialValue={savedForm.resumePassword || ''}
            onSubmitValidate={z.string({
              invalid_type_error: 'Password must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Password must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-resumePassword"
                    label="Resume password (optional)"
                    placeholder="Password to view resume"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>

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
