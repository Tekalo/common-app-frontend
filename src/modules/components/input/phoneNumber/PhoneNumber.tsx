import Tooltip from '@/components/tooltip/Tooltip';
import PhoneInput from 'react-phone-input-2';

interface IPhoneNumber {
  errors: string[];
  name: string;
  onBlur: () => void;
  setValue: (_val: string) => void;
  value: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  tooltipText?: string;
}

const PhoneNumber: React.FC<IPhoneNumber> = ({
  errors,
  name,
  onBlur,
  setValue,
  value,
  disabled,
  label,
  placeholder,
  tooltipText,
}) => {
  return (
    <div className="space-y-2 text-left">
      <label
        className={`${
          disabled ? 'text-gray-1' : 'text-black-text'
        } flex items-center text-component-extra-small`}
        htmlFor={name}
      >
        <span data-name="label">{label}</span>
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>
      <PhoneInput
        inputProps={{
          name: name,
        }}
        country={'us'}
        value={value}
        placeholder={placeholder}
        copyNumbersOnly={false}
        onChange={(v) => setValue(v)}
      />
    </div>
  );
};

export default PhoneNumber;
