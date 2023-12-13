import SkillboxInput from '@/components/input/skillsSelect/components/skillboxInput';
import SkillboxOptionList from '@/components/input/skillsSelect/components/skillboxOptionList';
import {
  ISkill,
  SkillsSearchContext,
} from '@/lib/providers/skillsSearchProvider';
import { Combobox } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';

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
  const [queryMatches, setQueryMatches] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [skillResults, setSkillResults] = useState<ISkill[]>([]);
  const searchCtx = useContext(SkillsSearchContext);

  const inputId = `${name}-input`;
  const disabled = value.length >= 8;

  useEffect(() => {
    searchCtx.fetchSkills();
  }, []);

  useEffect(() => {
    const getSkills = async (): Promise<void> => {
      const searchResults = searchCtx.searchWithQuery(searchQuery, value);

      setQueryMatches(searchResults.queryMatches);
      setSkillResults(searchResults.results);
    };

    getSkills();
  }, [searchCtx, searchQuery, value]);

  const clearInput = (): void => {
    const skillsInput = document.getElementById(
      `${name}-input`
    ) as HTMLInputElement;

    if (skillsInput) {
      skillsInput.value = '';
    }
  };

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

  const valueAlreadyAdded = (newVal: string[]) => {
    return value.map((v) => v.toLowerCase()).includes(newVal[0].toLowerCase());
  };

  return (
    <div className="relative text-left">
      <Combobox
        name={name}
        value={value}
        onChange={(newVal: string[]) => {
          if (!valueAlreadyAdded(newVal)) {
            setValue(value.concat(newVal));
          } else {
            clearInput();
          }

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
              clearInput={clearInput}
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
              queryMatches={queryMatches}
              searchQuery={searchQuery}
            />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SkillsSelect;
