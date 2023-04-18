import Tooltip from '@/components/tooltip/Tooltip';

export interface IFreeText {
  name: string;
  value: string;
  label?: string;
  setValue: (_val: string) => void;
  onBlur: () => void;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  tooltipText?: string;
  disabled?: boolean;
}

const FreeText: React.FC<IFreeText> = ({
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
        className={`${labelClassName} text-black-text} relative flex items-center text-component-extra-small`}
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
        value={value}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FreeText;
