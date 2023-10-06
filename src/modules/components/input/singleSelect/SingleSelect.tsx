import Tooltip from '@/components/tooltip/Tooltip';
import { fireOnInputEvent, getErrorMessageId } from '@/lib/helpers/formHelpers';
import { ISelectItem } from '@/lib/types';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

export interface ISingleSelect {
  buttonClassName?: string;
  disabled?: boolean;
  errors: string[];
  label: string;
  labelClassName?: string;
  listOptions: ISelectItem[];
  name: string;
  onBlur?: () => void;
  onChange?: (val: string) => void;
  optionsClassName?: string;
  placeholder?: string;
  setValue: (_val: string) => void;
  tooltipText?: string;
  value: string;
}

const SingleSelect: React.FC<ISingleSelect> = ({
  buttonClassName,
  disabled,
  errors,
  label: labelText,
  labelClassName,
  listOptions,
  name,
  onChange,
  placeholder,
  setValue,
  tooltipText,
  value,
}) => {
  const eventTargetName = `${name}-target`;

  return (
    <Listbox
      value={value}
      onChange={(val) => {
        setValue(val);
        fireOnInputEvent(document.getElementById(eventTargetName));

        if (onChange) {
          onChange(val);
        }
      }}
      name={name}
      disabled={disabled}
    >
      {({ open }) => (
        <div id={eventTargetName} className="text-left">
          <Listbox.Label
            className={`flex items-center text-component-extra-small text-black-text  ${labelClassName}}`}
            htmlFor={name}
          >
            {labelText}
            {tooltipText ? <Tooltip text={tooltipText} /> : ''}
          </Listbox.Label>
          <div className="mt-2">
            <Listbox.Button
              aria-describedby={getErrorMessageId(name)}
              aria-invalid={!!errors.length}
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
              className={`${open ? 'relative z-10' : null}`}
            >
              <Listbox.Options className="absolute mt-1 w-full space-y-1 rounded-[3px] bg-white px-1 pb-2 pt-1 shadow-md focus:outline-none">
                {listOptions.map((option) => (
                  <Listbox.Option
                    data-name={`${name}-${option.value}`}
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
