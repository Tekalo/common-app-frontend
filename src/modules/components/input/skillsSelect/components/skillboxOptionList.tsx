import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { Combobox, Transition } from '@headlessui/react';
import { ISkill } from '../skillsSelect';
import SkillboxOption from './skillboxOption';

interface ISkillboxOptionList {
  disabled: boolean;
  open: boolean;
  options: ISkill[];
}

const SkillboxOptionList: React.FC<ISkillboxOptionList> = ({
  disabled,
  open,
  options,
}) => {
  const listOfOptions = options.map((option) => (
    <Combobox.Option
      className="cursor-pointer"
      key={option.name}
      value={[option.name]}
    >
      {({ active }) => (
        <SkillboxOption
          active={active}
          disabled={false}
          skillName={option.name}
        />
      )}
    </Combobox.Option>
  ));

  const maxSelectedOption = (
    <SkillboxOption
      active={false}
      disabled={true}
      skillName={
        APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skillsSelect.maxSkillsSelected
      }
    />
  );

  const displayOptions = disabled ? maxSelectedOption : listOfOptions;

  return (
    <>
      {
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className={`${open ? 'relative z-10' : null}`}
        >
          <Combobox.Options
            data-name="skills-select-options"
            className="absolute end-0 z-20 w-full rounded-[3px] bg-white p-1 pt-1 shadow-md focus:outline-none"
          >
            {displayOptions}
          </Combobox.Options>
        </Transition>
      }
    </>
  );
};

export default SkillboxOptionList;
