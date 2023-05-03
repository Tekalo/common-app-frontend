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
    <div className="flex flex-col items-center px-6 pb-12 pt-20 md:pt-16">
      <div className="w-full max-w-content-area">
        {/* Coalition Logos */}
        <div className="mb-16 min-w-full lg:mb-28">
          <p className="mb-6 text-center font-display text-large-caption-mobile uppercase text-gray-1 md:text-large-caption-mobile lg:mb-10 lg:text-large-caption-desktop">
            TEKALO is supported by
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
            Tekalo aims to bridge the gap between tech talent and impactful
            opportunities.
          </h2>
          <p className="mb-14 text-center font-sans text-p2-desktop font-normal text-black-text md:px-16 md:text-p2-desktop lg:mb-8 lg:text-p1-desktop">
            Now more than ever, impact-driven organizations need tech talent
            that is passionate about solving some of the world’s hardest, most
            pressing problems.
          </p>
        </div>
        {/* Pronunciation */}
        <div className="mb-20 rounded-lg border-2 border-black-text bg-light-orange px-14 py-6 text-center">
          Pronounced <span className="font-bold">TE</span>•ka•lo
        </div>
        {/* Goals */}
        <div className="mb-8">
          <div className="text-center font-display text-h3-mobile">
            Through Tekalo we want to:
          </div>
          <div className="mt-6 pl-7 text-p1-mobile">
            <ol className="list-decimal">
              <li>
                Empower tech talent to follow non-traditional tech paths, and
                work on causes that they care about – at either full-time or
                part-time capacity – by surfacing opportunities currently not
                visible to them.
              </li>
              <li>
                Simplify the application process for candidates by creating a
                single application form.
              </li>
              <li>
                Streamline the review and hiring process for impact-driven
                organizations by providing them with a list of top candidate
                matches.
              </li>
            </ol>
          </div>
        </div>
        {/* Benefits Image */}
        <div className="mb-16 md:mb-24 lg:mb-28">
          <img
            src="/images/BenefitHero_sm.png"
            alt="Benefits Image"
            className="relative -left-[3px] m-auto w-[101%] max-w-[315px]"
          />
        </div>
        {/* Roles */}
        <div className="">
          <h3 className="mb-6 text-center font-display text-h3-mobile text-black-text md:text-h3-mobile lg:mb-12 lg:text-h3-desktop">
            Roles being recruited through Tekalo
          </h3>
          <div className="mx-auto flex flex-wrap justify-center md:max-w-[1000px] md:gap-x-4 lg:gap-x-8 lg:px-4">
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
