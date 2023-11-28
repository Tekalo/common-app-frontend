import SkillboxOption from '@/components/input/skillsSelect/components//skillboxOption';
import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { ISkill } from '@/lib/providers/skillsSearchProvider';
import { Combobox, Transition } from '@headlessui/react';
import { ReactElement } from 'react';

interface ISkillboxOptionList {
  disabled: boolean;
  open: boolean;
  options: ISkill[];
  queryMatches: boolean;
  searchQuery: string;
}

const SkillboxOptionList: React.FC<ISkillboxOptionList> = ({
  disabled,
  open,
  options,
  queryMatches,
  searchQuery,
}) => {
  const shouldDisplayOptions = !!searchQuery?.length || searchQuery === '';

  const addCustomOption = (): ReactElement => {
    return (
      <Combobox.Option
        className="cursor-pointer"
        key={`add-${searchQuery}`}
        value={[searchQuery]}
      >
        {({ active }) => (
          <SkillboxOption
            active={active}
            custom={true}
            disabled={false}
            skillName={`“${searchQuery}”`}
          />
        )}
      </Combobox.Option>
    );
  };

  const getListOptions = (): ReactElement | ReactElement[] => {
    let content: ReactElement | ReactElement[];

    if (disabled) {
      content = maxSelectedOption;
    } else if (!options.length && searchQuery?.length) {
      content = addCustomOption();
    } else {
      content =
        searchQuery.length && !queryMatches
          ? renderPassedOptions().concat(addCustomOption())
          : renderPassedOptions();
    }

    return content;
  };

  const maxSelectedOption = (
    <SkillboxOption
      active={false}
      disabled={true}
      skillName={
        APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skillsSelect.maxSkillsSelected
      }
    />
  );

  const renderPassedOptions = (): ReactElement[] => {
    return options.map((option) => (
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
  };

  const displayOptions = getListOptions();

  return (
    <>
      {shouldDisplayOptions && (
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
      )}
    </>
  );
};

export default SkillboxOptionList;
