import Button, { ButtonVariant } from '@/components/buttons/Button/Button';

export interface IHeroSection {}

// TODO: Replace images with next/image --> figure out cloudflare + next/image

const HeroSection: React.FC<IHeroSection> = () => {
  return (
    <div className="bg-light-blue px-6 pb-10 pt-6 md:px-24 md:pb-20 md:pt-16 lg:pt-24">
      <div className="mx-auto max-w-content-area lg:grid lg:grid-cols-12">
        {/* CONTENT */}
        <div className="col-span-8">
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
              className="mb-4 hidden md:block lg:hidden"
            />
            {/* Desktop Hero */}
            <div className="mb-6 text-center font-display text-h2-mobile text-black-text sm:text-h1-mobile md:mb-4 md:text-left md:text-h1-mobile lg:text-h1-desktop">
              Match to what matters; build a better world.
            </div>
            <div className="mb-6 text-center text-p1-mobile md:mb-8 md:text-left lg:mb-8 lg:text-p1-desktop">
              An initiative that matches tech talent with impact-driven
              organizations.
            </div>
            <div className="mb-6 text-center md:hidden">
              Powered by Futures Engine
            </div>
            {/* CTA Buttons */}
            <div className="flex justify-center gap-x-1 sm:gap-x-4 md:justify-start md:gap-x-6">
              <Button
                variant={ButtonVariant.OUTLINED}
                label="For organizations"
                className="flex-none flex-nowrap p-1 sm:p-3 md:flex-auto lg:flex-none lg:px-7"
                onClick={() => void {}}
              />
              <Button
                label="For candidates"
                className="flex-none flex-nowrap p-2 sm:px-4 sm:py-3 md:flex-auto md:px-7 md:py-3 lg:flex-none lg:px-10"
                onClick={() => void {}}
              />
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="col-start-9 col-end-13 flex items-center justify-end">
          {/* TODO: Wiaiting for final images, so this will change */}
          <img
            src="/images/hero_lg.png"
            alt="Tablet Hero Image"
            className="hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
