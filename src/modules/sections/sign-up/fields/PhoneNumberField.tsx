import { getInputId, printErrorMessages } from '@/lib/helpers/formHelpers';
import PhoneNumber from '@/modules/components/input/phoneNumber/PhoneNumber';
import { Field, FormInstance } from 'houseform';
import { z } from 'zod';

interface IPhoneNumberField {
  fieldName: string;
  listenTo?: string[];
  label: string;
  placeholder: string;
  isSubmitted: boolean;
  initialValue: string | undefined;
  tooltipText?: string;
  validator?: z.ZodSchema | ((v: string, f: FormInstance) => Promise<boolean>);
  disabled?: boolean;
}

const PhoneNumberField: React.FC<IPhoneNumberField> = ({
  fieldName,
  listenTo,
  label,
  placeholder,
  isSubmitted,
  initialValue,
  validator,
  tooltipText,
  disabled = false,
}) => {
  const inputId = getInputId(fieldName);

  return (
    <Field<string>
      initialValue={initialValue}
      listenTo={listenTo}
      name={fieldName}
      onChangeValidate={validator}
      onSubmitValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div>
            <PhoneNumber
              errors={errors}
              disabled={disabled}
              label={label}
              name={inputId}
              onBlur={onBlur}
              placeholder={placeholder}
              setValue={setValue}
              tooltipText={tooltipText}
              value={value}
            />
            {printErrorMessages(inputId, isSubmitted, errors, disabled)}
          </div>
        );
      }}
    </Field>
  );
};

export default PhoneNumberField;
