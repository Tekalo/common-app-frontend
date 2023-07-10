import SelectGroup from '@/components/input/selectGroup/SelectGroup';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { RefObject } from 'react';
import { z } from 'zod';

export interface ISelectGroupField {
  fieldName: string;
  label: string;
  helperText?: string;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string[] | undefined;
  validator?: z.ZodSchema;
  ref: RefObject<FieldInstance>;
  onChange?: (val: any) => void;
}

const SelectGroupField = React.forwardRef<FieldInstance, ISelectGroupField>(
  (props, ref) => {
    const {
      fieldName,
      label,
      helperText,
      listOptions,
      isSubmitted,
      initialValue,
      validator,
      onChange,
    } = props;

    const inputId = `input-${fieldName}`;

    return (
      <Field<string[]>
        name={fieldName}
        ref={ref}
        initialValue={initialValue}
        onSubmitValidate={validator}
        onChangeValidate={validator}
      >
        {({ value, setValue, onBlur, errors }) => {
          return (
            <div>
              <SelectGroup
                errors={errors}
                label={label}
                listOptions={listOptions}
                name={inputId}
                onBlur={onBlur}
                onChange={onChange}
                setValue={setValue}
                value={value}
              />
              {helperText ? (
                <div className="mt-2 text-left text-component-extra-small-helper-text">
                  {helperText}
                </div>
              ) : null}
              {printErrorMessages(inputId, isSubmitted, errors)}
            </div>
          );
        }}
      </Field>
    );
  }
);

SelectGroupField.displayName = 'SelectGroupField';

export default SelectGroupField;
