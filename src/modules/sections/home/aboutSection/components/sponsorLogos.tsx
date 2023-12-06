import { HOME_ABOUT_TEXT } from '@/lang/en';
import Image from 'next/image';

const SponsorLogos: React.FC = () => {
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

  return (
    <div className="mb-16 min-w-full md:mb-24 lg:mb-28">
      <p className="mb-6 text-center font-display text-large-caption-mobile uppercase text-gray-1 md:mb-8 lg:mb-10 lg:text-large-caption-desktop">
        {HOME_ABOUT_TEXT.SPONSOR_HEADER}
      </p>
      <div className="mx-auto flex w-full max-w-[870px] flex-row flex-wrap items-center justify-evenly justify-items-start gap-x-2 gap-y-6 px-4 md:max-w-[none] md:gap-x-8 md:gap-y-8 lg:max-w-[none] lg:gap-y-10">
        {sponsorLogos.map((logo, i) => (
          <div
            key={i}
            className="flex h-10 max-w-[130px] flex-initial items-center overflow-hidden lg:h-16 lg:max-w-[208px]"
          >
            <Image
              key={i}
              src={logo.src}
              alt={logo.alt}
              className={`${logo.classes} max-w-[100%]`}
              width={416}
              height={128}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorLogos;
