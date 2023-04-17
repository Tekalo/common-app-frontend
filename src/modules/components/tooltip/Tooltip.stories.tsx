import FreeText from '@/components/input/freeText/FreeText';
import { Field } from 'houseform';
import { z } from 'zod';
import { ITooltip } from './Tooltip';
import { mockTooltipProps } from './Tooltip.mocks';

const ToolTipExample: React.FC<ITooltip> = ({ text }) => {
  return (
    <Field<string>
      name="pronouns"
      onSubmitValidate={z.string()}
      onChangeValidate={z.string()}
    >
      {({ value, setValue, onBlur, errors }) => {
        return (
          <div className="mt-52 p-4">
            <FreeText
              name="input-pronouns"
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
