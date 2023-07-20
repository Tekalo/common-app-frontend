import Tooltip from '@/components/tooltip/Tooltip';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/plain.css';

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
        inputClass={`${
          disabled ? 'bg-gray-4' : ''
        } box-border h-[32px] w-full rounded-[3px]
                    border border-gray-2 p-2 text-component-medium outline-0 placeholder:text-gray-2 focus:border-2 focus:border-blue-1 focus:p-[7px] active:border active:border-blue-1 active:p-2`}
        buttonClass="border border-gray-2"
        dropdownClass="border border-gray-2 w-[327px] md:w-[344px]"
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
