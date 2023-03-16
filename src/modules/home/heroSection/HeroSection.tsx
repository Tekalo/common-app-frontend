import Button from '@/components/buttons/Button/Button';

export interface IHeroSection {}

const HeroSection: React.FC<IHeroSection> = () => {
  return (
    <div className="relative top-20 bg-light-blue-bg">
      <div className="mx-auto max-w-[1440px] tablet:grid tablet:grid-cols-12">
        {/* CONTENT */}
        <div className="col-span-6 pt-24 pl-40">
          <div className="mx-auto max-w-2xl tablet:mx-0">
            <div className="w-[640px] text-desktop-h1 text-black-text">
              Where technical talent and impact connect.
            </div>
            <div className="w-[525px] pt-8 font-sans text-desktop-h4 font-normal">
              A platform for matchmaking between technical talent and
              mission-driven organizations.
            </div>
            {/* CTA Buttons */}
            <div className="flex items-start gap-x-6 pt-10">
              <Button
                label="For candidates"
                className="px-8 py-3"
                onClick={() => {}}
              />
              <Button
                outlined
                label="For organizations"
                className="px-8 py-3"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        {/* IMAGE */}
        <div className="relative col-start-7 col-end-13">
          <img src="/images/HeroImage.png" alt="Hero Image" className="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
