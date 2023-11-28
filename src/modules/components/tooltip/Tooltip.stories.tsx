import FreeText from '@/components/input/freeText/FreeText';
import { ITooltip } from '@/components/tooltip/Tooltip';
import { mockTooltipProps } from '@/components/tooltip/Tooltip.mocks';
import { Field } from 'houseform';
import { z } from 'zod';

const ToolTipExample: React.FC<ITooltip> = ({ text }) => {
  return (
    <Field<string>
      name="pronoun"
      onSubmitValidate={z.string()}
      onChangeValidate={z.string()}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div className="mt-52 p-4">
            <FreeText
              errors={errors}
              name="input-pronoun"
              label="Phone number (optional)"
              placeholder=""
              value={value}
              setValue={setValue}
              onBlur={onBlur}
              tooltipText={text}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default { component: ToolTipExample };

export const Default = {
  args: { ...mockTooltipProps.base },
};

export const Tall = {
  args: { ...mockTooltipProps.tall },
};
