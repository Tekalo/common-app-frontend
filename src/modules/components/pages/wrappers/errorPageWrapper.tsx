import Button, { ButtonVariant } from '@/components//buttons/Button/Button';
import { BASE_LINK } from '@/lang/en/en';
import router from 'next/router';

interface IErrorPageWrapper {
  headline: string;
  bodyText: string;
}

const ErrorPageWrapper: React.FC<IErrorPageWrapper> = ({
  headline,
  bodyText,
}) => {
  return (
    <div className="m-auto max-w-[390px] px-6 pb-32 pt-20 text-center md:max-w-[224px] md:px-0 md:pt-24 lg:max-w-[544px]">
      <h2 className="mb-6 font-display text-h2-mobile">{headline}</h2>
      <div className="text-p1-mobile">{bodyText}</div>
      <Button
        className="m-auto mt-8 w-full px-7 lg:w-auto"
        variant={ButtonVariant.OUTLINED}
        label="Back to home"
        onClick={() => router.push(BASE_LINK)}
      />
    </div>
  );
};

export default ErrorPageWrapper;
