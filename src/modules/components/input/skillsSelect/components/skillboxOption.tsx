import { PlusIconSVG } from '@/lib/constants/svgs';

interface ISkillboxOption {
  active: boolean;
  disabled: boolean;
  skillName: string;
}

const SkillboxOption: React.FC<ISkillboxOption> = ({
  active,
  disabled,
  skillName,
}) => (
  <div
    className={`flex items-center p-2 ${
      active ? 'rounded-sm bg-light-blue' : ''
    }`}
  >
    <div
      className={`flex-1 text-component-medium ${
        disabled ? 'text-gray-2' : 'text-black-text'
      }`}
    >
      {skillName}
    </div>
    <div className="flex-none">{!disabled && <PlusIconSVG />}</div>
  </div>
);

export default SkillboxOption;
