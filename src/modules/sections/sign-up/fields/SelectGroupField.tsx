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
    } = props;

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
                name={`input-${fieldName}`}
                label={label}
                value={value}
                setValue={setValue}
                onBlur={onBlur}
                listOptions={listOptions}
              />
              {helperText ? (
                <div className="mt-2 text-left text-component-extra-small-helper-text">
                  {helperText}
                </div>
              ) : null}
              {printErrorMessages(isSubmitted, errors)}
            </div>
          );
        }}
      </Field>
    );
  }
);

SelectGroupField.displayName = 'SelectGroupField';

export default SelectGroupField;
