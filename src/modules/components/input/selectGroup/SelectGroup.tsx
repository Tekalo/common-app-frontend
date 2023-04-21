import { ISelectItem } from '@/lib/types';

export interface ISelectGroup {
  name: string;
  label?: string;
  value: string[];
  listOptions: ISelectItem[];
  setValue: (_val: string[]) => void;
  onBlur?: () => void;
}

const SelectGroup: React.FC<ISelectGroup> = ({
  value,
  setValue,
  listOptions: selectOptions,
  label,
}) => {
  return (
    <fieldset className="space-y-2 text-left">
      <legend className="text-component-extra-small text-black-text">
        {label}
      </legend>
      {selectOptions.map((option, idx) => (
        <div
          key={idx}
          className="flex flex-row items-center space-x-2 align-middle"
        >
          <>
            <input
              type="checkbox"
              id={option.value}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(e) => {
                const newValue = [...value];
                if (e.target.checked) newValue.push(e.target.value);
                else newValue.splice(newValue.indexOf(e.target.value), 1);
                setValue(newValue);
              }}
              className="form-checkbox appearance-none rounded-[3px] align-middle checked:bg-blue-1 checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
            />
          </>
          <label
            className="text-component-extra-small text-black-text"
            htmlFor={option.value}
          >
            {option.displayText}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default SelectGroup;
