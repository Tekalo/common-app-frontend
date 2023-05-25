import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import { RefObject, forwardRef } from 'react';
import { z } from 'zod';

export interface ISingleSelectField {
  fieldName: string;
  initialValue: string | undefined;
  isSubmitted: boolean;
  label: string;
  listOptions: ISelectItem[];
  placeholder: string;
  disabled?: boolean;
  onChange?: (val: string) => void;
  ref?: RefObject<FieldInstance>;
  tooltipText?: string;
  validator?: z.ZodSchema;
}

const SingleSelectField = forwardRef<FieldInstance, ISingleSelectField>(
  (props, ref) => {
    const {
      fieldName,
      initialValue,
      isSubmitted,
      label,
      listOptions,
      placeholder,
      disabled,
      onChange,
      tooltipText,
      validator,
    } = props;

    return (
      <Field<string>
        name={fieldName}
        initialValue={initialValue}
        onSubmitValidate={validator}
        onChangeValidate={validator}
        ref={ref}
      >
        {({ value, setValue, onBlur, errors }) => {
          return (
            <div>
              <SingleSelect
                name={`input-${fieldName}`}
                label={label}
                placeholder={placeholder}
                value={value}
                setValue={setValue}
                tooltipText={tooltipText}
                onBlur={onBlur}
                onChange={onChange}
                listOptions={listOptions}
                disabled={disabled}
              />
              {printErrorMessages(isSubmitted, errors, disabled)}
            </div>
          );
        }}
      </Field>
    );
  }
);

SingleSelectField.displayName = 'SingleSelectField';

export default SingleSelectField;
