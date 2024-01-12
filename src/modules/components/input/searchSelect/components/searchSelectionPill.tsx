import { CloseSVG } from '@/lib/constants/svgs';

export interface ISearchSelectionPill {
  value: string;
  removeValue: (value: string) => void;
}

const SearchSelectionPill: React.FC<ISearchSelectionPill> = ({
  removeValue,
  value,
}) => (
  <div
    data-name={`search-selection-pill-${value}`}
    key={value}
    className="mr-1 inline-flex max-w-[270px] cursor-pointer items-center rounded-sm bg-light-blue p-[2px] text-component-small text-black-text"
    onClick={() => removeValue(value)}
  >
    <div
      data-name="value"
      className="max-w-[209px] flex-none overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-[245px]"
    >
      {value}
    </div>
    <div data-name="close" className="flex-none pl-2">
      <CloseSVG />
    </div>
  </div>
);

export default SearchSelectionPill;
