import { SearchIconSVG } from '@/lib/constants/svgs';
import { removeValueFromArray } from '@/lib/helpers/formHelpers';
import { Combobox } from '@headlessui/react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import SkillPill from './skillPill';

interface ISkillboxInput {
  disabled: boolean;
  focusInput: () => void;
  hasErrors: boolean;
  name: string;
  placeholder: string;
  removeLastSkill: () => void;
  setSearchQuery: (query: string) => void;
  setValue: (val: string[]) => void;
  value: string[];
}

const SkillboxInput: React.FC<ISkillboxInput> = ({
  disabled,
  focusInput,
  hasErrors,
  name,
  placeholder,
  removeLastSkill,
  setSearchQuery,
  setValue,
  value,
}) => {
  const [previousValue, setPreviousValue] = useState('');

  // This is for when the top number of skills have been selected
  // Don't allow them to type, and forces showing the message
  // about the max number of skills
  const onFocus = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      event.target.value = '';
    }
  };

  const onKeyUpEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputTarget = event.target as HTMLInputElement;

    if (event.code === 'Backspace' && previousValue === '') {
      // If they hit backspace with no input value
      removeLastSkill();
      setInputWidth(inputTarget.value, true);
    } else if (event.code === 'Enter' && inputTarget.value === '') {
      // If they hit enter with value in the input,
      // it submits it, need to resize
      setInputWidth(inputTarget.value);
    } else if (event.code === 'Escape') {
      // Escape clears the input, so we need to resize again
      setInputWidth('');
    }

    setPreviousValue(inputTarget.value);
  };

  const setInputWidth = (_val: string, onBackspace = false): void => {
    const input = document.getElementById(name);
    // We need this because it is called before the actual value
    // is removed on a Backspace event, So, we need to subtract 1 from the
    // length to get the actual value
    const valueLength = onBackspace ? value.length - 1 : value.length;

    if (input) {
      const charWidth = (_val.length + 1) * 8 + 'px';
      const maxWidth = '200px';

      input.style.width =
        valueLength >= 1 || _val.length ? charWidth : maxWidth;
    }
  };

  return (
    <div
      className="relative box-border flex w-full flex-wrap items-start justify-start gap-y-1 rounded-[3px] border border-gray-2 p-1 text-component-medium outline-0 placeholder:text-gray-2 focus:ring-blue-2"
      onClick={focusInput}
    >
      <div
        className="ml-[2px] mr-1 mt-[2px]"
        data-name="skills-select-search-icon"
      >
        <SearchIconSVG />
      </div>
      {value.map((skill) => (
        <SkillPill
          key={skill}
          value={skill}
          removeValue={() => {
            setValue(removeValueFromArray(skill, value));
            setInputWidth('', true);
            focusInput();
          }}
        />
      ))}
      {
        <Combobox.Input
          aria-invalid={hasErrors}
          className="h-[22px] max-w-[334px] border-none bg-transparent p-0 focus:border-none focus:ring-0"
          id={name}
          onBlur={() => {
            setInputWidth('');
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onFocus(event);
            setInputWidth(event.target.value);
            setSearchQuery(event.target.value);
          }}
          onFocus={onFocus}
          onKeyUp={onKeyUpEvent}
          placeholder={placeholder}
        />
      }
    </div>
  );
};

export default SkillboxInput;
