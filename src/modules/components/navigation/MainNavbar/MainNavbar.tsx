/* eslint-disable @next/next/no-html-link-for-pages */

import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import MobileMenu from '@/components/navigation/MainNavbar/MobileMenu';
import NavBarWrapper from '@/components/pages/wrappers/NavBarWrapper';
import {
  ACCOUNT_LINK,
  APPLICANT_SIGNUP_LINK,
  NAV_BAR_TEXT,
} from '@/lang/en/en';
import { IconType } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

export interface IMainNavbar extends React.ComponentPropsWithoutRef<'header'> {
  pageName: string;
}

const MainNavbar: React.FC<IMainNavbar> = ({ pageName }) => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const logInOutLabel = isAuthenticated
    ? NAV_BAR_TEXT.SIGN_OUT
    : NAV_BAR_TEXT.SIGN_IN;

  const handleAuthentication = (e?: SyntheticEvent) => {
    e ? e.preventDefault() : () => void {};

    isAuthenticated
      ? logout({ logoutParams: { returnTo: window.location.origin } })
      : loginWithRedirect();
  };

  const toggleMobileMenu = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  const hideMobileMenu = () => {
    setMobileMenuIsOpen(false);
  };

  const scrollToSection = (section: 'faq' | 'how'): void => {
    setMobileMenuIsOpen(false);
    const faqSection = document.getElementById(`landing_${section}`);

    faqSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  return (
    <div className="fixed z-30 w-screen">
      <NavBarWrapper>
        <div className="flex items-center space-x-4 md:space-x-9 lg:space-x-10">
          {isLoading ? (
            // Creates skeleton loader to handle waiting for auth check
            <div className="flex flex-auto animate-pulse flex-row space-x-4 pt-2">
              <div className="hidden rounded bg-gray-4 px-12 py-3 md:block" />
              <div className="rounded bg-gray-4 px-12 py-3 md:px-8 lg:px-12" />
              <div className="flex h-6 w-6 items-center rounded bg-gray-1 md:hidden"></div>
            </div>
          ) : (
            <>
              {/* We only want to show these on the home page */}
              {pageName === 'home' ? (
                <>
                  <div
                    tabIndex={0}
                    className="my-3 hidden cursor-pointer text-component-large text-black-text hover:text-blue-1 active:text-blue-2 md:block"
                    onClick={() => scrollToSection('how')}
                  >
                    {NAV_BAR_TEXT.HOW_IT_WORKS}
                  </div>
                  <div
                    tabIndex={0}
                    className="my-3 hidden cursor-pointer text-component-large text-black-text hover:text-blue-1 active:text-blue-2 md:block"
                    onClick={() => scrollToSection('faq')}
                  >
                    {NAV_BAR_TEXT.FAQ}
                  </div>
                </>
              ) : (
                <></>
              )}
              <div
                tabIndex={0}
                className="my-3 hidden cursor-pointer    text-component-large text-black-text hover:text-blue-1 active:text-blue-2 md:block"
                data-name="sign-in-out-link"
                onClick={(e) => handleAuthentication(e)}
              >
                {logInOutLabel}
              </div>
              {isAuthenticated ? (
                <Link href={ACCOUNT_LINK}>
                  <Button
                    variant={ButtonVariant.OUTLINED}
                    label={NAV_BAR_TEXT.MY_ACCOUNT}
                    prefixedIcon={
                      (
                        <UserCircleIcon className="w-6" />
                      ) as unknown as IconType
                    }
                    className="flex cursor-pointer items-center justify-center space-x-1 px-4 py-2 font-sans text-component-large md:px-6 md:py-3"
                  >
                    {NAV_BAR_TEXT.MY_ACCOUNT}
                  </Button>
                </Link>
              ) : (
                <Link href={APPLICANT_SIGNUP_LINK}>
                  <Button
                    className="px-4 py-2 md:px-8 md:py-3"
                    label={NAV_BAR_TEXT.GET_STARTED_CTA}
                  />
                </Link>
              )}
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
      </NavBarWrapper>
      <MobileMenu
        handleAuthentication={handleAuthentication}
        hideMobileMenu={hideMobileMenu}
        logInOutLabel={logInOutLabel}
        mobileMenuIsOpen={mobileMenuIsOpen}
        scrollToSection={scrollToSection}
      />
    </div>
  );
};

export default MainNavbar;
