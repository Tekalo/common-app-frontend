import SelectBoolean from '@/components/input/selectBoolean/SelectBoolean';
import { getInputId, printErrorMessages } from '@/lib/helpers/formHelpers';
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
  const inputId = getInputId(fieldName);

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
              errors={errors}
              label={label}
              listOptions={listOptions}
              name={inputId}
              onBlur={onBlur}
              placeholder={placeholder}
              setValue={setValue}
              value={value}
            />
            {printErrorMessages(inputId, isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default SelectBooleanField;
