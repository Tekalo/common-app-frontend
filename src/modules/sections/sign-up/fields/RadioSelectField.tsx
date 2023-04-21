import RadioGroup from '@/components/input/radioGroup/RadioGroup';
import { printErrorMessages } from '@/lib/helpers';
import { IRadioItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { ReactElement, RefObject } from 'react';
import { z } from 'zod';

interface IRadioSelectField {
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

export default class RadioSelectField extends React.Component<IRadioSelectField> {
  render() {
    const {
      fieldName,
      label,
      helperText,
      fieldRef,
      rowAlign,
      listOptions,
      isSubmitted,
      initialValue,
      validator,
    } = this.props;

    return (
      <Field<boolean>
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
}
