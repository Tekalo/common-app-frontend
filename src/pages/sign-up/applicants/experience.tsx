import Button from '@/components/buttons/Button/Button';
import FreeText from '@/components/input/freeText/FreeText';
import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import Timeline from '@/components/timeline/Timeline';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { Skills, YOE } from '@/lib/schemas';
import { ISelectItem, ITimelineItem, NextPageWithLayout } from '@/lib/types';
import { Field, Form } from 'houseform';
import { z } from 'zod';

const ApplicantSignup: NextPageWithLayout = () => {
  const timelineItems: Array<ITimelineItem> = [
    {
      text: 'Your experience',
      isActive: true,
    },
    {
      text: 'Your interests',
      isActive: false,
    },
  ];

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

  return (
    <div className="mb-40 grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
      {/* Title */}
      <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
        Join a network with over XX00 organizations to find your match.
      </div>

      {/* Breadcrum Timeline */}
      <div className="col-span-4 col-start-5 mb-12 mt-10 flex content-center justify-center">
        <Timeline timelineItems={timelineItems} horizontal={true} />
      </div>

      {/* The form */}
      <div className="col-span-4 col-start-5 space-y-8">
        <Form
          onSubmit={(values) => {
            alert('Form was submitted with: ' + JSON.stringify(values));
          }}
        >
          {({ isValid, isSubmitted, submit }) => (
            <>
              {/* Current Role */}
              <Field<string>
                name="lastRole"
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
                onSubmitValidate={Skills}
                onChangeValidate={Skills}
                initialValue={[]}
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

              <Button
                className="mt-14 w-full text-component-large"
                label="Save your progress"
                type="submit"
                outlined
                disabled={isSubmitted && !isValid}
                onClick={() => submit()}
              />

              <Button
                className="mt-4 w-full text-component-large"
                label="Next"
                type="submit"
                disabled={isSubmitted && !isValid}
                onClick={() => submit()}
              />
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
