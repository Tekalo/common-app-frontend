/* eslint-disable @next/next/no-html-link-for-pages */

import Button from '@/components/buttons/Button/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SyntheticEvent } from 'react';

export interface IMainNavbar extends React.ComponentPropsWithoutRef<'header'> {}

const MainNavbar: React.FC<IMainNavbar> = ({ className, ...headerProps }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleAuthentication = (e: SyntheticEvent) => {
    // FIXME: There is an error somewhere in this component where the unauthenticated bar loads before being swapped to authenticated. May need to check that and do somethign about it -- loading maybe?
    e.preventDefault();

    isAuthenticated
      ? logout({ logoutParams: { returnTo: window.location.origin } })
      : loginWithRedirect();
  };

  return (
    <nav className="w-screen bg-white">
      <div className="mx-auto h-auto max-w-7xl xs:px-1 mobile:px-4 tablet:px-10 desktop:px-20">
        <div className="space-y-50 flex tablet:justify-between">
          {/* Logo */}
          <div className="flex py-4">
            <Link
              href="/"
              className="flex flex-row space-x-4 px-4 py-1 text-component-lg text-black-text tablet:py-3 tablet:px-8"
            >
              LOGO TBD
            </Link>
          </div>
          {/* Primary Nav */}
          <div className="flex items-center space-x-6 tablet:space-x-2 desktop:space-x-10">
            {/* Using regular anchor here for auth0 redirect */}
            <a
              className="hidden cursor-pointer px-6 py-3 text-component-xl font-normal text-black-text tablet:block"
              onClick={(e) => handleAuthentication(e)}
            >
              {isAuthenticated ? 'Log out' : 'Log in'}
            </a>
            <Link
              href={isAuthenticated ? '/dashboard' : '/sign-up'}
              className={
                isAuthenticated
                  ? 'cursor-pointer px-6 py-3 text-component-xl font-normal text-black-text'
                  : ''
              }
            >
              {isAuthenticated ? (
                'My account'
              ) : (
                <Button
                  className="px-4 py-2 font-normal tablet:py-3 tablet:px-8"
                  label="Get started"
                  onClick={() => {}}
                />
              )}
            </Link>
            {/* Mobile Button */}
            <div className="flex items-center tablet:hidden">
              <Bars3Icon className="h-6 w-6 stroke-2 text-black-text" />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
    </nav>
  );
};

export default MainNavbar;
