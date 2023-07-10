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
  const inputId = `input-${fieldName}`;

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
            <RadioGroup
              errors={errors}
              label={label}
              listOptions={listOptions}
              name={inputId}
              onBlur={onBlur}
              onChange={(val) => {
                setValue(val);
                if (onChange) {
                  onChange(val);
                }
              }}
              rowAlign={rowAlign}
              value={String(value)}
            />
            {helperText ? <>{helperText}</> : null}
            {printErrorMessages(inputId, isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default RadioGroupField;
