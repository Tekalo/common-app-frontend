import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon as FilledInfoCircle } from '@heroicons/react/24/solid';
import { useState } from 'react';

export interface ITooltip {
  text: string;
}

const Tooltip: React.FC<ITooltip> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="flex items-center align-text-top"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(true)}
      >
        <div className="relative z-10 ml-1 h-[14px] w-[14px]">
          {isHovered ? <FilledInfoCircle /> : <InformationCircleIcon />}
        </div>
        <div
          className={`${
            isHovered ? '' : 'hidden'
          } tooltip-box absolute ml-6 max-w-[350px] flex-1 rounded-sm bg-illustration-black px-2 py-1 text-component-extra-small text-white shadow
            after:absolute after:left-0 after:top-[calc(50%-5px)] after:-ml-[10px] after:border-[5px] after:border-solid after:border-[transparent] after:border-r-illustration-black after:content-['']`}
        >
          {text}
        </div>
      </div>
      <div
        className={`${
          isHovered ? '' : 'hidden'
        } fixed bottom-0 left-0 right-0 top-0 z-0`}
        onClick={() => {
          setIsHovered(false);
        }}
        onMouseEnter={() => {
          setIsHovered(false);
        }}
      ></div>
    </>
  );
};

export default Tooltip;
