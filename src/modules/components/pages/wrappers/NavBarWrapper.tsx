import { IWrapper } from '@/components/pages/wrappers/shared';
import Image from 'next/image';
import Link from 'next/link';

interface INavBarWrapper {
  isEditing?: boolean;
  title?: string;
}

const NavBarWrapper: React.FC<IWrapper & INavBarWrapper> = ({
  children,
  isEditing = false,
  title,
}) => (
  <nav className="bg-white">
    <div className="mx-auto h-auto max-w-[1440px] xs:px-1 sm:px-4 md:px-14 lg:px-20">
      <div className="space-y-50 flex justify-around sm:justify-between">
        <div className="flex flex-row items-center py-4 md:gap-x-6 md:py-6">
          {/* Logo */}
          <Link href="/" data-name="navbar-logo-link">
            <Image
              data-name="navbar-logo"
              src="/images/logo_nav.png"
              alt="Tekalo Logo"
              className="max-w-[96px] py-1 md:max-w-[132px]"
              width={264}
              height={56}
            />
          </Link>
          <div
            className={`${
              isEditing ? 'hidden md:inline-block' : ''
            } ml-4 flex flex-row pt-1 text-p3-mobile md:ml-0 md:pt-2 md:text-p2-mobile
            lg:text-p2-desktop`}
            data-name="navbar-title"
          >
            {title}
          </div>
        </div>
        {children}
      </div>
    </div>
  </nav>
);

export default NavBarWrapper;
