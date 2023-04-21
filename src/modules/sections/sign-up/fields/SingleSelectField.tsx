import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { printErrorMessages } from '@/lib/helpers';
import { ISelectItem } from '@/lib/types';
import { Field } from 'houseform';
import { z } from 'zod';

export interface ISingleSelectField {
  fieldName: string;
  label: string;
  placeholder: string;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string | undefined;
  validator?: z.ZodSchema;
}

const SingleSelectField: React.FC<ISingleSelectField> = ({
  fieldName,
  label,
  placeholder,
  listOptions,
  isSubmitted,
  initialValue,
  validator,
}) => {
  return (
    <Field<string>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <>
            <SingleSelect
              name={`input-${fieldName}`}
              label={label}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
              onBlur={onBlur}
              listOptions={listOptions}
            />
            {printErrorMessages(isSubmitted, errors)}
          </>
        );
      }}
    </Field>
  );
};

export default SingleSelectField;
