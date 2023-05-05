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
    <div className="px-6 pt-10 md:px-24">
      {/* Title */}
      <div className="mb-4 px-2 text-center text-h3-desktop md:mb-6 md:max-w-[584px]">
        {title}
      </div>
      {/* Navaway is an applicant*/}
      <div className="text-center text-component-medium">
        {navawayText}
        <span className="text-blue-1 underline underline-offset-4">
          <Link href={navLink}>{navText}</Link>
        </span>
      </div>
    </div>
  );
};

export default NavTitle;
