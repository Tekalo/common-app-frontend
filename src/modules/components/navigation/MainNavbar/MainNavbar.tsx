/* eslint-disable @next/next/no-html-link-for-pages */

import Button from '@/components/buttons/Button/Button';
import { ACCOUNT_LINK, APPLICANT_SIGNUP_LINK, NAV_BAR_TEXT } from '@/lang/en';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { SyntheticEvent } from 'react';

export type IMainNavbar = React.ComponentPropsWithoutRef<'header'>;

const MainNavbar: React.FC<IMainNavbar> = ({ className, ...headerProps }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const logInOutLabel = isAuthenticated
    ? NAV_BAR_TEXT.SIGN_OUT
    : NAV_BAR_TEXT.SIGN_IN;

  const handleAuthentication = (e: SyntheticEvent) => {
    e.preventDefault();

    isAuthenticated
      ? logout({ logoutParams: { returnTo: window.location.origin } })
      : loginWithRedirect();
  };

  return (
    <nav className="fixed z-30 w-screen bg-white">
      <div className="mx-auto h-auto max-w-[1440px] xs:px-1 sm:px-4 md:px-14 lg:px-20">
        <div className="space-y-50 flex justify-around sm:justify-between">
          <div className="flex flex-row items-center py-4 md:gap-x-6 md:py-6">
            {/* Logo */}
            <Link href="/" className="">
              <img
                src="/images/logo_nav.png"
                alt="Tekalo Logo"
                className="max-w-[96px] py-1 md:max-w-[132px]"
              />
            </Link>
            <div className="ml-4 flex flex-row pt-1 text-p3-mobile md:ml-10 md:pt-2 lg:text-p2-desktop"></div>
          </div>
          <div className="flex items-center space-x-4 md:space-x-9 lg:space-x-10">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div className="flex flex-auto animate-pulse flex-row space-x-4 pt-2">
                <div className="hidden rounded bg-gray-1 px-12 py-3 md:block" />
                <div className="rounded bg-gray-1 px-12 py-3 md:px-8 lg:px-12" />
                <div className="flex h-6 w-6 items-center rounded bg-gray-1 md:hidden"></div>
              </div>
            ) : (
              <>
                <div
                  className="cursor-pointer py-3 text-component-large text-black-text hover:text-blue-1 active:text-blue-2 md:block md:text-component-extra-large lg:text-component-large"
                  onClick={(e) => handleAuthentication(e)}
                >
                  {logInOutLabel}
                </div>
                <Link
                  href={
                    isAuthenticated
                      ? `${ACCOUNT_LINK}`
                      : `${APPLICANT_SIGNUP_LINK}`
                  }
                >
                  {isAuthenticated ? (
                    <div className="cursor-pointer px-3 py-3 text-component-extra-large font-normal text-black-text md:px-6">
                      {NAV_BAR_TEXT.MY_ACCOUNT}
                    </div>
                  ) : (
                    <Link href={APPLICANT_SIGNUP_LINK}>
                      <Button
                        className="px-4 py-2 md:px-8 md:py-3"
                        label={NAV_BAR_TEXT.GET_STARTED_CTA}
                      />
                    </Link>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
