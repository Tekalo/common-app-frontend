import Tooltip from '@/components/tooltip/Tooltip';

export interface IFreeTag {
  name: string;
  value: string[];
  label?: string;
  setValue: (_val: string[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  tooltipText?: string;
  disabled?: boolean;
}

const FreeText: React.FC<IFreeTag> = ({
  name,
  label,
  value,
  setValue,
  onBlur,
  placeholder,
  labelClassName,
  inputClassName,
  tooltipText,
  disabled,
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
