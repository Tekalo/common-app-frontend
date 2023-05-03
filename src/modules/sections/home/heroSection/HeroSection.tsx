import Button, { ButtonVariant } from '@/components/buttons/Button/Button';

export interface IHeroSection {}

// TODO: Replace images with next/image --> figure out cloudflare + next/image

const HeroSection: React.FC<IHeroSection> = () => {
  return (
    <div className="bg-light-blue px-6 pb-10 pt-6 md:pb-20 md:pl-8 md:pr-0 md:pt-16">
      <div className="mx-auto max-w-content-area md:grid md:grid-cols-12 md:items-center">
        {/* CONTENT */}
        <div className="col-span-7">
          <div className="max-w-2xl mx-auto md:mx-0">
            <img
              src="/images/hero_sm.png"
              alt="Mobile Hero Image"
              className="m-auto mb-6 w-auto max-w-[277px] md:hidden"
            />
            <div className="mb-6 text-center font-display text-h2-mobile text-black-text sm:text-h1-mobile md:mb-4 md:text-left md:text-h1-mobile lg:pb-12 lg:text-h1-desktop">
              Match to what matters; build a better world.
            </div>
            {/* TODO: Wiaiting for final images, so this will change */}
            <div className="mb-6 text-center text-p1-mobile md:mb-8 md:text-left lg:mb-10 lg:pr-12 lg:text-p1-desktop">
              A platform that matches tech talent looking to solve some of the
              world&apos;s biggest, most pressing problems to impact-driven
              organizations.
            </div>
            <div className="mb-6 text-center">Powered by Futures Engine</div>
            {/* CTA Buttons */}
            <div className="flex justify-center gap-x-1 sm:gap-x-4 md:justify-start md:gap-x-6">
              <Button
                variant={ButtonVariant.OUTLINED}
                label="For organizations"
                className="flex-none flex-nowrap p-1 sm:p-3 md:px-5 md:py-3 lg:px-8"
                onClick={() => void {}}
              />
              <Button
                label="For candidates"
                className="flex-none flex-nowrap p-2 sm:px-4 sm:py-3 md:px-7 md:py-3 lg:px-8"
                onClick={() => void {}}
              />
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="col-start-8 col-end-13 flex items-center justify-end">
          {/* TODO: Wiaiting for final images, so this will change */}
          <img
            src="/images/hero_sm.png"
            alt="Hero Image"
            className="hidden h-auto md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
