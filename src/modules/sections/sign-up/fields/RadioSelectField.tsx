import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { ReactElement, RefObject } from 'react';
import { z } from 'zod';

interface IRadioSelectField {
  fieldName: string;
  label: string;
  helperText?: string | ReactElement;
  ref?: RefObject<FieldInstance>;
  rowAlign?: boolean;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: boolean | undefined;
  validator?: z.ZodSchema;
}

const RadioSelectField = React.forwardRef<FieldInstance, IRadioSelectField>(
  (props, ref) => {
    const {
      fieldName,
      label,
      helperText,
      rowAlign,
      listOptions,
      isSubmitted,
      initialValue,
      validator,
    } = props;

    return (
      <Field<boolean>
        name={fieldName}
        ref={ref}
        initialValue={initialValue}
        onSubmitValidate={validator}
        onChangeValidate={validator}
      >
        {({ value, setValue, onBlur, errors }) => {
          return (
            <div className="space-y-2">
              <RadioGroup
                name={`input-${fieldName}`}
                label={label}
                value={String(value)}
                onChange={(val) => setValue(val === 'true')}
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
  }
);

RadioSelectField.displayName = 'RadioSelectField';

export default RadioSelectField;
