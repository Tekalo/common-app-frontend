import Button from '@/components/buttons/Button/Button';
import FreeText from '@/components/input/freeText/FreeText';
import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import SelectGroup from '@/components/input/selectGroup/SelectGroup';
import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { createOptionList, printErrorMessages } from '@/lib/helpers';
import {
  EmploymentType,
  InterestGovtEmplTypes,
  OpenToRelocate,
  OpenToRemote,
  ReferenceAttribution,
  WorkAuthorization,
} from '@/lib/schemas';
import { ISelectItem } from '@/lib/types';
import LongText from '@/modules/components/input/longText/LongText';
import { Field, FieldInstance, Form, FormInstance } from 'houseform';
import { useRef } from 'react';
import { z } from 'zod';

export interface IInterestForm {
  handleSubmit: (_values: unknown) => void;
  handleSave: (_values: unknown) => void;
  savedForm: any;
}

const EmploymentOptions: Array<ISelectItem> = [
  {
    value: 'full',
    displayText: 'Full-time employment',
  },
  {
    value: 'part',
    displayText: 'Part-time/short term opportunities',
  },
];

const RoleOptions: Array<ISelectItem> = [
  {
    value: 'data analyst',
    displayText: 'Data analyst',
  },
  {
    value: 'product manager',
    displayText: 'Product manager',
  },
  {
    value: 'software engineer',
    displayText: 'Software engineer',
  },
  {
    value: 'software engineeer backend',
    displayText: 'Software engineer - backend',
  },
  {
    value: 'software engineer frontend',
    displayText: 'Software engineer - frontend',
  },
  {
    value: 'product designer',
    displayText: 'Product designer',
  },

  {
    value: 'ux/ui designer',
    displayText: 'UX/UI designer',
  },
  {
    value: 'ux researcher',
    displayText: 'UX researcher',
  },
];

const CauseOptions: Array<ISelectItem> = [
  {
    value: 'climate change',
    displayText: 'Climate change',
  },
  {
    value: 'environment',
    displayText: 'Environment',
  },
  {
    value: 'human rights & social equality',
    displayText: 'Human rights & social equality',
  },
  {
    value: 'international development',
    displayText: 'International development',
  },
  {
    value: 'education',
    displayText: 'Education',
  },
  {
    value: 'health & well being',
    displayText: 'Health & well-being',
  },
  {
    value: 'government tech',
    displayText: 'Government tech',
  },
  {
    value: 'tech policy',
    displayText: 'Tech policy',
  },
  {
    value: 'trust & safety',
    displayText: 'Trust & safety',
  },
];

const YesNoOptions: Array<ISelectItem> = [
  {
    value: 'false',
    displayText: 'No',
  },
  {
    value: 'true',
    displayText: 'Yes',
  },
];

const YesNoOptions2: Array<ISelectItem> = [
  {
    value: 'false',
    displayText: 'No',
  },
  {
    value: 'true',
    displayText: 'Yes',
  },
];

const USDROptions: Array<ISelectItem> = [
  {
    value: 'paid',
    displayText: 'Paid government jobs with local & state governments',
  },
  {
    value: 'unpaid',
    displayText:
      'Volunteer (unpaid) roles with USDR to support government partners',
  },
];

const AuthorizationOptions: Array<ISelectItem> = [
  {
    value: 'authorized',
    displayText: 'I am authorized to work in the U.S.',
  },
  {
    value: 'sponsorship',
    displayText:
      'I will now or in the future require sponsorship to work in the U.S.',
  },
];

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormInstance<Record<string, any>>>(null);
  const employmentTypeRef = useRef<FieldInstance<string[], any>>(null);
  const govRef = useRef<FieldInstance<string, any>>(null);

  const doSave = () => {
    if (formRef.current) {
      handleSave(formRef.current.value);
    }
  };

  return (
    <Form onSubmit={(values) => handleSubmit(values)} ref={formRef}>
      {({ isSubmitted, submit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-8"
        >
          {/* INTEREST FORM FIELDS */}
          {/* Employment */}
          <Field<string[]>
            name="interestEmploymentType"
            ref={employmentTypeRef}
            initialValue={(savedForm && savedForm.interestEmploymentType) || []}
            onSubmitValidate={z.array(EmploymentType)}
            onChangeValidate={z.array(EmploymentType)}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <SelectGroup
                    name="input-interestEmploymentType"
                    legendText="What type(s) of opportunities are you interested in? Choose all that apply"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    selectOptions={EmploymentOptions}
                  />
                  <div className="mt-2 text-left text-component-extra-small-helper-text">
                    {
                      'Part-time/short-term opportunities may include paid or unpaid positions such as contract, advisory, volunteering roles or internships.'
                    }
                  </div>
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Hours per week */}
          <Field<string>
            name="hoursPerWeek"
            listenTo={['interestEmploymentType']}
            initialValue={savedForm && savedForm.hoursPerWeek}
            onSubmitValidate={z.string({
              required_error: 'Hours per week is required',
              invalid_type_error: 'Hours must be a string',
            })}
            onChangeValidate={z.string({
              required_error: 'Hours is required',
              invalid_type_error: 'Hours must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    disabled={
                      employmentTypeRef.current?.value.length === 1 &&
                      employmentTypeRef.current?.value[0] === 'full'
                    }
                    labelClassName={
                      employmentTypeRef.current?.value.length === 1 &&
                      employmentTypeRef.current?.value[0] === 'full'
                        ? 'text-gray-2'
                        : ''
                    }
                    name="input-hoursPerWeek"
                    label="Hours per week you are able to commit (optional)"
                    placeholder="Approximate number of hours"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Roles */}
          <Field<string[]>
            name="interestRoles"
            initialValue={(savedForm && savedForm.interestRoles) || []}
            onSubmitValidate={z.array(z.string())}
            onChangeValidate={z.array(z.string())}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <MultiSelect
                    name="input-interestRoles"
                    label="What role(s) are you interested in?"
                    placeholder="Choose all that apply"
                    selectionLabelSingle=" Role selected"
                    selectionLabelMulti=" Roles selected"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    selectOptions={RoleOptions}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Location */}
          <Field<string>
            name="currentLocation"
            initialValue={savedForm && savedForm.currentLocation}
            onSubmitValidate={z.string({
              required_error: 'Current location is required',
              invalid_type_error: 'Current location must be a string',
            })}
            onChangeValidate={z.string({
              required_error: 'Current location is required',
              invalid_type_error: 'Current location must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-currentLocation"
                    label="Current location"
                    placeholder="City, state and/or country"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Reloaction*/}
          <Field<string>
            name="openToRelocate"
            initialValue={savedForm && savedForm.openToRelocate}
            onSubmitValidate={OpenToRelocate}
            onChangeValidate={OpenToRelocate}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <SingleSelect
                    name="input-openToRelocate"
                    labelText="Open to relocating?"
                    placeholder="Choose one"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    listOptions={createOptionList(OpenToRelocate.options)}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Remote */}
          <Field<string>
            name="openToRemote"
            initialValue={savedForm && savedForm.openToRemote}
            onSubmitValidate={OpenToRemote}
            onChangeValidate={OpenToRemote}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <SingleSelect
                    name="input-openToRemote"
                    labelText="Open to remote?"
                    placeholder="Choose one"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    listOptions={createOptionList(OpenToRemote.options)}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Salary*/}
          <Field<string>
            name="desiredSalary"
            initialValue={savedForm && savedForm.desiredSalary}
            onSubmitValidate={z.string({
              required_error: 'Salary is required',
              invalid_type_error: 'Salary must be a string',
            })}
            onChangeValidate={z.string({
              required_error: 'Salary is required',
              invalid_type_error: 'Salary must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-desiredSalary"
                    label="Desired salary (optional)"
                    placeholder="Enter a range"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Causes */}
          <Field<string[]>
            name="interestCauses"
            initialValue={(savedForm && savedForm.interestCauses) || []}
            onSubmitValidate={z.array(z.string())}
            onChangeValidate={z.array(z.string())}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <MultiSelect
                    name="input-interestCauses"
                    label="Which causes are you interested in hearing opportunities for?"
                    placeholder="Choose all that apply"
                    selectionLabelSingle=" Cause selected"
                    selectionLabelMulti=" Causes selected"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    selectOptions={CauseOptions}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* TODO: Cause Rank*/}
          <div>TODO: Cause Rank Component</div>
          {/* Other Causes*/}
          <Field<string>
            name="otherCauses"
            initialValue={savedForm && savedForm.otherCauses}
            onSubmitValidate={z.string({
              invalid_type_error: 'Other causes must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Other causes must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <FreeText
                    name="input-otherCauses"
                    label="Other causes (optional)"
                    placeholder="Additional causes separated by commas"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Work Auth*/}
          <Field<string>
            name="workAuthorization"
            initialValue={savedForm && savedForm.workAuthorization}
            onSubmitValidate={WorkAuthorization}
            onChangeValidate={WorkAuthorization}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <SingleSelect
                    name="input-workAuthorization"
                    labelText="Work authorization (optional)"
                    placeholder="Choose one"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    listOptions={AuthorizationOptions}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Gov Interest*/}
          <Field<string>
            name="interestGovt"
            ref={govRef}
            initialValue={savedForm && savedForm.interestGovt}
            onSubmitValidate={z.boolean()}
            onChangeValidate={z.boolean()}
          >
            {({ value, setValue, errors }) => {
              return (
                <div className="space-y-2">
                  <div className="text-left text-component-extra-small text-black-text">
                    {
                      'Are you interested in U.S. state or local government opportunities?'
                    }
                  </div>
                  <div className="w-[103%] text-left text-p3-mobile text-black-text">
                    {'By choosing “yes,” you consent to '}
                    <a
                      href="https://www.usdigitalresponse.org/about"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      {'U.S. Digital Response'}
                    </a>
                    {
                      ' saving a copy of your CommonApp profile in its own database and sending you electronic communications. USDR may contact you about opportunities in state and local governments, and add you to their newsletter which contains government job opportunities.'
                    }
                  </div>
                  <RadioGroup
                    name="input-interestGovt"
                    value={govRef.current?.value || ''}
                    onChange={(val: string) => govRef.current?.setValue(val)}
                    radioOptions={YesNoOptions}
                    fieldSetClassName="flex flex-row"
                    radioClassName="w-[88px]"
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </div>
              );
            }}
          </Field>
          {/* Gov Opp Type*/}
          <Field<string[]>
            name="interestGovtEmplTypes"
            listenTo={['interestGovt']}
            initialValue={(savedForm && savedForm.interestGovtEmplTypes) || []}
            onSubmitValidate={InterestGovtEmplTypes}
            onChangeValidate={InterestGovtEmplTypes}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <MultiSelect
                    disabled={govRef.current?.value === 'false' ? true : false}
                    name="input-interestGovtEmplTypes"
                    label="Which opportunities from USDR are you interested in?"
                    placeholder="Choose all that apply"
                    selectionLabelSingle=" Opportunity selected"
                    selectionLabelMulti=" Opportunities selected"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    selectOptions={USDROptions}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Previous XP*/}
          <Field<string>
            name="previousImpactExperience"
            initialValue={savedForm && savedForm.previousImpactExperience}
            onSubmitValidate={z.boolean()}
            onChangeValidate={z.boolean()}
          >
            {({ value, setValue, errors }) => {
              return (
                <>
                  <RadioGroup
                    name="input-previousImpactExperience"
                    value={value}
                    onChange={(val: string) => setValue(val)}
                    radioOptions={YesNoOptions2}
                    legendText="Do you have previous experience working at a non-profit or a public service organization?"
                    fieldSetClassName="flex flex-row space-y-2"
                    radioClassName="w-[88px]"
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Unlimited Resources*/}
          <Field<string>
            name="essayResponse"
            initialValue={savedForm && savedForm.essayResponse}
            onSubmitValidate={z.string({
              invalid_type_error: 'Other causes must be a string',
            })}
            onChangeValidate={z.string({
              invalid_type_error: 'Other causes must be a string',
            })}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <LongText
                    name="input-essayResponse"
                    label="If you had unlimited resources, what problem would you choose to solve and why?"
                    placeholder="Write as much as you’d like, suggested up to 250 words."
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>
          {/* Reference*/}
          <Field<string>
            name="referenceAttribution"
            initialValue={savedForm && savedForm.referenceAttribution}
            onSubmitValidate={ReferenceAttribution}
            onChangeValidate={ReferenceAttribution}
          >
            {({ value, setValue, onBlur, errors }) => {
              return (
                <>
                  <SingleSelect
                    name="input-referenceAttribution"
                    labelText="How did you hear about Tekalo?"
                    placeholder="Choose one"
                    value={value}
                    setValue={setValue}
                    onBlur={onBlur}
                    listOptions={createOptionList(ReferenceAttribution.options)}
                  />
                  {printErrorMessages(isSubmitted, errors)}
                </>
              );
            }}
          </Field>

          <div className="pt-2">
            <Button
              className="mt-14 w-full text-component-large"
              label="Save your progress"
              type="button"
              outlined
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
