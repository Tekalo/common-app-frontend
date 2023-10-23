import { CloseSVG } from '@/lib/constants/svgs';

interface ISkillPill {
  value: string;
  removeValue: (value: string) => void;
}

const SkillPill: React.FC<ISkillPill> = ({ removeValue, value }) => (
  <div
    key={value}
    className="mr-1 flex cursor-pointer items-center rounded-sm bg-light-blue px-1 py-[2px] text-component-small text-black-text"
    onClick={() => removeValue(value)}
  >
    <div className="flex-1"></div>
    {value}
    <div className="flex-none pl-2">
      <CloseSVG />
    </div>
  </div>
);

export default SkillPill;
