import LongText from '@/components/input/longText/LongText';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { Field } from 'houseform';
import { z } from 'zod';

export interface ILongTextField {
  fieldName: string;
  label: string;
  placeholder: string;
  isSubmitted: boolean;
  initialValue: string | undefined;
  validator?: z.ZodSchema;
  tooltipText?: string;
}

const LongTextField: React.FC<ILongTextField> = ({
  fieldName,
  label,
  placeholder,
  isSubmitted,
  initialValue,
  tooltipText,
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
          <div>
            <LongText
              name={`input-${fieldName}`}
              label={label}
              placeholder={placeholder}
              value={value}
              tooltipText={tooltipText}
              setValue={setValue}
              onBlur={onBlur}
            />
            {printErrorMessages(isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default LongTextField;