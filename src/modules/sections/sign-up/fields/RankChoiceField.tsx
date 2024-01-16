import RankChoice from '@/components/input/rankChoice/RankChoice';
import { INTEREST_FORM_TEXT } from '@/lang/en/en';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { CausesSearchContext } from '@/lib/providers/CausesSearchProvider';
import { ISelectItem } from '@/lib/types';
import SearchSelect, {
  ISearchSelectConfig,
} from '@/modules/components/input/searchSelect/searchSelect';
import { Field } from 'houseform';
import { z } from 'zod';

export interface IRankChoiceField {
  fieldName: string;
  listenTo?: string[];
  selectLabel: string;
  rankLabel: string;
  placeholder: string;
  selectionLabelMulti: string;
  selectionLabelSingle: string;
  listOptions: ISelectItem[];
  isSubmitted: boolean;
  initialValue: string[] | undefined;
  validator?: z.ZodSchema;
  disabled?: boolean;
}

const RankChoiceField: React.FC<IRankChoiceField> = ({
  fieldName,
  rankLabel,
  isSubmitted,
  initialValue,
  validator,
  disabled = false,
}) => {
  const inputId = getInputId(fieldName);

  const mapValueToItems = (value: string[]): ISelectItem[] => {
    if (value && value.length) {
      return value.map((s) => {
        return {
          value: s,
          displayText: s,
        };
      });
    } else {
      return [];
    }
  };

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
        const items = mapValueToItems(value);

        return (
          <>
            <div>
              <SearchSelect
                config={config}
                hasErrors={!!errors.length}
                label={INTEREST_FORM_TEXT.FIELDS.interestCauses.selectLabel}
                maxSelectedMessage={
                  INTEREST_FORM_TEXT.FIELDS.interestCauses.maxCausesSelected
                }
                name={inputId}
                placeholder={
                  !value.length
                    ? INTEREST_FORM_TEXT.FIELDS.interestCauses.placeholder
                    : ''
                }
                setValue={(val) => {
                  setValue(val);
                }}
                value={value}
              />
              {printErrorMessages(inputId, isSubmitted, errors, disabled)}
            </div>
            <RankChoice
              label={rankLabel}
              setValue={setValue}
              name="interestRank"
              rankOptions={items}
            />
          </>
        );
      }}
    </Field>
  );
};

export default RankChoiceField;
