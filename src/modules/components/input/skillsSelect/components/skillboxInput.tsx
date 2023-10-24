import { SearchIconSVG } from '@/lib/constants/svgs';
import { removeValueFromArray } from '@/lib/helpers/formHelpers';
import { Combobox } from '@headlessui/react';
import SkillPill from './skillPill';

interface ISkillboxInput {
  setSearchQuery: (query: string) => void;
  setValue: (val: string[]) => void;
  value: string[];
}

const SkillboxInput: React.FC<ISkillboxInput> = ({
  setSearchQuery,
  setValue,
  value,
}) => (
  <>
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
          }}
        />
      ))}
      <Combobox.Input
        className="h-[22px] w-[75px] flex-[1_1_75px] border-none bg-transparent p-0 focus:border-none focus:ring-0"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </div>
  </>
);

export default SkillboxInput;
