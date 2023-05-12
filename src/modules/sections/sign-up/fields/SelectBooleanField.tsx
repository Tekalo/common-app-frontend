import SelectBoolean from '@/components/input/selectBoolean/SelectBoolean';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { IBoolItem } from '@/lib/types';
import { Field } from 'houseform';
import { ReactElement } from 'react';
import { z } from 'zod';

export interface ISelectBooleanField {
  fieldName: string;
  label: string | ReactElement;
  placeholder: string;
  listOptions: IBoolItem[];
  isSubmitted: boolean;
  initialValue: boolean | undefined;
  validator?: z.ZodSchema;
}

const SelectBooleanField: React.FC<ISelectBooleanField> = ({
  fieldName,
  label,
  placeholder,
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
            <SelectBoolean
              name={`input-${fieldName}`}
              label={label}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
              onBlur={onBlur}
              listOptions={listOptions}
            />
            {printErrorMessages(isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default SelectBooleanField;
