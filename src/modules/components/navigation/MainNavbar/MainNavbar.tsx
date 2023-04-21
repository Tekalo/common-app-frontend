/* eslint-disable @next/next/no-html-link-for-pages */

import Button from '@/components/buttons/Button/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

export type IMainNavbar = React.ComponentPropsWithoutRef<'header'>;

const MainNavbar: React.FC<IMainNavbar> = ({ className, ...headerProps }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const logInOutLabel = isAuthenticated ? 'Log out' : 'Log in';

  const handleAuthentication = (e: SyntheticEvent) => {
    e.preventDefault();

    isAuthenticated
      ? logout({ logoutParams: { returnTo: window.location.origin } })
      : loginWithRedirect();
  };

  const hideMobileMenu = (): void => {
    setMobileMenuIsOpen(false);
  };
  const toggleMobileMenu = (): void => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  return (
    <div>
      <nav className="fixed z-30 w-screen bg-white">
        <div className="mx-auto h-auto xs:px-1 sm:px-4 md:px-10 lg:px-20">
          <div className="space-y-50 flex justify-around sm:justify-between">
            <div className="flex py-4">
              {/* Logo */}
              <Link
                href="/"
                className="flex flex-row space-x-4 px-4 py-1 text-component-large text-black-text md:px-8 md:py-3"
              >
                {'LOGO TBD'}
              </Link>
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
                  <div
                    className="hidden cursor-pointer px-6 py-3 text-component-extra-large font-normal text-black-text hover:text-blue-1 active:text-blue-2 md:block"
                    onClick={(e) => handleAuthentication(e)}
                  >
                    {logInOutLabel}
                  </div>
                  <Link href={isAuthenticated ? '/dashboard' : '/sign-up'}>
                    {isAuthenticated ? (
                      <div className="cursor-pointer px-3 py-3 text-component-extra-large font-normal text-black-text md:px-6">
                        My account
                      </div>
                    ) : (
                      <Link href={'/sign-up/applicants'}>
                        <Button
                          className="px-4 py-2 font-normal md:px-8 md:py-3"
                          label="Get started"
                          onClick={() => null}
                        />
                      </Link>
                    )}
                  </Link>
                  {/* Mobile Menu Button */}
                  <div className="flex items-center sm:mr-0 md:hidden">
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleMobileMenu()}
                    >
                      {mobileMenuIsOpen ? (
                        <XMarkIcon className="h-6 w-6 stroke-2 text-black-text" />
                      ) : (
                        <Bars3Icon className="h-6 w-6 stroke-2 text-black-text" />
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Menu Container */}
        <div className={`md:hidden ${!mobileMenuIsOpen ? 'hidden' : ''}`}>
          {/* Mobile Overlay */}
          <div
            className="fixed bottom-0 left-0 right-0 top-[7.75rem] z-20 bg-black-text bg-opacity-75"
            onClick={() => hideMobileMenu()}
          ></div>
          {/* Mobile Menu */}
          <div
            className="relative z-30 cursor-pointer bg-white px-6 py-4"
            onClick={(e) => handleAuthentication(e)}
          >
            <div className="text-p2-desktop">{logInOutLabel}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNavbar;
