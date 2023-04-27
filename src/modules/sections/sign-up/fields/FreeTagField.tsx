import FreeTag from '@/components/input/freeTag/FreeTag';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { Field } from 'houseform';
import { z } from 'zod';

export interface IFreeTagField {
  fieldName: string;
  label: string;
  placeholder: string;
  isSubmitted: boolean;
  initialValue: string[] | undefined;
  validator?: z.ZodSchema;
}

const FreeTagField: React.FC<IFreeTagField> = ({
  fieldName,
  label,
  placeholder,
  isSubmitted,
  initialValue,
  validator,
}) => {
  return (
    <Field<string[]>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, errors }) => {
        return (
          <>
            <FreeTag
              name={`input-${fieldName}`}
              label={label}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
            />
            {printErrorMessages(isSubmitted, errors)}
          </>
        );
      }}
    </Field>
  );
};

export default FreeTagField;
