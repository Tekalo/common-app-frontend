import SingleSelect from '@/components/input/singleSelect/SingleSelect';
import { printErrorMessages } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
import { Field, FieldInstance } from 'houseform';
import { RefObject, forwardRef } from 'react';
import { z } from 'zod';

export interface ISingleSelectField {
  fieldName: string;
  label: string;
  placeholder: string;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string | undefined;
  tooltipText?: string;
  validator?: z.ZodSchema;
  disabled?: boolean;
  ref?: RefObject<FieldInstance>;
}

const SingleSelectField = forwardRef<FieldInstance, ISingleSelectField>(
  (props, ref) => {
    const {
      fieldName,
      label,
      placeholder,
      listOptions,
      isSubmitted,
      initialValue,
      validator,
      disabled,
      tooltipText,
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
            <>
              <SingleSelect
                name={`input-${fieldName}`}
                label={label}
                placeholder={placeholder}
                value={value}
                setValue={setValue}
                tooltipText={tooltipText}
                onBlur={onBlur}
                listOptions={listOptions}
                disabled={disabled}
              />
              {printErrorMessages(isSubmitted, errors)}
            </>
          );
        }}
      </Field>
    );
  }
);

SingleSelectField.displayName = 'SingleSelectField';

export default SingleSelectField;
