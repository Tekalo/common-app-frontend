import { SearchIconSVG } from '@/lib/constants/svgs';
import { Combobox, Transition } from '@headlessui/react';
import { useState } from 'react';
import SkillPill from './skillPill';
import SkillboxOption from './skillboxOption';

interface ISkillsSelect {
  value: string[];
  setValue: (_val: string[]) => void;
}

const SkillsSelect: React.FC<ISkillsSelect> = ({ setValue, value }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // TODO: Hook this up to a service call
  const skills = [
    { name: 'Javascript' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'jQuery' },
    { name: 'C#' },
    { name: 'SQL' },
  ].filter((skill) => {
    return !value.includes(skill.name);
  });

  const skillResults =
    searchQuery === ''
      ? skills
      : skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const removeValueFromArray = <T,>(valueToRemove: T, arr: T[]): T[] => {
    const removeIdx = arr.indexOf(valueToRemove);
    let newArr: T[];

    if (removeIdx !== -1) {
      newArr = [...arr];
      newArr.splice(removeIdx, 1);
    } else {
      newArr = arr;
    }

    return newArr;
  };

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
            <div className="relative box-border flex w-full flex-wrap items-start gap-y-1 rounded-[3px] border border-gray-2 p-1 text-component-medium outline-0 placeholder:text-gray-2 focus:ring-blue-2">
              <div className="ml-[2px] mr-1 mt-[2px]">
                <SearchIconSVG />
              </div>
              {value.map((skill) => (
                <SkillPill
                  key={skill}
                  value={skill}
                  removeValue={() => {
                    setValue(removeValueFromArray(skill, value));
                  }}
                />
              ))}
              {/*
                TODO: How wide do we want the minimum input width to be?
              */}
              <Combobox.Input
                className="h-[22px] min-w-[75px] border-none bg-transparent p-0 focus:border-none focus:ring-0"
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
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
            {!!skillResults.length && (
              <Combobox.Options className="absolute end-0 z-20 w-full max-w-[344px] rounded-[3px] bg-white p-1 pt-1 shadow-md focus:outline-none">
                {skillResults.map((skill) => (
                  <Combobox.Option
                    className="cursor-pointer hover:rounded-sm hover:bg-light-blue"
                    key={skill.name}
                    value={[skill.name]}
                  >
                    <SkillboxOption skillName={skill.name} />
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            <Transition />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SkillsSelect;
