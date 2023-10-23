import { PlusIconSVG, SearchIconSVG } from '@/lib/constants/svgs';
import { Combobox, Transition } from '@headlessui/react';
import { useState } from 'react';

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
  ];

  const skillResults =
    searchQuery === ''
      ? skills
      : skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div className="">
      <Combobox value={value} onChange={setValue}>
        {({ open, value }) => (
          <>
            <div className="relative">
              <div className="absolute left-2 top-[7px]">
                <SearchIconSVG />
              </div>
              <Combobox.Input
                className="box-border h-[32px] w-full rounded-[3px]
            border border-gray-2 p-2 pl-8 text-component-medium outline-0 placeholder:text-gray-2 focus:ring-blue-2"
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
            <Combobox.Options className="absolute top-[73px] z-20 w-full max-w-[344px] rounded-[3px] bg-white p-1 pt-1 shadow-md focus:outline-none">
              {skillResults.map((skill) => (
                <Combobox.Option
                  className="cursor-pointer hover:rounded-sm hover:bg-light-blue"
                  key={skill.name}
                  value={skill.name}
                >
                  <div className="flex items-center p-2">
                    <div className="flex-1 text-component-medium">
                      {skill.name}
                    </div>
                    <div className="flex-none">
                      <PlusIconSVG />
                    </div>
                  </div>
                </Combobox.Option>
              ))}
            </Combobox.Options>
            <Transition />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SkillsSelect;
