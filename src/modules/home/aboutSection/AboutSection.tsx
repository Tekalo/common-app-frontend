export interface IAboutSection {}

const AboutSection: React.FC<IAboutSection> = () => {
  return (
    <div className="flex flex-col items-center pt-28">
      {/* Coalition Logos */}
      <div className="min-w-full px-40 pt-10">
        <p className="text-center font-display text-desktop-lg-caption uppercase text-[#5D5E6F]">
          The common app is supported by
        </p>
        <div className="flex flex-row items-center justify-around pt-10">
          <img
            src="/images/logos/SchmidtFuturesLogo.png"
            alt="Schmidt Futures Logo"
            className="h-4 object-cover"
          />
          <img
            src="/images/logos/USDigitalResponseLogo.png"
            alt="US Digital Response Logo"
            className="h-12 object-cover"
          />
          <img
            src="/images/logos/AllTechIsHumanLogo.png"
            alt="All Tech Is Human Logo"
            className="h-24 object-cover"
          />
          <img
            src="/images/logos/FastForwardLogo.png"
            alt="Fast Forward Logo"
            className="h-16 object-cover"
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex  flex-col items-center pt-28">
        <h2 className="min-w-full px-64 text-center font-display text-desktop-h2 text-black-text">
          [Name TBD] works for tech talent and impactful organizations
        </h2>
        <p className="min-w-full px-96 pt-10 text-center font-sans text-desktop-h4 font-normal text-black-text">
          Now more than ever, there are a multitude of opportunities outside of
          traditional tech roles, creating a pressing need for technologists who
          want to solve some of the world’s hardest and most urgent problems
          lorem ipsum
        </p>
      </div>
      {/* Benefits Image */}
      <div className="flex justify-center px-64 pt-8">
        <img
          src="/images/BenefitHero.png"
          alt="Benefits Image"
          className="object-cover"
        />
      </div>
      {/* Roles */}
      <div className="pt-32">
        <h3 className="text-center font-display text-desktop-h3 text-black-text">
          Roles being recruited through the [Name TBD]
        </h3>
        <div className="grid grid-flow-col grid-rows-2 gap-4 py-12 px-36 tablet:px-52 desktop:px-96">
          <img
            src="/images/roles/SWERole.png"
            alt="Software Engineer Role"
            className="object-cover"
          />
          <img src="/images/roles/UXRole.png" alt="" className="object-cover" />
          <img src="/images/roles/PMRole.png" alt="" className="object-cover" />
          <img src="/images/roles/DSRole.png" alt="" className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
