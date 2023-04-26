import SelectGroup from '@/components/input/selectGroup/SelectGroup';
import { printErrorMessages } from '@/lib/helpers';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import React, { RefObject } from 'react';
import { z } from 'zod';

export interface ISelectGroupField {
  fieldName: string;
  label: string;
  helperText?: string;
  fieldRef?: RefObject<FieldInstance>;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string[] | undefined;
  validator?: z.ZodSchema;
}

const SelectGroupField: React.FC<ISelectGroupField> = ({
  fieldName,
  label,
  helperText,
  fieldRef,
  listOptions,
  isSubmitted,
  initialValue,
  validator,
}) => {
  return (
    <Field<string[]>
      name={fieldName}
      ref={fieldRef}
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
};

export default SelectGroupField;
