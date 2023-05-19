import Tooltip from '@/components/tooltip/Tooltip';
import { ISelectItem } from '@/lib/types';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

export interface ISingleSelect {
  label: string;
  listOptions: ISelectItem[];
  name: string;
  setValue: (_val: string) => void;
  value: string;
  buttonClassName?: string;
  disabled?: boolean;
  labelClassName?: string;
  onBlur?: () => void;
  onChange?: (val: string) => void;
  optionsClassName?: string;
  placeholder?: string;
  tooltipText?: string;
}

const SingleSelect: React.FC<ISingleSelect> = ({
  name,
  value,
  placeholder,
  setValue,
  label: labelText,
  listOptions,
  labelClassName,
  optionsClassName,
  buttonClassName,
  disabled,
  tooltipText,
  onChange,
}) => {
  return (
    <Listbox
      value={value}
      onChange={(val) => {
        setValue(val);

        if (onChange) {
          onChange(val);
        }
      }}
      name={name}
      disabled={disabled}
    >
      {({ open }) => (
        <div className="text-left">
          <Listbox.Label
            className={`flex items-center text-component-extra-small text-black-text  ${labelClassName}}`}
            htmlFor={name}
          >
            {labelText}
            {tooltipText ? <Tooltip text={tooltipText} /> : ''}
          </Listbox.Label>
          <div className="mt-2">
            <Listbox.Button
              name={name}
              className={`${
                disabled ? ' bg-gray-4' : ''
              } flex w-full flex-row items-center justify-between rounded-[3px] border ${
                open ? 'border-blue-1' : 'border-gray-2'
              } p-2 text-left font-sans text-component-medium placeholder:text-gray-2 ${buttonClassName}`}
            >
              {value ? (
                <span className="">
                  {(listOptions.find((option) => option.value == value) || {})
                    .displayText || placeholder}
                </span>
              ) : (
                <span className="text-gray-2">{placeholder}</span>
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
            >
              <Listbox.Options className="absolute mt-1 w-full space-y-1 rounded-[3px] bg-white px-1 pb-2 pt-1 shadow-md focus:outline-none">
                {listOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `flex cursor-default select-none flex-row justify-between rounded-sm px-1 align-middle ${
                        active ? 'bg-light-blue' : ''
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span className="">{option.displayText}</span>

                        {selected ? (
                          <span className={`flex items-center pr-2`}>
                            <CheckIcon
                              className="h-3 w-3 stroke-[4px] text-blue-1"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default SingleSelect;