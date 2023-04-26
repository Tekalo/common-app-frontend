import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { IRadioItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { ReactElement, RefObject } from 'react';
import { z } from 'zod';

interface IRadioBooleanField {
  fieldName: string;
  label: string;
  helperText?: string | ReactElement;
  fieldRef?: RefObject<FieldInstance>;
  rowAlign?: boolean;
  listOptions: IRadioItem[];
  isSubmitted: boolean;
  initialValue: boolean | undefined;
  validator?: z.ZodSchema;
}

const RadioBooleanField: React.FC<IRadioBooleanField> = ({
  fieldName,
  label,
  helperText,
  fieldRef,
  rowAlign,
  listOptions,
  isSubmitted,
  initialValue,
  validator,
}) => {
  return (
    <Field<boolean>
      name={fieldName}
      ref={fieldRef}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        // console.log('value', label, value);
        return (
          <div className="space-y-2">
            <RadioGroup
              name={`input-${fieldName}`}
              label={label}
              // This sets the radio group value (string)
              value={String(value)}
              // This sets the form value (boolean)
              onChange={(val) => {
                // console.log('onChange', val);
                setValue(val === 'true');
              }}
              onBlur={onBlur}
              rowAlign={rowAlign}
              listOptions={listOptions}
            />

            {helperText ? <>{helperText}</> : null}

            {printErrorMessages(isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default RadioBooleanField;
