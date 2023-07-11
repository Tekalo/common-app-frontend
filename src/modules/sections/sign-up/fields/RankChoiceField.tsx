import MultiSelect from '@/components/input/multiSelect/MultiSelect';
import RankChoice from '@/components/input/rankChoice/RankChoice';
import { CauseOptions } from '@/lib/constants/selects';
import { getInputId, printErrorMessages } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
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
  selectLabel,
  rankLabel,
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

  const mapValueToItems = (value: string[]): ISelectItem[] => {
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
            <div>
              <MultiSelect
                errors={errors}
                disabled={disabled}
                label={selectLabel}
                listOptions={listOptions}
                name={inputId}
                onBlur={onBlur}
                placeholder={placeholder}
                selectionLabelMulti={selectionLabelMulti}
                selectionLabelSingle={selectionLabelSingle}
                setValue={setValue}
                value={value || []}
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
