import { HOME_ABOUT_TEXT } from '@/lang/en';
import Image from 'next/image';

const RoleTypes: React.FC = () => {
  const roles = [
    {
      src: '/images/roles/SWERole.png',
      alt: 'Software Engineering Role',
      text: 'Software Engineering',
    },
    {
      src: '/images/roles/PMRole.png',
      alt: 'Product Role',
      text: 'Product',
    },
    {
      src: '/images/roles/UXRole.png',
      alt: 'Design & UX Role',
      text: (
        <>
          Design & <br className="hidden md:inline-block" /> UX
        </>
      ),
    },
    {
      src: '/images/roles/DSRole.png',
      alt: 'Data Role',
      text: 'Data',
    },
  ];

  return (
    <div>
      <h4 className="mb-6 text-center font-display text-h3-mobile text-black-text md:mb-10 md:text-h3-desktop lg:mb-14">
        {HOME_ABOUT_TEXT.ROLE_HEADER}
      </h4>
      <div className="mx-auto flex max-w-[280px] flex-wrap justify-start gap-y-1 md:max-w-[544px] md:justify-center md:gap-x-8 md:gap-y-3">
        {roles.map((role, i) => (
          <div key={i} className="mb-5 flex items-center gap-x-4 md:w-[256px]">
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
  );
};

export default RoleTypes;
