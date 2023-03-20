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
    <nav className="bg-white fixed top-0 z-10 w-screen">
      <div className="xs:px-1 tablet:px-10 desktop:px-20 mx-auto h-auto max-w-7xl sm:px-4">
        <div className="space-y-50 flex justify-around sm:justify-between">
          <div className="flex py-4">
            {/* Logo */}
            <Link
              href="/"
              className="tablet:py-3 tablet:px-8 flex flex-row space-x-4 px-4 py-1 text-component-lg text-black-text"
            >
              LOGO TBD
            </Link>
          </div>
          <div className="tablet:space-x-6 desktop:space-x-10 flex items-center space-x-2">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div className="flex flex-auto animate-pulse flex-row space-x-4">
                <div className="bg-slate-700 tablet:block hidden rounded px-12 py-3" />
                <div className="bg-slate-700 tablet:px-8 desktop:px-12 rounded px-12 py-3" />
                <div className="bg-slate-700 tablet:hidden flex h-6 w-6 items-center rounded"></div>
              </div>
            ) : (
              <>
                <a
                  className="tablet:block hidden cursor-pointer px-6 py-3 text-component-xl font-normal text-black-text hover:text-blue-1 active:text-blue-2"
                  onClick={(e) => handleAuthentication(e)}
                >
                  {isAuthenticated ? 'Log out' : 'Log in'}
                </a>
                <Link href={isAuthenticated ? '/dashboard' : '/sign-up'}>
                  {isAuthenticated ? (
                    <div className="tablet:px-6 cursor-pointer px-3 py-3 text-component-xl font-normal text-black-text">
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
                <div className="tablet:hidden flex items-center sm:mr-0">
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
