import RankChoice from '@/components/input/rankChoice/RankChoice';
import {
  APPLICANT_EXPERIENCE_FORM_TEXT,
  INTEREST_FORM_TEXT,
} from '@/lang/en/en';
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
    isScrollable: false,
    maxItems: 8,
    providerContext: CausesSearchContext,
    showDefaultOptions: false,
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

        console.log('value', value);
        console.log('items', items);

        return (
          <>
            <div>
              <SearchSelect
                config={config}
                hasErrors={!!errors.length}
                label={INTEREST_FORM_TEXT.FIELDS.interestCauses.selectLabel}
                name={inputId}
                placeholder={
                  !value.length
                    ? APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skillsSelect
                        .placeholder
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
              setValue={(v) => {
                console.log(2);
                setValue(v);
              }}
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
