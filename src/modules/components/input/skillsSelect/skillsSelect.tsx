import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import SkillboxInput from './components/skillboxInput';
import SkillboxOptionList from './components/skillboxOptionList';

interface ISkillsSelect {
  hasErrors: boolean;
  label: string;
  name: string;
  placeholder: string;
  setValue: (_val: string[]) => void;
  value: string[];
}

export interface ISkill {
  name: string;
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

  // TODO: Hook this up to a service call
  const skills: ISkill[] = [
    { name: 'Agile software development' },
    { name: 'C#' },
    { name: 'Cryptography' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Javascript' },
    { name: 'jQuery' },
    { name: 'Manual Automation' },
    { name: 'SQL' },
  ].filter((skill) => {
    return !value.includes(skill.name);
  });

  const inputId = `${name}-input`;
  const disabled = value.length >= 8;

  const skillResults =
    searchQuery === ''
      ? skills
      : skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

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

            {/*
              TODO: Add custom skills when none in list
            */}
            <SkillboxOptionList
              disabled={disabled}
              open={open}
              options={skillResults}
            />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SkillsSelect;
