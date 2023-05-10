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

const roles = [
  {
    src: '/images/roles/SWERole.png',
    alt: 'Software Engineer Role',
    text: 'Software Engineers',
  },
  {
    src: '/images/roles/PMRole.png',
    alt: 'Product Manager Role',
    text: 'Product Managers',
  },
  {
    src: '/images/roles/UXRole.png',
    alt: 'UX/UI Designer Role',
    text: 'UX/UI Designers',
  },
  {
    src: '/images/roles/DSRole.png',
    alt: 'Data Analysts Role',
    text: 'Data Analysts',
  },
];

// TODO: Replace images with next/image --> figure out cloudflare + next/image
const AboutSection: React.FC<IAboutSection> = () => {
  return (
    <div className="flex flex-col items-center px-6 pb-12 pt-20 md:pb-20 md:pt-16 lg:pb-28 lg:pt-28">
      <div className="w-full max-w-content-area">
        {/* Coalition Logos */}
        <div className="mb-16 min-w-full md:mb-24 lg:mb-28">
          <p className="mb-6 text-center font-display text-large-caption-mobile uppercase text-gray-1 md:mb-8 lg:mb-10 lg:text-large-caption-desktop">
            TEKALO is supported by
          </p>
          <div className="mx-auto flex w-full max-w-[870px] flex-row flex-wrap items-center justify-evenly justify-items-start gap-x-2 gap-y-6 px-4 md:max-w-[none] md:gap-x-8 md:gap-y-8 lg:max-w-[none] lg:gap-y-10">
            {sponsorLogos.map((logo, i) => (
              <div
                key={i}
                className="flex h-10 max-w-[130px] flex-initial items-center overflow-hidden lg:h-16 lg:max-w-[208px]"
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
          <h2 className="mb-6 max-w-[590px] text-center font-display text-h3-mobile text-black-text md:text-h2-mobile lg:mb-10 lg:max-w-[924px] lg:p-0 lg:text-h2-desktop">
            Tekalo aims to bridge the gap between tech talent and impact-driven
            opportunities.
          </h2>
          <p className="mb-14 max-w-[590px] text-center font-sans text-p2-desktop font-normal text-black-text md:text-p1-mobile lg:mb-8 lg:max-w-[735px] lg:text-p1-desktop">
            Now more than ever, impact-driven organizations need tech talent
            that is passionate about solving some of the world’s most pressing
            problems.
          </p>
        </div>
        {/* Pronunciation */}
        <div className="m-auto mb-16 max-w-[470px] rounded-lg border border-black-text bg-light-orange p-5 lg:mb-20 lg:max-w-[544px]">
          <div className="space-y-3 text-p2-mobile md:space-y-6 lg:text-p2-desktop">
            <div>
              <span className="font-display font-semibold">TE</span>•ka•lo
              <br />
              Tech + Kalo (‘good’ in Greek)
            </div>
            <div>
              Tekalo refers to using technology to build a better world.
            </div>
          </div>
        </div>
        {/* Goals */}
        <div className="mb-8">
          <div className="text-center font-display text-h3-mobile">
            Through Tekalo we want to:
          </div>
          <div className="m-auto mt-6 max-w-[590px] pl-7 text-p1-mobile">
            <ol className="list-decimal">
              <li>
                Empower tech talent to follow non-traditional paths, and work on
                causes that they care about (full-time or part-time)
              </li>
              <li>Simplify the application process with a single form</li>
              <li>
                Provide impact-driven organizations a list of top candidate
                matches
              </li>
            </ol>
          </div>
        </div>
        {/* Benefits Image */}
        <div className="mb-16 md:mb-16 lg:mb-28">
          {/* Mobile Benefit Hero */}
          <img
            src="/images/BenefitHero_sm.png"
            alt="Benefits Image"
            className="relative -left-[3px] m-auto w-[101%] max-w-[315px] md:hidden"
          />
          {/* Tablet Benefit Hero */}
          <img
            src="/images/BenefitHero_lg.png"
            alt="Benefits Image"
            className="m-auto hidden max-w-[610px] md:block lg:mb-24 lg:max-w-[928px]"
          />
        </div>
        {/* Roles */}
        <div className="">
          <h3 className="mb-6 text-center font-display text-h3-mobile text-black-text md:mb-10 md:text-h4-mobile lg:mb-14 lg:text-h4-desktop">
            Full-time and part-time roles listed on Tekalo
          </h3>
          <div className="mx-auto flex max-w-[280px] flex-wrap justify-start gap-y-9 md:max-w-[688px] md:justify-center md:gap-x-12">
            {roles.map((role, i) => (
              <div key={i} className="flex items-center gap-x-4 md:w-[316px]">
                <img
                  src={role.src}
                  alt={role.alt}
                  className={`max-w-[54px] md:max-w-[65px] md:flex-initial`}
                />
                <span className="font-display text-h4-mobile md:text-h4-desktop">
                  {role.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
