import Button from '@/components/buttons/Button/Button';
import Timeline from '@/components/timeline/Timeline';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { ITimelineItem, NextPageWithLayout } from '@/lib/types';
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

  return (
    <div className="mb-40 grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
      {/* Title */}
      <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
        Join a network with over XX00 organizations to find your match.
      </div>

      {/* Breadcrum Timeline */}
      <div className="col-span-4 col-start-5 mt-10 mb-12 flex content-center justify-center">
        <Timeline timelineItems={timelineItems} horizontal={true} />
      </div>

      {/* The form */}
      <div className="col-span-4 col-start-5">
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
                    <div className="space-y-2 text-left">
                      <label
                        className="text-component-extra-small text-black-text"
                        htmlFor="input-role"
                      >
                        {'Current or most recent role'}
                      </label>
                      <input
                        name="input-role"
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Role'}
                      />
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
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
                    <div className="mt-8 space-y-2 text-left">
                      <label
                        className="text-component-extra-small text-black-text"
                        htmlFor="input-org"
                      >
                        {'Current or most recent organization'}
                      </label>
                      <input
                        name="input-org"
                        className="w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2"
                        value={value}
                        onBlur={onBlur}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Name of organization'}
                      />
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
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
