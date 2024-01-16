import RankChoice from '@/components/input/rankChoice/RankChoice';
import { printErrorMessages } from '@/lib/helpers/display';
import { getInputId } from '@/lib/helpers/utilities';
import { ISelectItem } from '@/lib/types';
import { CausesSelectValidator } from '@/lib/validators/array';
import { Field } from 'houseform';
import { z } from 'zod';
import CausesSelectField from './CausesSelectField';

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
  return (
    <Field<string[]>
      name={fieldName}
      initialValue={initialValue}
      onSubmitValidate={validator}
      onChangeValidate={validator}
    >
      {({ value, setValue, errors }) => {
        console.log('val', value);

        const items = mapValueToItems(value);

        console.log('items', items);

        return (
          <>
            <div>
              <CausesSelectField
                fieldName={fieldName}
                initialValue={initialValue}
                isSubmitted={isSubmitted}
                label="Causes label"
                setParentValue={setValue}
                validator={CausesSelectValidator}
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
