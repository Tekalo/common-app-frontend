import Tooltip from '@/components/tooltip/Tooltip';

export interface IFreeText {
  name: string;
  value: string;
  label?: string;
  setValue: (_val: string) => void;
  onBlur: () => void;
  placeholder?: string;
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
  tooltipText,
  disabled,
}) => {
  return (
    <div className="space-y-2 text-left">
      <label
        className={`flex items-center text-component-extra-small ${
          disabled ? 'text-gray-2' : 'text-black-text'
        }}`}
        htmlFor={name}
      >
        {label}
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>
      <input
        disabled={disabled}
        name={name}
        className={`active:p-2} box-border h-[32px] w-full
                    rounded-[3px] border border-gray-2 p-2 text-component-medium outline-0 placeholder:text-gray-2 focus:border-2 focus:border-blue-1 focus:p-[7px] active:border active:border-blue-1`}
        value={value}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FreeText;
