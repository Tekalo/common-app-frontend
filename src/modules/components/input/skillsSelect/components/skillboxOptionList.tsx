import { Combobox } from '@headlessui/react';
import { ISkill } from '../skillsSelect';
import SkillboxOption from './skillboxOption';

interface ISkillboxOptionList {
  options: ISkill[];
}

const SkillboxOptionList: React.FC<ISkillboxOptionList> = ({ options }) => (
  <>
    {!!options.length && (
      <Combobox.Options className="absolute end-0 z-20 w-full max-w-[344px] rounded-[3px] bg-white p-1 pt-1 shadow-md focus:outline-none">
        {options.map((option) => (
          <Combobox.Option
            className="cursor-pointer hover:rounded-sm hover:bg-light-blue"
            key={option.name}
            value={[option.name]}
          >
            <SkillboxOption skillName={option.name} />
          </Combobox.Option>
        ))}
      </Combobox.Options>
    )}
  </>
);

export default SkillboxOptionList;
