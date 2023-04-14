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
      onClick={() => setIsHovered(true)}
    >
      <div className="ml-1 h-[14px] w-[14px]">
        <InformationCircleIcon />
      </div>
      <div
        className={`${
          isHovered ? '' : 'hidden'
        } tooltip-box absolute ml-6 max-w-[350px] flex-1 bg-illustration-black px-2 py-1 text-component-extra-small text-white 
            after:absolute after:left-0 after:top-[calc(50%-5px)] after:-ml-[10px] after:border-[5px] after:border-solid after:border-[transparent] after:border-r-illustration-black after:content-['']`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
