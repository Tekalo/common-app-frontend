import { HOME_ABOUT_TEXT } from '@/lang/en';
import { CircledCheckSvg } from '@/lib/constants/svgs';
import { ReactNode } from 'react';

interface IBenefitsItem {
  text: string;
}

interface IBenefitsItemColWrapper {
  children: ReactNode;
}

const BenefitsItem: React.FC<IBenefitsItem> = ({ text }) => (
  <div className="flex items-center">
    <div className="flex-none">
      <CircledCheckSvg />
    </div>
    <div className="ml-3 flex-initial text-illustration text-illustration-black">
      {text}
    </div>
  </div>
);

const BenefitsItemColWrapper: React.FC<IBenefitsItemColWrapper> = ({
  children,
}) => <div className="flex flex-col space-y-3 md:space-y-3">{children}</div>;

const BenefitsList: React.FC = () => (
  <div className="relative mx-auto mb-16 max-w-[312px] md:mb-16 md:max-w-[445px] lg:mb-0 lg:ml-14 lg:mt-6 lg:w-full lg:self-start">
    {/* Main content bg */}
    <div className="absolute bottom-0 left-0 right-1 top-0 z-[2] rounded border border-black-text bg-light-blue"></div>
    {/* Drop-shadow box */}
    <div className="absolute -bottom-1 left-1 right-0 top-1 z-[1] rounded border border-black-text bg-illustration-blue-green"></div>

    <div className="relative z-30 flex flex-col space-y-3 px-6 py-5 md:flex-row md:flex-wrap md:justify-between md:space-y-0 lg:gap-x-6 lg:p-7">
      <BenefitsItemColWrapper>
        <BenefitsItem text={HOME_ABOUT_TEXT.BENEFITS.B1} />
        <BenefitsItem text={HOME_ABOUT_TEXT.BENEFITS.B2} />
      </BenefitsItemColWrapper>
      <BenefitsItemColWrapper>
        <BenefitsItem text={HOME_ABOUT_TEXT.BENEFITS.B3} />
        <BenefitsItem text={HOME_ABOUT_TEXT.BENEFITS.B4} />
      </BenefitsItemColWrapper>
    </div>
  </div>
);

export default BenefitsList;
