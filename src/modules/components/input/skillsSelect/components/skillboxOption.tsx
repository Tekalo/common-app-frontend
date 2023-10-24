import { PlusIconSVG } from '@/lib/constants/svgs';

interface ISkillboxOption {
  skillName: string;
}

const SkillboxOption: React.FC<ISkillboxOption> = ({ skillName }) => (
  <div className="flex items-center p-2">
    <div className="flex-1 text-component-medium">{skillName}</div>
    <div className="flex-none">
      <PlusIconSVG />
    </div>
  </div>
);

export default SkillboxOption;
