import Button from '@/components/buttons/Button/Button';
import SelectGroup from '@/components/input/selectGroup/SelectGroup';
import { EmploymentType } from '@/lib/schemas';
import { ISelectItem } from '@/lib/types';
import { Field, Form, FormInstance } from 'houseform';
import { useRef } from 'react';
import { z } from 'zod';

export interface IInterestForm {
  handleSubmit: (_values: unknown) => void;
  handleSave: (_values: unknown) => void;
  savedForm: any;
}

const EmploymentTypeOptions: Array<ISelectItem> = [
  { value: 'full', displayText: 'Full-time employment' },
  { value: 'part', displayText: 'Part-time/short term opportunities' },
];

const InterestForm: React.FC<IInterestForm> = ({
  handleSubmit,
  handleSave,
  savedForm,
}) => {
  const formRef = useRef<FormInstance<Record<string, any>>>(null);

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
        >
          {/* INTEREST FORM FIELDS */}
          {/* Employment */}
          <Field<string[]>
            name="interestEmploymentType"
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
                    selectOptions={EmploymentTypeOptions}
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
          {/* TODO: Hours per week
          <Field<string>
            
          >

          </Field> */}
          {/* TODO: Roles */}
          {/* TODO: Location */}
          {/* TODO: Reloaction*/}
          {/* TODO: Remote */}
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
        </form>
      )}
    </Form>
  );
};

export default InterestForm;
