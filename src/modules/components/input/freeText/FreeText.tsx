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
}) => {
  return (
    <div className="space-y-2 text-left">
      <label
        className={`relative flex items-center text-component-extra-small text-black-text ${labelClassName}}`}
        htmlFor={name}
      >
        {label}
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>
      <input
        name={name}
        className={`w-full rounded-[3px] border border-gray-2 p-2 text-component-medium placeholder:text-gray-2 ${inputClassName}}`}
        value={value}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FreeText;
