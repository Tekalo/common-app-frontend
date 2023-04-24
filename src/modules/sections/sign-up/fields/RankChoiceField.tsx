import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import RankChoice from '@/components/input/rankChoice/RankChoice';
import { CauseOptions } from '@/lib/constants/selects';
import { printErrorMessages } from '@/lib/helpers';
import { ISelectItem, RankChoiceItem } from '@/lib/types';
import { Field } from 'houseform';
import { z } from 'zod';

export interface IRankChoiceField {
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

const RankChoiceField: React.FC<IRankChoiceField> = ({
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
  const mapValueToItems = (value: string[]): RankChoiceItem[] => {
    if (value && value.length) {
      return value.map((s) => {
        return {
          value: s,
          displayText:
            CauseOptions.find((item) => item.value === s)?.displayText || '',
        };
      });
    } else {
      return [];
    }
  };
  return (
    <Field<string[]>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, onBlur, errors }) => {
        const items = mapValueToItems(value);

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

            <RankChoice
              label={
                'Rank the causes you would be interested in working on with 1 being the highest.'
              }
              setValue={setValue}
              name="interestRank"
              rankOptions={items}
            ></RankChoice>
          </>
        );
      }}
    </Field>
  );
};

export default RankChoiceField;
