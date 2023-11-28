import FreeText from '@/components/input/freeText/FreeText';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { Field, FormInstance } from 'houseform';
import { z } from 'zod';

export interface IFreeTextField {
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

const FreeTextField: React.FC<IFreeTextField> = ({
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
            <FreeText
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

export default FreeTextField;
