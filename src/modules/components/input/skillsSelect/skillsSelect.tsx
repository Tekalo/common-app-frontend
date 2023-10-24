import { Combobox, Transition } from '@headlessui/react';
import { useState } from 'react';
import SkillboxInput from './components/skillboxInput';
import SkillboxOptionList from './components/skillboxOptionList';

interface ISkillsSelect {
  value: string[];
  setValue: (_val: string[]) => void;
}

export interface ISkill {
  name: string;
}

const SkillsSelect: React.FC<ISkillsSelect> = ({ setValue, value }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // TODO: Hook this up to a service call
  const skills: ISkill[] = [
    { name: 'Javascript' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'jQuery' },
    { name: 'C#' },
    { name: 'SQL' },
    { name: 'Manual Automation' },
    { name: 'Agile software development' },
  ].filter((skill) => {
    return !value.includes(skill.name);
  });

  const skillResults =
    searchQuery === ''
      ? skills
      : skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="relative">
      <Combobox
        value={value}
        onChange={(newVal: string[]) => {
          setValue(value.concat(newVal));
        }}
      >
        {({ open }) => (
          <>
            <SkillboxInput
              setSearchQuery={setSearchQuery}
              setValue={setValue}
              value={value}
            />
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className={`${open ? 'relative z-10' : null}`}
            ></Transition>
            {/*
              TODO: Add custom skills when none in list
            */}
            <SkillboxOptionList options={skillResults} />
            <Transition />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SkillsSelect;
