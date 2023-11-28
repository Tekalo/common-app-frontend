import Tooltip from '@/components/tooltip/Tooltip';
import { getErrorMessageId } from '@/lib/helpers/utilities';
import { ISelectItem } from '@/lib/types';

export interface IRadioGroup {
  errors: string[];
  listOptions: ISelectItem[];
  name: string;
  onChange: (_val: string) => void;
  value: string;
  label?: string;
  onBlur?: () => void;
  rowAlign?: boolean;
  tooltipText?: string;
}

const RadioGroup: React.FC<IRadioGroup> = ({
  errors,
  listOptions,
  name,
  onChange,
  value,
  label,
  rowAlign = false,
  tooltipText,
}) => {
  return (
    <fieldset
      className={`text-left ${rowAlign ? 'flex flex-row' : 'space-y-2'}`}
    >
      <legend
        className={`flex pb-2 text-component-extra-small text-black-text`}
      >
        <span data-name="label">{label}</span>
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </legend>
      {/* RADIO OPTIONS */}
      {listOptions.map((option, idx) => (
        <div
          className={`flex gap-x-2 ${
            rowAlign ? 'w-20' : 'w-[100%] md:w-[125%]'
          }`}
          key={idx}
        >
          <div className="flex h-[16px] w-[16px] items-center justify-center">
            <input
              aria-describedby={getErrorMessageId(name)}
              aria-invalid={!!errors.length}
              className={`form-radio h-[16px] w-[16px] 
                          appearance-none align-middle checked:m-1 checked:h-[10px] checked:w-[10px]
                          checked:bg-blue-1 checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2
                          checked:hover:bg-blue-2 focus:ring-1 focus:ring-blue-2
                          checked:focus:bg-blue-2 checked:focus:ring-blue-2`}
              type="radio"
              id={option.displayText}
              name={`${name}-${option.value}`}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <label
            htmlFor={`${name}-${option.displayText}`}
            className={`text-component-medium text-black-text`}
          >
            {option.displayText}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
