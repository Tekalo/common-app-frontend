import { IRadioItem } from '@/lib/types';

export interface IRadioGroup {
  value: string;
  setValue: (_val: string) => void;
  radioOptions: IRadioItem[];
  onBlur?: () => void;
  legendText?: string;
  fieldSetClassName?: string;
  legendClassName?: string;
  radioClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const RadioGroup: React.FC<IRadioGroup> = ({
  value,
  setValue,
  radioOptions,
  legendText,
  fieldSetClassName,
  legendClassName,
  radioClassName,
  inputClassName,
  labelClassName,
}) => {
  return (
    <fieldset className={`space-y-3 text-left ${fieldSetClassName}`}>
      <legend
        className={`pb-1 text-component-extra-small text-black-text ${legendClassName}`}
      >
        {legendText}
      </legend>
      {/* RADIO OPTIONS */}
      {radioOptions.map((option, idx) => (
        <div className={`flex items-start gap-x-2 ${radioClassName}`} key={idx}>
          <div className="flex h-[16px] w-[16px] items-center justify-center">
            <input
              className={`form-radio h-[16px] w-[16px] 
                          appearance-none align-middle checked:m-1 checked:h-[10px] checked:w-[10px]
                          checked:bg-blue-1 checked:bg-none checked:ring-1 checked:ring-blue-1 checked:ring-offset-2
                          checked:hover:bg-blue-2 focus:ring-1 focus:ring-blue-2
                          checked:focus:bg-blue-2 checked:focus:ring-blue-2 ${inputClassName}`}
              type="radio"
              id={option.value}
              name="searchStatus"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <label
            htmlFor={option.value}
            className={`text-component-medium text-black-text ${labelClassName}`}
          >
            {option.displayText}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
