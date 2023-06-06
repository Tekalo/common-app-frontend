import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import {
  APPLICANT_SIGNUP_LINK,
  HOME_HERO_TEXT,
  ORG_SIGNUP_LINK,
} from '@/lang/en';

export interface IHeroSection {}

// TODO: Replace images with next/image --> figure out cloudflare + next/image

const HeroSection: React.FC<IHeroSection> = () => {
  return (
    <div className="bg-light-blue px-6 pb-10 pt-6 md:px-24 md:pb-20 md:pt-16 lg:pt-24">
      <div className="lg:grid-cols-13 mx-auto max-w-content-area lg:grid">
        {/* CONTENT */}
        <div className="col-span-8 lg:col-span-7">
          <div className="max-w-2xl mx-auto md:mx-0">
            {/* Mobile Hero */}
            <img
              src="/images/hero_sm.png"
              alt="Mobile Hero Image"
              className="m-auto mb-6 w-auto max-w-[277px] md:hidden"
            />
            {/* Tablet Hero */}
            <img
              src="/images/hero_md.png"
              alt="Tablet Hero Image"
              className="mb-4 hidden max-w-[528px] md:block lg:hidden"
            />
            {/* Desktop Hero */}
            <h1 className="mb-6 text-center font-display text-h2-mobile text-black-text sm:text-h1-mobile md:mb-4 md:text-left md:text-h1-mobile lg:text-h1-desktop">
              {HOME_HERO_TEXT.HEADER}
            </h1>
            <div className="mb-6 text-center text-p1-mobile md:mb-8 md:text-left lg:mb-8 lg:text-p1-desktop">
              {HOME_HERO_TEXT.BODY}
            </div>
            {/* CTA Buttons */}
            <div className="flex justify-center gap-x-1 sm:gap-x-4 md:justify-start md:gap-x-6">
              <Button
                href={APPLICANT_SIGNUP_LINK}
                label={HOME_HERO_TEXT.APPLICANT_CTA}
                className="flex-none flex-nowrap p-2 sm:px-4 sm:py-3 md:flex-auto md:px-7 md:py-3 lg:flex-none lg:px-10"
              />
              <Button
                href={ORG_SIGNUP_LINK}
                variant={ButtonVariant.OUTLINED}
                label={HOME_HERO_TEXT.ORG_CTA}
                className="flex-none flex-nowrap p-1 sm:p-3 md:flex-auto lg:flex-none lg:px-7"
              />
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="col-start-8 col-end-13 items-center justify-end">
          <img
            src="/images/hero_lg.png"
            alt="Tablet Hero Image"
            className="hidden max-w-[391px] lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
