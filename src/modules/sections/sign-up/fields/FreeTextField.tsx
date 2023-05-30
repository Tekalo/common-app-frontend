import FreeText from '@/components/input/freeText/FreeText';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
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
  return (
    <Field<string>
      listenTo={listenTo}
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div>
            <FreeText
              name={`input-${fieldName}`}
              disabled={disabled}
              tooltipText={tooltipText}
              label={label}
              placeholder={placeholder}
              value={value}
              setValue={setValue}
              onBlur={onBlur}
            />
            {printErrorMessages(isSubmitted, errors, disabled)}
          </div>
        );
      }}
    </Field>
  );
};

export default FreeTextField;
