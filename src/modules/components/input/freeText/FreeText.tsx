import Tooltip from '@/components/tooltip/Tooltip';
import { getErrorMessageId } from '@/lib/helpers/formHelpers';

export interface IFreeText {
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

const FreeText: React.FC<IFreeText> = ({
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
        {label}
        {tooltipText ? <Tooltip text={tooltipText} /> : ''}
      </label>
      <input
        aria-describedby={getErrorMessageId(name)}
        aria-invalid={!!errors.length}
        disabled={disabled}
        name={name}
        className={`${
          disabled ? 'bg-gray-4' : ''
        } box-border h-[32px] w-full rounded-[3px]
                    border border-gray-2 p-2 text-component-medium outline-0 placeholder:text-gray-2 focus:border-2 focus:border-blue-1 focus:p-[7px] active:border active:border-blue-1 active:p-2`}
        value={value}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FreeText;
