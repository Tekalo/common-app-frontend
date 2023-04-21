import { printErrorMessages } from '@/lib/helpers';
import { Field } from 'houseform';
import { ReactElement } from 'react';
import { z } from 'zod';

export interface IBooleanField {
  fieldName: string;
  listenTo?: string[];
  label?: string | ReactElement;
  isSubmitted: boolean;
  initialValue: boolean | undefined;
  validator?: z.ZodSchema;
}

const BooleanField: React.FC<IBooleanField> = ({
  fieldName,
  label,
  isSubmitted,
  initialValue,
  validator,
}) => {
  return (
    <Field<boolean>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, errors }) => {
        return (
          <>
            <fieldset className="space-y-3">
              <div className="flex space-x-2 align-middle">
                <input
                  className="form-checkbox h-4 w-4 appearance-none align-middle checked:bg-blue-1 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                  type="checkbox"
                  id="active"
                  name={fieldName}
                  checked={value}
                  onChange={(e) => setValue(e.target.checked)}
                />
                {label ? (
                  <label
                    htmlFor={`input-${fieldName}`}
                    className="align-middle text-component-small text-black-text"
                  >
                    {label}
                  </label>
                ) : null}
              </div>
            </fieldset>
            {printErrorMessages(isSubmitted, errors)}
          </>
        );
      }}
    </Field>
  );
};

export default BooleanField;
