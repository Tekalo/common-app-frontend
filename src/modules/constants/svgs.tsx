// TODO: Make all of these FCs so we can customize them

export interface ISVGProps {
  color: string;
  height: string;
  width: string;
}

export const GreenCheckSvg: React.FC<ISVGProps> = ({
  color,
  height,
  width,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 6.5L5 10.5L11 1.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandleSvg = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.44005 3.69219C5.79351 3.69219 6.08005 3.41668 6.08005 3.07681C6.08005 2.73694 5.79351 2.46143 5.44005 2.46143C5.08659 2.46143 4.80005 2.73694 4.80005 3.07681C4.80005 3.41668 5.08659 3.69219 5.44005 3.69219Z"
      fill="#6B7281"
      stroke="#6B7281"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5602 3.69219C10.9136 3.69219 11.2002 3.41668 11.2002 3.07681C11.2002 2.73694 10.9136 2.46143 10.5602 2.46143C10.2067 2.46143 9.92017 2.73694 9.92017 3.07681C9.92017 3.41668 10.2067 3.69219 10.5602 3.69219Z"
      fill="#6B7281"
      stroke="#6B7281"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.44005 8.61529C5.79351 8.61529 6.08005 8.33977 6.08005 7.99991C6.08005 7.66004 5.79351 7.38452 5.44005 7.38452C5.08659 7.38452 4.80005 7.66004 4.80005 7.99991C4.80005 8.33977 5.08659 8.61529 5.44005 8.61529Z"
      fill="#6B7281"
      stroke="#6B7281"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5602 8.61529C10.9136 8.61529 11.2002 8.33977 11.2002 7.99991C11.2002 7.66004 10.9136 7.38452 10.5602 7.38452C10.2067 7.38452 9.92017 7.66004 9.92017 7.99991C9.92017 8.33977 10.2067 8.61529 10.5602 8.61529Z"
      fill="#6B7281"
      stroke="#6B7281"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.44005 13.5384C5.79351 13.5384 6.08005 13.2629 6.08005 12.923C6.08005 12.5831 5.79351 12.3076 5.44005 12.3076C5.08659 12.3076 4.80005 12.5831 4.80005 12.923C4.80005 13.2629 5.08659 13.5384 5.44005 13.5384Z"
      fill="#6B7281"
      stroke="#6B7281"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5602 13.5384C10.9136 13.5384 11.2002 13.2629 11.2002 12.923C11.2002 12.5831 10.9136 12.3076 10.5602 12.3076C10.2067 12.3076 9.92017 12.5831 9.92017 12.923C9.92017 13.2629 10.2067 13.5384 10.5602 13.5384Z"
      fill="#6B7281"
      stroke="#6B7281"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IFilledSVG = (
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
);

export const IOutlineSVG: React.FC<ISVGProps> = ({ color, height, width }) => (
  <svg
    className="relative z-10"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99992 13.6666C11.1295 13.6666 13.6666 11.1296 13.6666 7.99998C13.6666 4.87037 11.1295 2.33331 7.99992 2.33331C4.8703 2.33331 2.33325 4.87037 2.33325 7.99998C2.33325 11.1296 4.8703 13.6666 7.99992 13.6666ZM7.99992 14.6666C11.6818 14.6666 14.6666 11.6819 14.6666 7.99998C14.6666 4.31808 11.6818 1.33331 7.99992 1.33331C4.31802 1.33331 1.33325 4.31808 1.33325 7.99998C1.33325 11.6819 4.31802 14.6666 7.99992 14.6666Z"
      fill={color}
      shapeRendering="geometricPrecision"
    />
    <path
      d="M8.66659 5.33329C8.66659 5.70148 8.36811 5.99996 7.99992 5.99996C7.63173 5.99996 7.33325 5.70148 7.33325 5.33329C7.33325 4.9651 7.63173 4.66663 7.99992 4.66663C8.36811 4.66663 8.66659 4.9651 8.66659 5.33329Z"
      fill={color}
      shapeRendering="geometricPrecision"
    />
    <path
      d="M7.33325 7.99998C7.33325 7.72384 7.63173 7.33331 7.99992 7.33331C8.36811 7.33331 8.66659 7.72384 8.66659 7.99998V10.6666C8.66659 10.9428 8.36811 11.3333 7.99992 11.3333C7.63173 11.3333 7.33325 10.9428 7.33325 10.6666V7.99998Z"
      fill={color}
      shapeRendering="geometricPrecision"
    />
  </svg>
);
