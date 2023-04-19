import { useState } from 'react';

export interface ITooltip {
  text: string;
}

const Tooltip: React.FC<ITooltip> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="flex items-center align-text-top">
        <div
          className="ml-1 h-[16px] w-[16px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(true)}
        >
          {isHovered ? (
            <svg
              className="relative z-10"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
                fill="#272929"
                shapeRendering="geometricPrecision"
              />
              <path
                d="M8.66659 5.33329C8.66659 5.70148 8.36811 5.99996 7.99992 5.99996C7.63173 5.99996 7.33325 5.70148 7.33325 5.33329C7.33325 4.9651 7.63173 4.66663 7.99992 4.66663C8.36811 4.66663 8.66659 4.9651 8.66659 5.33329Z"
                fill="white"
                shapeRendering="geometricPrecision"
              />
              <path
                d="M7.33325 7.99992C7.33325 7.72378 7.63173 7.33325 7.99992 7.33325C8.36811 7.33325 8.66659 7.72378 8.66659 7.99992V10.6666C8.66659 10.9427 8.36811 11.3333 7.99992 11.3333C7.63173 11.3333 7.33325 10.9427 7.33325 10.6666V7.99992Z"
                fill="white"
                shapeRendering="geometricPrecision"
              />
            </svg>
          ) : (
            <svg
              className="relative z-10"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99992 13.6666C11.1295 13.6666 13.6666 11.1296 13.6666 7.99998C13.6666 4.87037 11.1295 2.33331 7.99992 2.33331C4.8703 2.33331 2.33325 4.87037 2.33325 7.99998C2.33325 11.1296 4.8703 13.6666 7.99992 13.6666ZM7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
                fill="#272929"
                shapeRendering="geometricPrecision"
              />
              <path
                d="M8.66659 5.33329C8.66659 5.70148 8.36811 5.99996 7.99992 5.99996C7.63173 5.99996 7.33325 5.70148 7.33325 5.33329C7.33325 4.9651 7.63173 4.66663 7.99992 4.66663C8.36811 4.66663 8.66659 4.9651 8.66659 5.33329Z"
                fill="#272929"
                shapeRendering="geometricPrecision"
              />
              <path
                d="M7.33325 7.99998C7.33325 7.72384 7.63173 7.33331 7.99992 7.33331C8.36811 7.33331 8.66659 7.72384 8.66659 7.99998V10.6666C8.66659 10.9428 8.36811 11.3333 7.99992 11.3333C7.63173 11.3333 7.33325 10.9428 7.33325 10.6666V7.99998Z"
                fill="#272929"
                shapeRendering="geometricPrecision"
              />
            </svg>
          )}
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
