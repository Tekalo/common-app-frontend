import Button from '@/components/buttons/Button/Button';
import Timeline from '@/components/timeline/Timeline';
import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { Skills, YOE } from '@/lib/schemas';
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

              {/* YOE */}
              <Field<string>
                name="yoe"
                onSubmitValidate={YOE}
                onChangeValidate={YOE}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    // TODO: To style this we need to use headless UI or something similar. You cannot style native options
                    <div className="space-y-2 pt-8 text-left">
                      <label htmlFor="input-yoe">
                        Years of relevant experience
                      </label>
                      <select
                        name="input-yoe"
                        id="input-yoe"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onBlur={onBlur}
                        className="ring-black right-0 z-10  mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none"
                      >
                        <option value="" className="text-gray-2" disabled>
                          Choose one
                        </option>
                        <option value="< 1">{'< 1'}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11+">11+</option>
                      </select>
                      {isSubmitted &&
                        errors.map((error) => <p key={error}>{error}</p>)}
                    </div>
                  );
                }}
              </Field>

              {/* Skills */}
              {/* TODO: Figure out how best to use the multi select

              Most likely need to do something like this ... 

              <Field<string[]> 
                onSubmitValidate={zod.string().array().nonempty()}
              >
                {({ value, setValue }) => (
                  <MultiSelect value={value} onChange={setValue} />
                )}
              </Field>
              
              SO -- may need to make my own multi select component.
              Then set its value into the HouseForm Field.
              
              */}
              <Field<string[]>
                name="yoe"
                onSubmitValidate={Skills}
                onChangeValidate={Skills}
              >
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    // TODO: To style this we need to use headless UI or something similar. You cannot style native options
                    <div className="space-y-2 pt-8 text-left">
                      <label htmlFor="input-yoe">
                        Which of these skills apply to you? (optional)
                      </label>
                      <select
                        multiple
                        name="input-yoe"
                        id="input-yoe"
                        value={value}
                        onChange={(e) => setValue([...value, e.target.value])}
                        onBlur={onBlur}
                        className="ring-black right-0 z-10  mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none"
                      >
                        <option value="" className="text-gray-2" disabled>
                          Choose all that apply
                        </option>
                        <option value="react">React</option>
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                      </select>
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
