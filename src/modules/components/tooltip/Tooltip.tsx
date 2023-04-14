import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export interface ITooltip {
  text: string;
}

const Tooltip: React.FC<ITooltip> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center align-text-top"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ml-1 h-[14px] w-[14px]">
        <InformationCircleIcon />
      </div>
      <div
        className={`${
          isHovered ? '' : 'hidden'
        } absolute ml-4 max-w-[350px] flex-1 bg-illustration-black px-2 py-1 text-component-extra-small text-white`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
