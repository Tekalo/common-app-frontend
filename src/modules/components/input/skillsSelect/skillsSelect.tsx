import {
  ISkill,
  SkillsSearchContext,
} from '@/lib/providers/skillsSearchProvider';
import { Combobox } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import SkillboxInput from './components/skillboxInput';
import SkillboxOptionList from './components/skillboxOptionList';

export interface ISkillsSelect {
  hasErrors: boolean;
  label: string;
  name: string;
  placeholder: string;
  setValue: (_val: string[]) => void;
  value: string[];
}

const SkillsSelect: React.FC<ISkillsSelect> = ({
  hasErrors,
  label,
  name,
  placeholder,
  setValue,
  value,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [skillResults, setSkillResults] = useState<ISkill[]>([]);
  const searchCtx = useContext(SkillsSearchContext);

  const inputId = `${name}-input`;
  const disabled = value.length >= 8;

  useEffect(() => {
    const getSkills = async (): Promise<void> =>
      setSkillResults(await searchCtx.searchWithQuery(searchQuery, value));

    getSkills();
  }, [searchCtx, searchQuery, value]);

  const focusInput = (): void => {
    const skillsInput = document.getElementById(`${name}-input`);

    if (skillsInput) {
      skillsInput.focus();
    }
  };

  const removeLastSkill = (setValue: (_val: string[]) => void): void => {
    const newVal = [...value];
    newVal.splice(value.length - 1, 1);

    setValue(newVal);
  };

  return (
    <div className="relative text-left">
      <Combobox
        name={name}
        value={value}
        onChange={(newVal: string[]) => {
          setValue(value.concat(newVal));
          focusInput();
        }}
      >
        {({ open }) => (
          <>
            <Combobox.Label
              data-name="label"
              className="mb-2 block text-left text-component-extra-small text-black-text"
            >
              {label}
            </Combobox.Label>
            <SkillboxInput
              disabled={disabled}
              focusInput={focusInput}
              hasErrors={hasErrors}
              name={inputId}
              placeholder={placeholder}
              removeLastSkill={() => {
                removeLastSkill(setValue);
              }}
              setSearchQuery={setSearchQuery}
              setValue={setValue}
              value={value}
            />
            <SkillboxOptionList
              disabled={disabled}
              open={open}
              options={skillResults}
              searchQuery={searchQuery}
            />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SkillsSelect;
