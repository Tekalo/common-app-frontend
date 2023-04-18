import Button from '@/components/buttons/Button/Button';
import FreeText from '@/components/input/freeText/FreeText';
import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { Skills, YOE } from '@/lib/schemas';
import { ISelectItem } from '@/lib/types';
import { Field, Form } from 'houseform';
import { z } from 'zod';

export interface IExperienceForm {
  handleSubmit: (_values: unknown) => void;
  handleSave: (_values: unknown) => void;
  values: any;
}

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
  values,
}) => {
  return (
    <Form onSubmit={(values) => handleSubmit(values)}>
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <>
            {/* EXPERIENCE FORM FIELDS */}
            {/* Current Role */}
            <Field<string>
              name="lastRole"
              initialValue={values && values.lastRole}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Current Org */}
            <Field<string>
              name="lastOrg"
              initialValue={values && values.lastOrg}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* YOE */}
            <Field<string>
              name="yoe"
              initialValue={values && values.yoe}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Skills */}
            <Field<string[]>
              name="skills"
              initialValue={(values && values.skills) || []}
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
                      value={value}
                      setValue={setValue}
                      onBlur={onBlur}
                      selectOptions={SkillOptions}
                    />
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Other Skills
               TODO: Make this into a nicer component (comma pills?)
               */}
            <Field<string>
              name="otherSkills"
              initialValue={values && values.otherSkills}
              onSubmitValidate={z.string({
                invalid_type_error: 'Skills must be a string',
              })}
              onChangeValidate={z.string({
                invalid_type_error: 'Skills must be a string',
              })}
            >
              {({ value, setValue, onBlur, errors }) => {
                return (
                  <>
                    <FreeText
                      name="input-otherSkills"
                      label="Other skills (optional)"
                      placeholder="Skills separated by commas"
                      value={value}
                      setValue={setValue}
                      onBlur={onBlur}
                    />
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* LinkedIn */}
            <Field<string>
              name="linkedin"
              initialValue={values && values.linkedin}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Portfolio */}
            <Field<string>
              name="Portfolio"
              initialValue={values && values.portfolio}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Portfolio Password */}
            <Field<string>
              name="portfolioPassword"
              initialValue={values && values.portfolioPassword}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Github */}
            <Field<string>
              name="github"
              initialValue={values && values.github}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Resume */}
            <Field<string>
              name="resume"
              initialValue={values && values.resume}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Resume Password */}
            <Field<string>
              name="resumePassword"
              initialValue={values && values.resumePassword}
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
                    {isSubmitted &&
                      errors.map((error) => <p key={error}>{error}</p>)}
                  </>
                );
              }}
            </Field>
            {/* Save button */}
            <Button
              className="mt-14 w-full text-component-large"
              label="Save your progress"
              type="button"
              outlined
              onClick={() => handleSave}
            />

            {/* Next Button */}
            <Button
              className="mt-4 w-full text-component-large"
              label="Next"
              type="button"
              onClick={() => submit()}
            />
          </>
        </form>
      )}
    </Form>
  );
};

export default ExperienceForm;
