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

export const GreenCircleCheck = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1390_2857)">
      <rect width="24" height="24" fill="white" />
      <circle
        cx="12"
        cy="12"
        r="11.25"
        fill="#00A870"
        fillOpacity="0.08"
        stroke="#00A870"
        strokeWidth="1.5"
      />
      <path
        d="M7 12.2778L11.2222 16.5L17.5556 7"
        stroke="#00A870"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1390_2857">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
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
    className=""
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

export const EditSVG = (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.39808 0.812415C9.83742 0.373075 10.5497 0.373075 10.9891 0.812415L12.5801 2.4034C13.0194 2.84274 13.0194 3.55506 12.5801 3.9944L5.03196 11.5425C4.96095 11.6171 4.86861 11.6731 4.76129 11.6999L1.57931 12.4954C1.38762 12.5433 1.18485 12.4872 1.04514 12.3475C0.905422 12.2077 0.849256 12.005 0.897178 11.8133L1.69267 8.63131C1.71833 8.52868 1.77066 8.43975 1.84043 8.37007L7.79938 2.41112C7.80181 2.4086 7.80427 2.40609 7.80676 2.4036C7.80924 2.40112 7.81175 2.39866 7.81427 2.39623L9.39808 0.812415ZM8.20457 3.59692L3.03412 8.76737L4.62511 10.3584L9.79556 5.18791L8.20457 3.59692ZM10.5911 4.39241L9.00007 2.80142L10.1936 1.60791L11.7846 3.1989L10.5911 4.39241ZM2.54325 9.86749L3.52511 10.8493L2.21597 11.1766L2.54325 9.86749Z"
      fill="#317BB5"
    />
    <path
      d="M6.43735 11.5C6.12669 11.5 5.87485 11.7518 5.87485 12.0625C5.87485 12.3731 6.12669 12.625 6.43735 12.625H13.1874C13.498 12.625 13.7499 12.3731 13.7499 12.0625C13.7499 11.7518 13.498 11.5 13.1874 11.5H6.43735Z"
      fill="#317BB5"
    />
  </svg>
);

export const FileSvg: React.FC<ISVGProps> = ({ height, width, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`stroke-1 ${color}`}
    >
      <path
        d="M10.3212 7.84442V6.27885C10.3212 5.745 10.1091 5.23301 9.73159 4.85552C9.3541 4.47803 8.84212 4.26596 8.30827 4.26596H7.41365C7.2357 4.26596 7.06504 4.19527 6.93921 4.06944C6.81338 3.94361 6.74269 3.77295 6.74269 3.595V2.70038C6.74269 2.16653 6.53062 1.65455 6.15313 1.27706C5.77564 0.899571 5.26366 0.6875 4.72981 0.6875H3.61154M4.95346 0.6875H2.04596C1.67559 0.6875 1.375 0.988091 1.375 1.35846V11.6465C1.375 12.0169 1.67559 12.3175 2.04596 12.3175H9.65019C10.0206 12.3175 10.3212 12.0169 10.3212 11.6465V6.05519C10.3212 4.63159 9.75563 3.2663 8.74899 2.25966C7.74235 1.25302 6.37706 0.6875 4.95346 0.6875Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CircledXSvg: React.FC<ISVGProps> = ({ height, width, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="#ffffff"
      className="stroke-2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.625 9.625L15.375 15.375M15.375 9.625L9.625 15.375M24 12.5C24 14.0102 23.7025 15.5056 23.1246 16.9009C22.5467 18.2961 21.6996 19.5639 20.6317 20.6317C19.5639 21.6996 18.2961 22.5467 16.9009 23.1246C15.5056 23.7025 14.0102 24 12.5 24C10.9898 24 9.49438 23.7025 8.09914 23.1246C6.7039 22.5467 5.43615 21.6996 4.36827 20.6317C3.3004 19.5639 2.45331 18.2961 1.87539 16.9009C1.29746 15.5056 1 14.0102 1 12.5C1 9.45001 2.2116 6.52494 4.36827 4.36827C6.52494 2.2116 9.45001 1 12.5 1C15.55 1 18.4751 2.2116 20.6317 4.36827C22.7884 6.52494 24 9.45001 24 12.5Z"
        shape-rendering="geometricPrecision"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
