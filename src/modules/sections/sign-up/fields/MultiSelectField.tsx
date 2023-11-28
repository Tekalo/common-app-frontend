import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { ISelectItem } from '@/lib/types';
import { Field } from 'houseform';
import { z } from 'zod';

export interface IMultiSelectField {
  fieldName: string;
  listenTo?: string[];
  label: string;
  placeholder: string;
  selectionLabelMulti: string;
  selectionLabelSingle: string;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string[] | undefined;
  validator?: z.ZodSchema;
  disabled?: boolean;
}

const MultiSelectField: React.FC<IMultiSelectField> = ({
  fieldName,
  label,
  placeholder,
  selectionLabelMulti,
  selectionLabelSingle,
  listOptions,
  isSubmitted,
  initialValue,
  validator,
  disabled = false,
}) => {
  const inputId = getInputId(fieldName);

  return (
    <Field<string[]>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div>
            <MultiSelect
              errors={errors}
              disabled={disabled}
              label={label}
              listOptions={listOptions}
              name={inputId}
              onBlur={onBlur}
              placeholder={placeholder}
              selectionLabelMulti={selectionLabelMulti}
              selectionLabelSingle={selectionLabelSingle}
              setValue={setValue}
              value={value}
            />
            {printErrorMessages(inputId, isSubmitted, errors, disabled)}
          </div>
        );
      }}
    </Field>
  );
};

export default MultiSelectField;
