import Button, { ButtonVariant } from '@/components/buttons/Button/Button';

export interface IOrganizationSection {}

// TODO: Replace images with next/image --> figure out cloudflare + next/image

const OrganizationSection: React.FC<IOrganizationSection> = () => {
  const recruitingLogos = [
    {
      src: '/images/logos/FreeWorldLogo.png',
      alt: 'Free World Logo',
    },
    {
      src: '/images/logos/RebootLogo.png',
      alt: 'Reboot RX Logo',
    },
    {
      src: '/images/logos/TMLogo.png',
      alt: 'Tech Matters Logo',
    },
    {
      src: '/images/logos/RecidLogo.png',
      alt: 'Recidiviz Logo',
    },
    {
      src: '/images/logos/PlaceHolderLogo.png',
      alt: 'Placeholder',
    },
    {
      src: '/images/logos/PlaceHolderLogo.png',
      alt: 'Placeholder',
    },
    {
      src: '/images/logos/PlaceHolderLogo.png',
      alt: 'Placeholder',
    },
  ];

  return (
    <section className="grid w-full place-items-center px-6 py-14">
      <div className="">
        {/* Title */}
        <div className="mb-6 text-center text-large-caption-mobile uppercase text-gray-1 lg:mb-14 lg:text-large-caption-desktop">
          Organizations that recruit though [name]
        </div>
        {/* Logo Grid */}
        <div className="flex w-full max-w-[870px] flex-row flex-wrap items-center justify-evenly justify-items-start gap-x-4 gap-y-6 px-4 md:gap-y-8 lg:gap-y-10">
          {recruitingLogos.map((logo, i) => {
            return (
              <div
                key={i}
                className="flex h-10 max-w-[110px] items-center overflow-hidden sm:max-w-[130px] md:max-w-[155px] md:p-3"
              >
                <img src={logo.src} alt={logo.alt} className="min-w-0" />
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center text-component-extra-large text-blue-1 transition-all lg:mt-8">
          <a href="#">See more</a>
        </div>
      </div>
      {/* CTA Box*/}
      <div className="relative mt-20 max-w-[475px] lg:mt-28 lg:max-w-[608px]">
        {/* Offset Blackbox */}
        <div className="absolute -bottom-1 -right-2 left-0 top-2 rounded-2xl bg-[#363D3F]" />
        <div className="relative z-10 rounded-[10px] bg-light-orange ring-4 ring-illustration-black">
          {/* Content */}
          <div className="flex flex-col items-center px-8 py-6 text-center md:px-11 md:py-10 lg:px-16 lg:py-14">
            {/* Title */}
            <div className="text-displaytext-center px-2 text-h4-mobile text-black-text lg:text-h4-desktop">
              <p>Hire candidates that are aligned with your mission.</p>
            </div>
            <div className="pt-4 text-center font-sans text-p2-mobile  text-black-text lg:px-16 lg:text-p1-mobile">
              Candidates on [Name TBD] are carefully vetted and screened before
              you decide to interview
            </div>
            {/* Button */}
            <Button
              variant={ButtonVariant.OUTLINED}
              label="Apply as an organization"
              className="mt-6 w-full max-w-[228px]"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationSection;
