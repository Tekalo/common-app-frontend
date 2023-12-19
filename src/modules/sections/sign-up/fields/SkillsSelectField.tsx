import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en/en';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import SkillsSelect from '@/modules/components/input/skillsSelect/skillsSelect';
import { Field } from 'houseform';
import { z } from 'zod';

export interface ISkillsSelectField {
  fieldName: string;
  initialValue: string[] | undefined;
  isSubmitted: boolean;
  label: string;
  validator?: z.ZodSchema;
}

const SkillsSelectField: React.FC<ISkillsSelectField> = ({
  fieldName,
  initialValue,
  isSubmitted,
  label,
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
            <SkillsSelect
              hasErrors={!!errors.length}
              label={label}
              name={inputId}
              placeholder={
                !value.length
                  ? APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skillsSelect
                      .placeholder
                  : ''
              }
              setValue={setValue}
              value={value}
            />
            {printErrorMessages(inputId, isSubmitted, errors, false)}
          </div>
        );
      }}
    </Field>
  );
};

export default SkillsSelectField;
