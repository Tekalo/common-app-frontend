export interface ITextInput {
  name: string;
  value: string;
  setValue: (_val: string) => void;
  onBlur: () => void;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const TextInput: React.FC<ITextInput> = ({
  name,
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
        className={`text-component-extra-small text-black-text ${labelClassName}}`}
        htmlFor={name}
      >
        Name
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

export default TextInput;
