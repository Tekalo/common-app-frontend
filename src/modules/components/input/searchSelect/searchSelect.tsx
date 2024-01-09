import { SkillsSearchContext } from '@/lib/providers/skillsSearchProvider';
import { ISearchable } from '@/lib/types';
import SearchboxInput from '@/modules/components/input/searchSelect/components/searchboxInput';
import SearchboxOptionList from '@/modules/components/input/searchSelect/components/searchboxOptionList';
import { Combobox } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';

export interface ISearchSelect {
  hasErrors: boolean;
  label: string;
  name: string;
  placeholder: string;
  setValue: (_val: string[]) => void;
  value: string[];
}

const SearchSelect: React.FC<ISearchSelect> = ({
  hasErrors,
  label,
  name,
  placeholder,
  setValue,
  value,
}) => {
  const [queryMatches, setQueryMatches] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ISearchable[]>([]);

  // TODO: Pull this out, needs to be one level above, or on a switch based on a flag
  const searchCtx = useContext(SkillsSearchContext);

  const {
    data: resultsLoaded,
    error: resultsError,
    isLoading: resultsLoading,
  } = searchCtx.useSkills();

  // -----

  const inputId = `${name}-input`;
  const disabled = value.length >= 8;

  useEffect(() => {
    const getSearchOptions = async (): Promise<void> => {
      const searchResults = searchCtx.searchWithQuery(searchQuery, value);

      setQueryMatches(searchResults.queryMatches);
      setSearchResults(searchResults.results);
    };

    if ((resultsLoaded || resultsError) && !resultsLoading) {
      getSearchOptions();
    }
  }, [
    searchCtx,
    searchQuery,
    value,
    resultsError,
    resultsLoaded,
    resultsLoading,
  ]);

  const getInput = (): HTMLInputElement | null =>
    document.getElementById(`${name}-input`) as HTMLInputElement;

  const clearInput = (): void => {
    const searchInput = getInput();

    if (searchInput) {
      searchInput.value = '';
    }
  };

  const focusInput = (): void => {
    const searchInput = getInput();

    if (searchInput) {
      searchInput.focus();
    }
  };

  const removeLastSelection = (setValue: (_val: string[]) => void): void => {
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
            <SearchboxInput
              clearInput={clearInput}
              disabled={disabled}
              focusInput={focusInput}
              hasErrors={hasErrors}
              name={inputId}
              placeholder={placeholder}
              removeLastSelection={() => {
                removeLastSelection(setValue);
              }}
              setSearchQuery={setSearchQuery}
              setValue={setValue}
              value={value}
            />
            <SearchboxOptionList
              disabled={disabled}
              open={open}
              options={searchResults}
              queryMatches={queryMatches}
              searchQuery={searchQuery}
            />
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SearchSelect;
