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
    <div className="mx-auto px-6 pb-28 pt-10 lg:pb-48 lg:pt-16">
      {/* Title */}
      <div className="mx-auto mb-8 px-2 text-center text-h3-mobile md:max-w-[584px] lg:text-h3-desktop">
        {title}
      </div>
      <div className="space-y-10">
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
        <div className="mx-auto flex w-full max-w-[544px] text-center text-p2-mobile text-black-text lg:text-p2-desktop">
          {body}
        </div>
        {/* Button */}
        <Button
          label={buttonText}
          className="mx-auto w-full md:max-w-[160px]"
          onClick={buttonHandler}
        />
      </div>
    </div>
  );
};

export default SuccessPage;
