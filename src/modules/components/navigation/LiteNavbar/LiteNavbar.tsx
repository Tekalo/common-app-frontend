/* eslint-disable @next/next/no-html-link-for-pages */

import { useAuth0 } from '@auth0/auth0-react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SyntheticEvent } from 'react';

export interface ILiteNavbar extends React.ComponentPropsWithoutRef<'header'> {
  title?: string;
}

const LiteNavbar: React.FC<ILiteNavbar> = ({
  className,
  title,
  ...headerProps
}) => {
  const { isAuthenticated, isLoading, logout } = useAuth0();

  const handleAuthentication = (e: SyntheticEvent) => {
    e.preventDefault();
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <nav className="fixed z-10 w-screen bg-white">
      <div className="mx-auto h-20 xs:px-1 sm:px-4 md:px-10 lg:px-20">
        <div className="flex justify-around sm:justify-between">
          <div className="flex flex-row justify-center py-5 align-middle">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-row space-x-4 px-4 text-component-large text-black-text md:px-8"
            >
              <div className="flex flex-row items-center py-3">LOGO TBD</div>
            </Link>
            <div className="flex flex-row space-x-4 py-3 text-p2-desktop md:px-8 md:py-3">
              {title}
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-10">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div className="flex flex-auto animate-pulse flex-row space-x-4">
                <div className="hidden rounded bg-gray-1 px-12 py-3 md:block" />
                <div className="rounded bg-gray-1 px-12 py-3 md:px-8 lg:px-12" />
                <div className="flex h-6 w-6 items-center rounded bg-gray-1 md:hidden"></div>
              </div>
            ) : (
              <>
                {/* Authentication Button */}
                {isAuthenticated ? (
                  <a
                    className="hidden cursor-pointer px-6 py-3 text-component-extra-large font-normal text-black-text hover:text-blue-1 active:text-blue-2 md:block"
                    onClick={(e) => handleAuthentication(e)}
                  >
                    Log out
                  </a>
                ) : null}

                {/* Contact Us Button */}
                <a
                  className="hidden cursor-pointer px-6 py-3 text-component-extra-large font-normal text-black-text hover:text-blue-1 active:text-blue-2 md:block"
                  onClick={(e) => handleAuthentication(e)}
                >
                  Contact us
                </a>
                {/* Mobile Button */}
                <div className="flex items-center sm:mr-0 md:hidden">
                  <Bars3Icon className="h-6 w-6 stroke-2 text-black-text" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
    </nav>
  );
};

export default LiteNavbar;
