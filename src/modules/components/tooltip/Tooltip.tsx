import { IFilledSVG, IOutlineSVG } from '@/lib/constants/svgs';
import { useState } from 'react';

export interface ITooltip {
  text: string;
}

const Tooltip: React.FC<ITooltip> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div data-name="tooltip" className="flex items-center align-text-top">
        <div
          className="ml-1 h-[16px] w-[16px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(true)}
        >
          {isHovered ? (
            IFilledSVG
          ) : (
            <IOutlineSVG height="16px" width="16px" color="#272929" />
          )}
        </div>
        <div
          data-name="tooltip-content"
          className={
            isHovered
              ? "tooltip-box absolute z-10 ml-6 max-w-[350px] flex-1 rounded-sm bg-illustration-black px-2 py-1 text-component-extra-small text-white shadow after:absolute after:left-0 after:top-[calc(50%-5px)] after:-ml-[10px] after:border-[5px] after:border-solid after:border-[transparent] after:border-r-illustration-black after:content-['']"
              : 'hidden'
          }
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
