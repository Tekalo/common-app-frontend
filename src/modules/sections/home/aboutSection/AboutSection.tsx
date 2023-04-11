export interface IAboutSection {}

const sponsorLogos = [
  {
    src: '/images/logos/SchmidtFuturesLogo.png',
    alt: 'Schmidt Futures Logo',
    classes: '',
  },
  {
    src: '/images/logos/USDigitalResponseLogo.png',
    alt: 'US Digital Response Logo',
    classes: '',
  },
  {
    src: '/images/logos/AllTechIsHumanLogo.png',
    alt: 'All Tech Is Human Logo',
    classes: '',
  },
  {
    src: '/images/logos/FastForwardLogo.png',
    alt: 'Fast Forward Logo',
    classes: '',
  },
];

const roleImages = [
  {
    src: '/images/roles/SWERole.png',
    alt: 'Software Engineer Role',
    classes: '',
  },
  {
    src: '/images/roles/PMRole.png',
    alt: 'Product Manager Role',
    classes: '',
  },
  {
    src: '/images/roles/UXRole.png',
    alt: 'UX/UI Designer Role',
    classes: '',
  },
  {
    src: '/images/roles/DSRole.png',
    alt: 'Data Scientist Role',
    classes: '',
  },
];

// TODO: Replace images with next/image --> figure out cloudflare + next/image
const AboutSection: React.FC<IAboutSection> = () => {
  return (
    <div className="flex flex-col items-center px-6 py-14 md:pt-16">
      <div className="w-full max-w-content-area">
        {/* Coalition Logos */}
        <div className="mb-20 min-w-full lg:mb-28">
          <p className="mb-6 text-center font-display text-large-caption-desktop uppercase text-gray-1 md:text-large-caption-mobile lg:mb-10 lg:text-large-caption-desktop">
            [APP NAME] is supported by
          </p>
          <div className="mx-auto flex w-full max-w-[870px] flex-row flex-wrap items-center justify-evenly justify-items-start gap-x-9 gap-y-6 px-4 md:max-w-[none] md:gap-y-8 lg:max-w-[none] lg:gap-y-10">
            {sponsorLogos.map((logo, i) => (
              <div
                key={i}
                className="flex h-10 w-[43%] max-w-[110px] flex-initial items-center overflow-hidden sm:max-w-[130px] md:w-[20%] md:max-w-[155px] md:p-3"
              >
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.classes}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 text-center font-display text-h3-mobile text-black-text md:px-32 lg:mb-10 lg:p-0 lg:text-h2-desktop">
            [Name TBD] works for tech talent and impactful organizations
          </h2>
          <p className="mb-4 text-center font-sans text-p2-desktop font-normal text-black-text md:px-16 md:text-p2-desktop lg:mb-8 lg:text-p1-desktop">
            Now more than ever, there are a multitude of opportunities outside
            of traditional tech roles, creating a pressing need for
            technologists who want to solve some of the world’s hardest and most
            urgent problems lorem ipsum
          </p>
        </div>
        {/* Benefits Image */}
        <div className="mb-20 flex justify-center md:mb-24 lg:mb-28">
          <img
            src="/images/BenefitHero.png"
            alt="Benefits Image"
            className="relative right-3 w-[115%] max-w-[none] md:max-w-[100%]"
          />
        </div>
        {/* Roles */}
        <div className="">
          <h3 className="text-center font-display text-h3-mobile text-black-text md:text-h3-mobile lg:mb-12 lg:text-h3-desktop">
            Roles being recruited through the [Name TBD]
          </h3>
          <div className="mx-auto flex flex-wrap justify-center gap-y-3 md:max-w-[1000px] md:gap-x-4 lg:gap-x-8 lg:px-4">
            {roleImages.map((role, i) => (
              <img
                key={i}
                src={role.src}
                alt={role.alt}
                className={`max-w-[312px] md:w-[48%] md:max-w-[348px] md:flex-initial lg:max-w-[351px] ${role.classes}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
