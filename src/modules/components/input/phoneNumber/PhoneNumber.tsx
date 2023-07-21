import Tooltip from '@/components/tooltip/Tooltip';
import PhoneInput from 'react-phone-input-2';

interface IPhoneNumber {
  errors: string[];
  name: string;
  value: string;
  label?: string;
  setValue: (_val: string) => void;
  onBlur: () => void;
  placeholder?: string;
  tooltipText?: string;
  disabled?: boolean;
}

const PhoneNumber: React.FC<IPhoneNumber> = ({
  errors,
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
        onChange={(v) => {
          console.log(v);
          setValue(v);
        }}
      />
    </div>
  );
};

export default PhoneNumber;
