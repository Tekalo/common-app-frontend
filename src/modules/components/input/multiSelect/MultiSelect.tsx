import { getErrorMessageId } from '@/lib/helpers/utilities';
import { ISelectItem } from '@/lib/types';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export interface IMultiSelect {
  buttonStyles?: string;
  disabled?: boolean;
  errors: string[];
  label: string;
  labelStyles?: string;
  limit?: number;
  listOptions: ISelectItem[];
  name: string;
  onBlur?: () => void;
  optionStyles?: string;
  placeholder?: string;
  selectionLabelMulti?: string;
  selectionLabelSingle?: string;
  setValue: (_val: string[]) => void;
  value: string[];
}

const MultiSelect: React.FC<IMultiSelect> = ({
  buttonStyles,
  disabled,
  errors,
  label,
  labelStyles,
  limit,
  listOptions: selectOptions,
  name,
  placeholder,
  selectionLabelMulti,
  selectionLabelSingle,
  setValue,
  value,
}) => {
  const canSelectMore = limit ? value.length < limit : true;
  const eventTargetName = `${name}-target`;

  return (
    <Listbox
      disabled={disabled}
      value={value}
      onChange={(val) => {
        setValue(val);
      }}
      name={name}
      multiple={true}
    >
      {({ open, value }) => (
        <div id={eventTargetName} className="text-left">
          <Listbox.Label
            data-name="label"
            className={`text-component-extra-small ${
              disabled ? 'text-gray-2' : 'text-black-text'
            } ${labelStyles}}`}
            htmlFor={name}
          >
            {label}
          </Listbox.Label>
          <div className={`mt-2 ${disabled ? 'bg-gray-4' : ''}`}>
            <Listbox.Button
              data-name="button"
              aria-describedby={getErrorMessageId(name)}
              aria-invalid={!!errors.length}
              name={name}
              className={`flex w-full flex-row items-center justify-between rounded-[3px] border ${
                open ? 'border-blue-1' : 'border-gray-2'
              } p-2 text-left font-sans text-component-medium placeholder:text-gray-2 ${buttonStyles}`}
            >
              {value.length > 0 ? (
                <div className="flex flex-row">
                  <div className="rounded bg-light-blue px-1">
                    {`${value.length} x `}
                  </div>
                  <span className="ml-1 block truncate">
                    {value.length > 1
                      ? selectionLabelMulti
                      : selectionLabelSingle}
                  </span>
                </div>
              ) : (
                <span data-name="placeholder" className="text-gray-2">
                  {placeholder}
                </span>
              )}
              {open ? (
                <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpIcon
                    className="h-3 w-3 fill-blue-1 stroke-2 text-blue-1"
                    aria-hidden="true"
                  />
                </span>
              ) : (
                <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-3 w-3 fill-black-text text-black-text"
                    aria-hidden="true"
                  />
                </span>
              )}
            </Listbox.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className={`${open ? 'relative z-10' : null}`}
            >
              <Listbox.Options
                data-name="list-options"
                className="absolute z-20 w-full rounded-[3px] bg-white px-3 py-2 shadow-md focus:outline-none"
              >
                {selectOptions.map((option) => {
                  const isSelected = value.includes(option.value);

                  return (
                    <Listbox.Option
                      data-name={`${name}-${option.value}`}
                      key={option.value}
                      className={({ active }) =>
                        `flex cursor-default select-none flex-row rounded-[3px] align-middle ${
                          active ? 'bg-light-blue' : ''
                        }`
                      }
                      value={option.value}
                      disabled={!canSelectMore && !isSelected}
                    >
                      {() => {
                        const isDisabled = !isSelected && !canSelectMore;

                        return (
                          <div className="flex flex-row space-x-2 px-2 py-2 align-middle">
                            <input
                              name={option.value}
                              className="form-checkbox appearance-none rounded-[3px] align-middle checked:bg-blue-1 
                             checked:hover:bg-blue-2 checked:hover:ring-blue-2 focus:ring-1 focus:ring-blue-2 checked:focus:bg-blue-2 checked:focus:ring-blue-2"
                              type="checkbox"
                              checked={isSelected}
                              disabled={isDisabled}
                              readOnly
                            />
                            <label
                              htmlFor={option.value}
                              className={`text-component-small text-black-text ${
                                isDisabled ? 'text-gray-2' : ''
                              }`}
                            >
                              {option.displayText}
                            </label>
                          </div>
                        );
                      }}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default MultiSelect;
