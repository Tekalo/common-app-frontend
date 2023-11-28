import LongText from '@/components/input/longText/LongText';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
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
  const inputId = getInputId(fieldName);

  return (
    <Field<string>
      initialValue={initialValue}
      name={fieldName}
      onChangeValidate={validator}
      onSubmitValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div>
            <LongText
              errors={errors}
              label={label}
              name={inputId}
              onBlur={onBlur}
              placeholder={placeholder}
              setValue={setValue}
              tooltipText={tooltipText}
              value={value}
            />
            {printErrorMessages(inputId, isSubmitted, errors)}
          </div>
        );
      }}
    </Field>
  );
};

export default LongTextField;
