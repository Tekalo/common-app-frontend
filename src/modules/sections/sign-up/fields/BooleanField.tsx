import {
  getErrorMessageId,
  getInputId,
  printErrorMessages,
} from '@/lib/helpers/formHelpers';
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
  const inputId = getInputId(fieldName);

  return (
    <Field<boolean>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, errors }) => {
        return (
          <div>
            <fieldset className="space-y-3">
              <div className="flex space-x-2 align-middle">
                <input
                  aria-describedby={getErrorMessageId(inputId)}
                  aria-invalid={!!errors.length}
                  checked={value}
                  className="form-checkbox h-4 w-4 appearance-none rounded-[3px] align-middle checked:bg-blue-1 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                  id={inputId}
                  name={inputId}
                  onChange={(e) => setValue(e.target.checked)}
                  type="checkbox"
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
            {printErrorMessages(inputId, isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default BooleanField;
