import Button from '@/components/buttons/Button/Button';
import FreeText from '@/components/input/freeText/FreeText';
import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import SelectGroup from '@/components/input/selectGroup/SelectGroup';
import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { EmploymentType, OpenToRelocate, OpenToRemote } from '@/lib/schemas';
import { ISelectItem } from '@/lib/types';
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

// write a function creatOptionList that accepts a zod enum array and returns an array of ISelectItem
const createOptionList = (enumOptions: Array<string>): Array<ISelectItem> => {
  return enumOptions.map((option: string) => ({
    value: option,
    displayText: option[0].toUpperCase() + option.slice(1),
  }));
};

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormInstance<Record<string, any>>>(null);
  const employmentTypeRef = useRef<FieldInstance<string[], any>>(null);

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
                  {isSubmitted &&
                    errors.map((error) => <p key={error}>{error}</p>)}
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
                  {isSubmitted &&
                    errors.map((error) => <p key={error}>{error}</p>)}
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
                  {isSubmitted &&
                    errors.map((error) => <p key={error}>{error}</p>)}
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
                  {isSubmitted &&
                    errors.map((error) => <p key={error}>{error}</p>)}
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
                  {isSubmitted &&
                    errors.map((error) => <p key={error}>{error}</p>)}
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
                  {isSubmitted &&
                    errors.map((error) => <p key={error}>{error}</p>)}
                </>
              );
            }}
          </Field>
          {/* TODO: Salary*/}
          {/* TODO: Causes */}
          {/* TODO: Cause Rank*/}
          {/* TODO: Other Causes*/}
          {/* TODO: Work Auth*/}
          {/* TODO: Gov Opps*/}
          {/* TODO: What Gov*/}
          {/* TODO: Previous XP*/}
          {/* TODO: Unlimited Resources*/}
          {/* TODO: Reference*/}
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
