import { PlusIconSVG } from '@/lib/constants/svgs';

export interface ISearchboxOption {
  active: boolean;
  custom?: boolean;
  disabled: boolean;
  optionName: string;
}

const SearchboxOption: React.FC<ISearchboxOption> = ({
  active,
  custom = false,
  disabled,
  optionName,
}) => (
  <div
    data-name={`searchbox-option-${optionName}`}
    className={`flex items-center p-2 ${
      active ? 'rounded-sm bg-light-blue' : 'bg-white'
    }`}
  >
    <div
      data-name="search-option-name"
      className={`min-h-[18px] max-w-[334px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-component-medium ${
        disabled || custom ? 'text-gray-2' : 'text-black-text'
      }`}
    >
      {optionName}
    </div>
    {!disabled && (
      <div data-name={`search-option-add-${optionName}`} className="flex-none">
        <PlusIconSVG />
      </div>
    )}
  </div>
);

export default SearchboxOption;
