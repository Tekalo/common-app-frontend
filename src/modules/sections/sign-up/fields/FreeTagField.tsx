import FreeTag from '@/components/input/freeTag/FreeTag';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
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
  const inputId = getInputId(fieldName);

  return (
    <Field<string[]>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, errors }) => {
        return (
          <div>
            <FreeTag
              errors={errors}
              label={label}
              name={inputId}
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

export default FreeTagField;
