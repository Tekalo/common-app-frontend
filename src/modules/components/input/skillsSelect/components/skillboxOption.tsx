import { PlusIconSVG } from '@/lib/constants/svgs';

export interface ISkillboxOption {
  active: boolean;
  custom?: boolean;
  disabled: boolean;
  skillName: string;
}

const SkillboxOption: React.FC<ISkillboxOption> = ({
  active,
  disabled,
  custom = false,
  skillName,
}) => (
  <div
    data-name={`skillbox-option-${skillName}`}
    className={`flex items-center p-2 ${
      active ? 'rounded-sm bg-light-blue' : 'bg-white'
    }`}
  >
    <div
      data-name="skill-option-name"
      className={`max-w-[334px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-component-medium ${
        disabled || custom ? 'text-gray-2' : 'text-black-text'
      }`}
    >
      {skillName}
    </div>
    {!disabled && (
      <div data-name={`skill-option-add-${skillName}`} className="flex-none">
        <PlusIconSVG />
      </div>
    )}
  </div>
);

export default SkillboxOption;
