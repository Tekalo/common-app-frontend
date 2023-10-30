import { CloseSVG } from '@/lib/constants/svgs';

export interface ISkillPill {
  value: string;
  removeValue: (value: string) => void;
}

const SkillPill: React.FC<ISkillPill> = ({ removeValue, value }) => (
  <div
    data-name={`skill-pill-${value}`}
    key={value}
    className="mr-1 inline-flex cursor-pointer items-center rounded-sm bg-light-blue px-1 py-1 text-component-small text-black-text"
    onClick={() => removeValue(value)}
  >
    <div data-name="value" className="flex-none">
      {value}
    </div>
    <div data-name="close" className="flex-none pl-2">
      <CloseSVG />
    </div>
  </div>
);

export default SkillPill;
