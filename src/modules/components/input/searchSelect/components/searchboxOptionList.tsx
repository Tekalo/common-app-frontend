import { ISearchable } from '@/lib/providers/shared';
import SearchboxOption from '@/modules/components/input/searchSelect/components/searchboxOption';
import { Combobox, Transition } from '@headlessui/react';
import React, { ReactElement } from 'react';

interface ISearchboxOptionList {
  disabled: boolean;
  isScrollable: boolean;
  maxSelectedMessage: string;
  open: boolean;
  options: ISearchable[];
  queryMatches: boolean;
  searchQuery: string;
}

const SearchboxOptionList: React.FC<ISearchboxOptionList> = ({
  disabled,
  isScrollable,
  maxSelectedMessage,
  open,
  options,
  queryMatches,
  searchQuery,
}) => {
  const shouldDisplayOptions = !!searchQuery?.length || searchQuery === '';
  const scrollableClasses = 'max-h-[300px] overflow-y-scroll';

  const addCustomOption = (): ReactElement => {
    return (
      <Combobox.Option
        className="cursor-pointer"
        key={`add-${searchQuery}`}
        value={[searchQuery]}
      >
        {({ active }) => (
          <SearchboxOption
            active={active}
            custom={true}
            disabled={false}
            optionName={`“${searchQuery}”`}
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
    <SearchboxOption
      active={false}
      disabled={true}
      optionName={maxSelectedMessage}
    />
  );

  const renderPassedOptions = (): ReactElement[] => {
    return options.map((option) => (
      <Combobox.Option
        className="cursor-pointer"
        key={option.canonical}
        value={[option.canonical]}
      >
        {({ active }) => (
          <SearchboxOption
            active={active}
            disabled={false}
            optionName={option.canonical}
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
            className={`absolute end-0 z-20 w-full rounded-[3px] bg-white p-1 pt-1 shadow-md focus:outline-none ${
              isScrollable ? scrollableClasses : ''
            }`}
          >
            {displayOptions}
          </Combobox.Options>
        </Transition>
      )}
    </>
  );
};

export default SearchboxOptionList;
