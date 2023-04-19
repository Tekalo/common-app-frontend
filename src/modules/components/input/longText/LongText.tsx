export interface ILongText {
  name: string;
  value: string;
  label?: string;
  setValue: (_val: string) => void;
  onBlur: () => void;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const LongText: React.FC<ILongText> = ({
  name,
  label,
  value,
  setValue,
  onBlur,
  placeholder,
  labelClassName,
  inputClassName,
}) => {
  return (
    <div className="space-y-2 text-left">
      <label
        className={`${labelClassName} flex items-center text-component-extra-small text-black-text`}
        htmlFor={name}
      >
        {label}
      </label>
      <textarea
        name={name}
        className={`box-border min-h-[194px] w-full resize-y rounded-[3px]
                    border border-gray-2 p-2 text-component-medium outline-0 placeholder:text-gray-2
                    focus:border-2 focus:border-blue-1 focus:p-[7px] focus:shadow-none focus:ring-0
                    active:border active:border-blue-1 active:p-2 active:shadow-none active:ring-0 ${inputClassName}}`}
        value={value}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LongText;
