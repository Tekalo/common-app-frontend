import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { ReactElement, RefObject } from 'react';
import { z } from 'zod';

interface IRadioGroupField {
  fieldName: string;
  label: string;
  helperText?: string | ReactElement;
  fieldRef?: RefObject<FieldInstance>;
  rowAlign?: boolean;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string | undefined;
  validator?: z.ZodSchema;
  onChange?: (val: any) => void;
}

const RadioGroupField: React.FC<IRadioGroupField> = ({
  fieldName,
  label,
  helperText,
  fieldRef,
  rowAlign,
  listOptions,
  isSubmitted,
  initialValue,
  validator,
  onChange,
}) => {
  return (
    <Field<string>
      name={fieldName}
      ref={fieldRef}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div className="space-y-2">
            {value}
            <RadioGroup
              name={`input-${fieldName}`}
              label={label}
              value={String(value)}
              onChange={(val) => {
                setValue(val);

                if (onChange) {
                  onChange(val);
                }
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

export default RadioGroupField;
