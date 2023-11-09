import { HOME_ABOUT_TEXT } from '@/lang/en';

const AboutContent: React.FC = () => (
  <div className="mx-auto mb-6 flex max-w-[590px] flex-col items-center lg:mb-8 lg:max-w-[541px]">
    <h2 className="mb-4 text-center font-display text-h3-mobile text-black-text md:text-h3-desktop lg:mb-4 lg:p-0 lg:text-left">
      {HOME_ABOUT_TEXT.HEADER}
    </h2>
    <p className="text-center font-sans text-p1-mobile font-normal text-black-text md:text-p2-mobile lg:text-left lg:text-p2-desktop">
      {HOME_ABOUT_TEXT.BODY}
    </p>
  </div>
);

export default AboutContent;
