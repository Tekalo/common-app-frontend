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
    <nav className="w-screen bg-white">
      <div className="mx-auto h-auto max-w-7xl xs:px-1 mobile:px-4 tablet:px-10 desktop:px-20">
        <div className="space-y-50 flex justify-around mobile:justify-between">
          <div className="flex py-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-row space-x-4 px-4 py-1 text-component-lg text-black-text tablet:py-3 tablet:px-8"
            >
              LOGO TBD
            </Link>
          </div>
          <div className="flex items-center space-x-2 tablet:space-x-6 desktop:space-x-10">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div className="flex flex-auto animate-pulse flex-row space-x-4">
                <div className="hidden rounded bg-slate-700 px-12 py-3 tablet:block" />
                <div className="rounded bg-slate-700 px-12 py-3 tablet:px-8 desktop:px-12" />
                <div className="flex h-6 w-6 items-center rounded bg-slate-700 tablet:hidden"></div>
              </div>
            ) : (
              <>
                <a
                  className="hidden cursor-pointer px-6 py-3 text-component-xl font-normal text-black-text hover:text-blue-1-primary active:text-blue-2-hover tablet:block"
                  onClick={(e) => handleAuthentication(e)}
                >
                  {isAuthenticated ? 'Log out' : 'Log in'}
                </a>
                <Link href={isAuthenticated ? '/dashboard' : '/sign-up'}>
                  {isAuthenticated ? (
                    <div className="cursor-pointer px-3 py-3 text-component-xl font-normal text-black-text tablet:px-6">
                      My account
                    </div>
                  ) : (
                    <Button
                      className="px-4 py-2 font-normal tablet:py-3 tablet:px-8"
                      label="Get started"
                      onClick={() => {}}
                    />
                  )}
                </Link>
                {/* Mobile Button */}
                <div className="flex items-center mobile:mr-0 tablet:hidden">
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
