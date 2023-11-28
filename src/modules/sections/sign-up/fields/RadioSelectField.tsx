import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { ReactElement, RefObject } from 'react';
import { z } from 'zod';

interface IRadioSelectField {
  fieldName: string;
  initialValue: boolean | undefined;
  isSubmitted: boolean;
  label: string;
  listOptions: ISelectItem[];
  helperText?: string | ReactElement;
  ref?: RefObject<FieldInstance>;
  rowAlign?: boolean;
  tooltipText?: string;
  validator?: z.ZodSchema;
}

const RadioSelectField = React.forwardRef<FieldInstance, IRadioSelectField>(
  (props, ref) => {
    const {
      fieldName,
      initialValue,
      isSubmitted,
      label,
      listOptions,
      helperText,
      rowAlign,
      tooltipText,
      validator,
    } = props;
    const inputId = getInputId(fieldName);

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
                errors={errors}
                label={label}
                listOptions={listOptions}
                name={inputId}
                onBlur={onBlur}
                onChange={(val) => setValue(val === 'true')}
                rowAlign={rowAlign}
                tooltipText={tooltipText}
                value={String(value)}
              />

              {helperText ? <>{helperText}</> : null}

              {printErrorMessages(inputId, isSubmitted, errors)}
            </div>
          );
        }}
      </Field>
    );
  }
);

RadioSelectField.displayName = 'RadioSelectField';

export default RadioSelectField;
