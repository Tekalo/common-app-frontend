import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import { printErrorMessages } from '@/lib/helpers';
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
  return (
    <Field<string[]>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <>
            <MultiSelect
              disabled={disabled}
              name={`input-${fieldName}`}
              label={label}
              placeholder={placeholder}
              selectionLabelMulti={selectionLabelMulti}
              selectionLabelSingle={selectionLabelSingle}
              value={value}
              setValue={setValue}
              onBlur={onBlur}
              listOptions={listOptions}
            />
            {printErrorMessages(isSubmitted, errors)}
          </>
        );
      }}
    </Field>
  );
};

export default MultiSelectField;
