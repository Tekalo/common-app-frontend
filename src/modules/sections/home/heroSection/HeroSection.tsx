import Button, { ButtonVariant } from '@/components/buttons/Button/Button';

export interface IHeroSection {}

// TODO: Replace images with next/image --> figure out cloudflare + next/image

const HeroSection: React.FC<IHeroSection> = () => {
  return (
    <div className="bg-light-blue px-6 pb-8 pt-4 md:pb-20 md:pl-8 md:pr-0 md:pt-16">
      <div className="mx-auto max-w-content-area md:grid md:grid-cols-12 md:items-center">
        {/* CONTENT */}
        <div className="col-span-7">
          <div className="max-w-2xl mx-auto md:mx-0">
            <div className="mb-6 text-center text-h2-mobile text-black-text md:mb-4 md:text-left md:text-h1-mobile lg:pb-12 lg:text-h1-desktop">
              Where technical talent and impact connect.
            </div>
            {/* TODO: Wiaiting for final images, so this will change */}
            <img
              src="/images/HeroImage.png"
              alt="Mobile Hero Image"
              className="mb-11 md:hidden"
            />
            <div className="mb-4 text-center text-p2-desktop md:mb-8 md:text-left lg:mb-10 lg:pr-12 lg:text-p1-desktop">
              A platform for matchmaking between technical talent and
              mission-driven organizations.
            </div>
            {/* CTA Buttons */}
            <div className="flex justify-center gap-x-1 sm:gap-x-4 md:justify-start md:gap-x-6">
              <Button
                label="For candidates"
                className="flex-none flex-nowrap p-2 sm:px-4 sm:py-3 md:px-7 md:py-3 lg:px-8"
                onClick={() => {}}
              />
              <Button
                variant={ButtonVariant.OUTLINED}
                label="For organizations"
                className="flex-none flex-nowrap p-1 sm:p-3 md:px-5 md:py-3 lg:px-8"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="col-start-8 col-end-13 flex items-center justify-end">
          {/* TODO: Wiaiting for final images, so this will change */}
          <img
            src="/images/HeroImage.png"
            alt="Hero Image"
            className="hidden h-auto md:block"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
