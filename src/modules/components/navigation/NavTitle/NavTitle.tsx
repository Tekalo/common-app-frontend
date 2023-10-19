import Link from 'next/link';

export interface INavTitle {
  navawayText?: string;
  navLink: string;
  navText: string;
  subtitle?: string;
  title: string;
}

const NavTitle: React.FC<INavTitle> = ({
  navawayText,
  navLink,
  navText,
  subtitle,
  title,
}) => {
  return (
    <>
      {/* Title */}
      <h3
        id="nav-title-header"
        className={`${
          subtitle ? 'mb-2' : 'mb-6 md:mb-4'
        } px-2 text-center font-display text-h3-mobile md:max-w-[584px] lg:text-h3-desktop`}
      >
        {title}
      </h3>
      {subtitle && (
        <h4
          className={`mb-6 max-w-[500px] text-center font-display text-h4-mobile text-black-text ${
            navawayText ? 'md:mb-4' : 'md:mb-12'
          } md:text-h4-desktop`}
        >
          {subtitle}
        </h4>
      )}

      {navawayText && (
        <div
          id="nav-title-sign-in"
          className="m-auto mb-8 max-w-[300px] text-center text-component-medium md:mb-10 md:max-w-[none]"
        >
          {navawayText}
          <span className="text-blue-1 underline underline-offset-4">
            <Link id="nav-title-sign-in-link" href={navLink}>
              {navText}
            </Link>
          </span>
        </div>
      )}
    </>
  );
};

export default NavTitle;
