import { HOME_ABOUT_TEXT } from '@/lang/en';
import Image from 'next/image';

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

const AboutSection: React.FC<IAboutSection> = () => {
  return (
    <div className="flex flex-col items-center px-6 pb-12 pt-20 md:pb-20 md:pt-16 lg:pb-28 lg:pt-28">
      <div className="w-full max-w-content-area">
        {/* Coalition Logos */}
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
        {/* Content */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 max-w-[590px] text-center font-display text-h3-mobile text-black-text md:text-h2-mobile lg:mb-10 lg:max-w-[924px] lg:p-0 lg:text-h2-desktop">
            {HOME_ABOUT_TEXT.HEADER}
          </h2>
          <p className="mb-14 max-w-[590px] text-center font-sans text-p2-desktop font-normal text-black-text md:text-p1-mobile lg:mb-8 lg:max-w-[735px] lg:text-p1-desktop">
            {HOME_ABOUT_TEXT.BODY}
          </p>
        </div>
        {/* Pronunciation */}
        <div className="m-auto mb-16 max-w-[470px] rounded-lg border border-black-text bg-light-orange p-5 lg:mb-20 lg:max-w-[544px]">
          <div className="space-y-3 text-p2-mobile md:space-y-6 lg:text-p2-desktop">
            <div>
              <span className="font-display font-semibold">
                {HOME_ABOUT_TEXT.PRONUNCIATION_TE}
              </span>
              {HOME_ABOUT_TEXT.PRONUNCIATION_KALO}
              <br />
              {HOME_ABOUT_TEXT.PRONUNCIATION_DEFINITION}
            </div>
            <div>{HOME_ABOUT_TEXT.PRONUNCIATION_GOAL}</div>
          </div>
        </div>
        {/* Goals */}
        <div className="mb-8">
          <h3 className="text-center font-display text-h3-mobile">
            {HOME_ABOUT_TEXT.GOAL_HEADER}
          </h3>
          <div className="m-auto mt-6 max-w-[590px] pl-7 text-p1-mobile">
            <ol className="list-decimal">
              <li>{HOME_ABOUT_TEXT.GOAL_1}</li>
              <li> {HOME_ABOUT_TEXT.GOAL_2}</li>
              <li>{HOME_ABOUT_TEXT.GOAL_3}</li>
            </ol>
          </div>
        </div>
        {/* Benefits Image */}
        <div className="mb-16 md:mb-16 lg:mb-28">
          {/* Benefit Hero */}
          <Image
            src="/images/BenefitHero.png"
            alt="Benefits Image: One application, Vetting & screening, Assigned talent connector, Curated matches"
            className="relative -left-[3px] m-auto w-full max-w-[315px] md:block md:max-w-[610px] lg:mb-24 lg:max-w-[928px]"
            width={1856}
            height={930}
          />
        </div>
        {/* Roles */}
        <div className="">
          <h4 className="mb-6 text-center font-display text-h3-mobile text-black-text md:mb-10 md:text-h4-mobile lg:mb-14 lg:text-h4-desktop">
            {HOME_ABOUT_TEXT.ROLE_HEADER}
          </h4>
          <div className="mx-auto flex max-w-[280px] flex-wrap justify-start gap-y-9 md:max-w-[688px] md:justify-center md:gap-x-12">
            {roles.map((role, i) => (
              <div key={i} className="flex items-center gap-x-4 md:w-[316px]">
                <Image
                  src={role.src}
                  alt={role.alt}
                  className={`max-w-[54px] md:max-w-[65px] md:flex-initial`}
                  width={130}
                  height={130}
                />
                <h4 className="font-display text-h4-mobile md:text-h4-desktop">
                  {role.text}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
