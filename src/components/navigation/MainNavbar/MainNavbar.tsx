/* eslint-disable @next/next/no-html-link-for-pages */

import Button from '@/components/buttons/Button/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SyntheticEvent } from 'react';

export interface IMainNavbar extends React.ComponentPropsWithoutRef<'header'> {}

const MainNavbar: React.FC<IMainNavbar> = ({ className, ...headerProps }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const handleAuthentication = (e: SyntheticEvent) => {
    e.preventDefault();

    isAuthenticated
      ? logout({ logoutParams: { returnTo: window.location.origin } })
      : loginWithRedirect();
  };

  return (
    <nav className="bg-white top-0 fixed z-10 w-screen">
      <div className="tablet:px-10 xs:px-1 sm:px-4 lg:px-20 mx-auto h-auto max-w-7xl">
        <div className="space-y-50 flex justify-around sm:justify-between">
          <div className="py-4 flex">
            {/* Logo */}
            <Link
              href="/"
              className="tablet:py-3 tablet:px-8 space-x-4 px-4 py-1 flex flex-row text-component-large text-black-text"
            >
              LOGO TBD
            </Link>
          </div>
          <div className="tablet:space-x-6 space-x-2 lg:space-x-10 flex items-center">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div className="space-x-4 flex flex-auto animate-pulse flex-row">
                <div className="bg-slate-700 tablet:block px-12 py-3 hidden rounded" />
                <div className="bg-slate-700 tablet:px-8 px-12 py-3 lg:px-12 rounded" />
                <div className="bg-slate-700 tablet:hidden h-6 w-6 flex items-center rounded"></div>
              </div>
            ) : (
              <>
                <a
                  className="tablet:block px-6 py-3 hidden cursor-pointer text-component-extra-large font-normal text-black-text hover:text-blue-1 active:text-blue-2"
                  onClick={(e) => handleAuthentication(e)}
                >
                  {isAuthenticated ? 'Log out' : 'Log in'}
                </a>
                <Link href={isAuthenticated ? '/dashboard' : '/sign-up'}>
                  {isAuthenticated ? (
                    <div className="tablet:px-6 px-3 py-3 cursor-pointer text-component-extra-large font-normal text-black-text">
                      My account
                    </div>
                  ) : (
                    <Button
                      className="tablet:py-3 tablet:px-8 px-4 py-2 font-normal"
                      label="Get started"
                      onClick={() => {}}
                    />
                  )}
                </Link>
                {/* Mobile Button */}
                <div className="tablet:hidden sm:mr-0 flex items-center">
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

export default MainNavbar;
