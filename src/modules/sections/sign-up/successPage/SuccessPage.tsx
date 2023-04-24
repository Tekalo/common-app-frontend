import Button from '@/components/buttons/Button/Button';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export interface ISuccessPage {
  title: string;
  body: string;
  buttonText: string;
  buttonHandler: () => void;
}

const SuccessPage: React.FC<ISuccessPage> = ({
  title,
  body,
  buttonText,
  buttonHandler,
}) => {
  return (
    <div className="mx-auto mb-48 mt-16 flex flex-col justify-center space-y-8  align-middle ">
      {/* Title */}
      <div className="mx-auto flex px-2 text-center text-h3-desktop md:max-w-[584px]">
        {title}
      </div>
      {/* Icons */}
      <div className="relative mx-auto flex items-center justify-center">
        <CheckCircleIcon className="block h-[66.67px] w-[66.67px] fill-blue-1" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="absolute mx-auto"
        >
          <circle
            className="fill-blue-transparent"
            cx="50%"
            cy="50%"
            r="35"
            stroke-width="20"
          />
        </svg>
      </div>
      {/* Body */}
      <div className="mx-auto flex max-w-[50%] text-center text-p2-desktop text-black-text">
        {body}
      </div>
      {/* Button */}
      <Button label={buttonText} className="mx-auto" onClick={buttonHandler} />
    </div>
  );
};

export default SuccessPage;
