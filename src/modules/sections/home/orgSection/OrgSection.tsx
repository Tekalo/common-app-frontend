import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import Modal from '@/components/modal/Modal/Modal/Modal';
import { HOME_ORG_TEXT, ORG_SIGNUP_LINK } from '@/lang/en';
import Link from 'next/link';

export interface IOrganizationSection {
  showLogoModal: boolean;
  setShowLogoModal: (showModal: boolean) => void;
}

const OrganizationSection: React.FC<IOrganizationSection> = ({
  showLogoModal,
  setShowLogoModal,
}) => {
  const recruitingLogos = [
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
    {
      src: '/images/logos/PlaceHolderLogo.png',
      alt: 'Placeholder',
    },
  ];

  const renderLogos = () => (
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
  );

  return (
    <section className="md:pb- grid w-full place-items-center px-6 pb-20 pt-16 lg:pb-36">
      <div className="">
        {/* Title */}
        <div className="mb-6 text-center text-large-caption-mobile uppercase text-gray-1 md:mb-8 lg:mb-14 lg:text-large-caption-desktop">
          {HOME_ORG_TEXT.HEADER}
        </div>
        {/* Logo Grid */}

        {renderLogos()}
        <div
          className="mt-6 cursor-pointer text-center text-blue-1 transition-all lg:mt-8 lg:text-component-extra-large"
          onClick={(e) => {
            e.preventDefault();
            setShowLogoModal(true);
          }}
        >
          {HOME_ORG_TEXT.SEE_MORE_CTA}
        </div>
      </div>
      {/* CTA Box*/}
      <div className="relative mt-20 max-w-[475px] md:mt-40 lg:mt-28 lg:max-w-[608px]">
        {/* Offset Blackbox */}
        <div className="absolute -bottom-1 -right-2 left-0 top-2 rounded-2xl bg-[#363D3F]" />
        <div className="relative z-10 rounded-[10px] bg-light-orange ring-4 ring-illustration-black">
          {/* Content */}
          <div className="flex flex-col items-center px-8 py-6 text-center md:px-11 md:py-10 lg:px-10 lg:py-14">
            {/* Title */}
            <div className="text-displaytext-center px-2 text-h4-mobile text-black-text lg:text-h4-desktop">
              <p>{HOME_ORG_TEXT.CTA_TITLE}</p>
            </div>
            <div className="pt-4 text-center font-sans text-p2-mobile text-black-text lg:px-0 lg:text-p2-desktop">
              {HOME_ORG_TEXT.CTA_BODY}
            </div>
            {/* Button */}
            <Link href={ORG_SIGNUP_LINK}>
              <Button
                variant={ButtonVariant.OUTLINED}
                label={HOME_ORG_TEXT.CTA_BUTTON}
                className="mt-6 w-full max-w-[228px] lg:mt-10 lg:max-w-[352px]"
              />
            </Link>
          </div>
        </div>
      </div>

      {showLogoModal && (
        <Modal
          headline="Organizations that recruit through Tekalo"
          isOpen={showLogoModal}
          content={renderLogos()}
          closeModal={() => setShowLogoModal(false)}
          onConfirm={() => setShowLogoModal(false)}
        />
      )}
    </section>
  );
};

export default OrganizationSection;
