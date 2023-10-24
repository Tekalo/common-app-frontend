import { SearchIconSVG } from '@/lib/constants/svgs';
import { removeValueFromArray } from '@/lib/helpers/formHelpers';
import { Combobox } from '@headlessui/react';
import { ChangeEvent, useState } from 'react';
import SkillPill from './skillPill';

interface ISkillboxInput {
  disabled: boolean;
  focusInput: () => void;
  hasErrors: boolean;
  name: string;
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

  return (
    <div className="relative box-border flex w-full flex-wrap items-start justify-start gap-y-1 rounded-[3px] border border-gray-2 p-1 text-component-medium outline-0 placeholder:text-gray-2 focus:ring-blue-2">
      <div className="ml-[2px] mr-1 mt-[2px]">
        <SearchIconSVG />
      </div>
      {value.map((skill) => (
        <SkillPill
          key={skill}
          value={skill}
          removeValue={() => {
            setValue(removeValueFromArray(skill, value));
            focusInput();
          }}
        />
      ))}
      {
        <Combobox.Input
          id={name}
          className="h-[22px] w-[75px] flex-[1_1_75px] border-none bg-transparent p-0 focus:border-none focus:ring-0"
          aria-invalid={hasErrors}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onFocus(event);
            setSearchQuery(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.code === 'Backspace' && previousValue === '') {
              removeLastSkill();
            }
            setPreviousValue((event.target as HTMLInputElement).value);
          }}
          onFocus={onFocus}
        />
      }
    </div>
  );
};

export default SkillboxInput;
