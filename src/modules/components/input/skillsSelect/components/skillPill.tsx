import { CloseSVG } from '@/lib/constants/svgs';

export interface ISkillPill {
  value: string;
  removeValue: (value: string) => void;
}

const SkillPill: React.FC<ISkillPill> = ({ removeValue, value }) => (
  <div
    data-name={`skill-pill-${value}`}
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

export default SkillPill;
