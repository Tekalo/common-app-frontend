import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import { printErrorMessages } from '@/lib/helpers';
import { IRadioItem } from '@/lib/types';
import { Field } from 'houseform';
import { ReactElement } from 'react';
import { z } from 'zod';

export interface IRadioSelectField {
  fieldName: string;
  label: string;
  helperText?: string | ReactElement;
  listOptions: IRadioItem[];
  isSubmitted: boolean;
  initialValue: boolean | undefined;
  validator?: z.ZodSchema;
}

const RadioSelectField: React.FC<IRadioSelectField> = ({
  fieldName,
  label,
  helperText,
  listOptions,
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
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div>
            {helperText ? <>{helperText}</> : null}

            {/* YOU ARE HERE
             *
             * You need to change RadioGroup so it doesn't have this weird
             * pass in fieldSetClassName and radioClassName unless those
             * are legitimately required
             *
             * You are almost done refactoring the interestForm!
             *
             */}

            <RadioGroup
              name={`input-${fieldName}`}
              value={String(value)}
              onChange={(val) => setValue(val === 'true')}
              onBlur={onBlur}
              radioOptions={listOptions}
            />

            {printErrorMessages(isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default RadioSelectField;
