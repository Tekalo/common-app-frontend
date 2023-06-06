import Link from 'next/link';

export interface INavTitle {
  title: string;
  navawayText: string;
  navLink: string;
  navText: string;
}

const NavTitle: React.FC<INavTitle> = ({
  title,
  navawayText,
  navLink,
  navText,
}) => {
  return (
    <>
      {/* Title */}
      <h3 className="mb-6 px-2 text-center font-display text-h3-mobile md:mb-4 md:max-w-[584px] lg:text-h3-desktop">
        {title}
      </h3>
      {/* Navaway is an applicant*/}
      <div className="m-auto mb-8 max-w-[300px] text-center text-component-medium md:mb-10 md:max-w-[none]">
        {navawayText}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href={navLink}>{navText}</Link>
        </span>
      </div>
    </>
  );
};

export default NavTitle;
