import { getInputId, printErrorMessages } from '@/lib/helpers/formHelpers';
import PhoneNumber from '@/modules/components/input/phoneNumber/PhoneNumber';
import { Field, FormInstance } from 'houseform';
import { z } from 'zod';

export interface IPhoneNumberField {
  fieldName: string;
  initialValue: string | undefined;
  isSubmitted: boolean;
  label: string;
  placeholder: string;
  disabled?: boolean;
  listenTo?: string[];
  tooltipText?: string;
  validator?: z.ZodSchema | ((v: string, f: FormInstance) => Promise<boolean>);
}

const PhoneNumberField: React.FC<IPhoneNumberField> = ({
  fieldName,
  initialValue,
  isSubmitted,
  label,
  placeholder,
  disabled = false,
  listenTo,
  tooltipText,
  validator,
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
