import { ICausesSearchContext } from '@/lib/providers/CausesSearchProvider';
import { ISearchable } from '@/lib/providers/shared';
import { ISkillsSearchContext } from '@/lib/providers/skillsSearchProvider';
import SearchboxInput from '@/modules/components/input/searchSelect/components/searchboxInput';
import SearchboxOptionList from '@/modules/components/input/searchSelect/components/searchboxOptionList';
import { Combobox } from '@headlessui/react';
import { Context, useContext, useEffect, useState } from 'react';

export interface ISearchSelectConfig {
  isScrollable: boolean;
  maxItems: number;
  providerContext: Context<ICausesSearchContext | ISkillsSearchContext>;
  showDefaultOptions: boolean;
}

export interface ISearchSelect {
  config: ISearchSelectConfig;
  hasErrors: boolean;
  label: string;
  maxSelectedMessage: string;
  name: string;
  placeholder: string;
  setValue: (_val: string[]) => void;
  value: string[];
}

const SearchSelect: React.FC<ISearchSelect> = ({
  config,
  hasErrors,
  label,
  maxSelectedMessage,
  name,
  placeholder,
  setValue,
  value,
}) => {
  const [queryMatches, setQueryMatches] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ISearchable[]>([]);
  const searchCtx = useContext(config.providerContext);

  const {
    data: resultsLoaded,
    error: resultsError,
    isLoading: resultsLoading,
  } = searchCtx.useSearchable();

  const disabled = value.length >= config.maxItems;
  const inputId = `${name}-input`;
  const showOptionsButtonId = `open-${name}-btn`;

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

  // This displays the default options when focusing the input
  const clickShowOptionsButton = () => {
    if (config.showDefaultOptions && !value.length && !searchQuery.length) {
      document?.getElementById(showOptionsButtonId)?.click();
    }
  };

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
              showOptions={clickShowOptionsButton}
              value={value}
            />
            <Combobox.Button
              id={showOptionsButtonId}
              className="hidden"
            ></Combobox.Button>
            <SearchboxOptionList
              disabled={disabled}
              isScrollable={config.isScrollable}
              maxSelectedMessage={maxSelectedMessage}
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
