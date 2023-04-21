import FreeText from '@/components/input/freeText/FreeText';
import { printErrorMessages } from '@/lib/helpers';
import { Field } from 'houseform';
import { z } from 'zod';

export interface IFreeTextField {
  fieldName: string;
  label: string;
  placeholder: string;
  isSubmitted: boolean;
  initialValue: string | undefined;
  validator?: z.ZodSchema;
}

const FreeTextField: React.FC<IFreeTextField> = ({
  fieldName,
  label,
  placeholder,
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
            <FreeText
              name={`input-${fieldName}`}
              label={label}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
              onBlur={onBlur}
            />
            {printErrorMessages(isSubmitted, errors)}
          </>
        );
      }}
    </Field>
  );
};

export default FreeTextField;
