import { Bars3Icon } from '@heroicons/react/24/outline';

import Button from '@/components/buttons/Button/Button';
import Link from 'next/link';

export interface IMainNavbar extends React.ComponentPropsWithoutRef<'header'> {}

const MainNavbar: React.FC<IMainNavbar> = ({ className, ...headerProps }) => {
  return (
    <nav className="w-screen bg-white">
      <div className="mx-auto h-auto max-w-7xl px-20 mobile:px-4 tablet:px-10">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex py-4">
            <Link
              href="/"
              className="flex flex-row space-x-4 px-8 py-3 text-component-lg text-black-text"
            >
              LOGO TBD
            </Link>
          </div>
          {/* Primary Nav */}
          <div className="flex items-center space-x-16 tablet:space-x-2 desktop:space-x-10">
            <Link
              href="/"
              className="hidden px-6 py-3 text-component-xl font-normal text-black-text tablet:block"
            >
              Log in
            </Link>
            <Link href="/" className="">
              <Button
                className="px-4 py-2 font-normal tablet:py-3 tablet:px-8"
                label="Get started"
                onClick={() => {}}
              />
            </Link>
          </div>
          {/* Mobile Button */}
          <div className="flex items-center tablet:hidden">
            <Bars3Icon className="h-6 w-6 stroke-2 text-black-text" />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
    </nav>
  );
};

export default MainNavbar;
