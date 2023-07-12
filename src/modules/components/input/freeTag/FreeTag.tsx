import Tooltip from '@/components/tooltip/Tooltip';
import { getErrorMessageId } from '@/lib/helpers/formHelpers';

export interface IFreeTag {
  errors: string[];
  name: string;
  setValue: (_val: string[]) => void;
  value: string[];
  disabled?: boolean;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  onBlur?: () => void;
  placeholder?: string;
  tooltipText?: string;
}

const FreeText: React.FC<IFreeTag> = ({
  errors,
  name,
  setValue,
  value,
  disabled,
  inputClassName,
  label,
  labelClassName,
  onBlur,
  placeholder,
  tooltipText,
}) => {
  return (
    <div className="space-y-2 text-left">
      <label
        className={`${labelClassName} flex items-center text-component-extra-small text-black-text`}
        htmlFor={name}
      >
        {label}
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>
      <input
        disabled={disabled}
        name={name}
        className={`box-border h-[32px] w-full rounded-[3px]
                    border border-gray-2 p-2 text-component-medium outline-0 placeholder:text-gray-2
                    focus:border-2 focus:border-blue-1 focus:p-[7px]
                    active:border active:border-blue-1 active:p-2 ${inputClassName}}`}
        aria-describedby={getErrorMessageId(name)}
        aria-invalid={!!errors.length}
        value={value ? value.join(', ') : ''}
        onBlur={(e) =>
          setValue(
            e.target.value
              .split(',')
              .map((item) => item.trim())
              .filter((v) => v)
          )
        }
        onChange={(e) => setValue(e.target.value.split(', '))}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FreeText;
