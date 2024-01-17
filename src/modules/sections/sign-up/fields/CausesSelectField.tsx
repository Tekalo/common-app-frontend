import { INTEREST_FORM_TEXT } from '@/lang/en/en';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { CausesSearchContext } from '@/lib/providers/CausesSearchProvider';
import SearchSelect, {
  ISearchSelectConfig,
} from '@/modules/components/input/searchSelect/searchSelect';
import { Field } from 'houseform';
import { z } from 'zod';

export interface ICausesSelectField {
  fieldName: string;
  initialValue: string[] | undefined;
  isSubmitted: boolean;
  label: string;
  validator?: z.ZodSchema;
}

const CausesSelectField: React.FC<ICausesSelectField> = ({
  fieldName,
  initialValue,
  isSubmitted,
  label,
  validator,
}) => {
  const inputId = getInputId(fieldName);
  const config: ISearchSelectConfig = {
    isScrollable: true,
    maxItems: 5,
    providerContext: CausesSearchContext,
    showDefaultOptions: true,
  };

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
            <SearchSelect
              config={config}
              hasErrors={!!errors.length}
              label={label}
              maxSelectedMessage={
                INTEREST_FORM_TEXT.FIELDS.interestCauses.maxCausesSelected
              }
              name={inputId}
              placeholder={
                !value.length
                  ? INTEREST_FORM_TEXT.FIELDS.interestCauses.placeholder
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

export default CausesSelectField;
