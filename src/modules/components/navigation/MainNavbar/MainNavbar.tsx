/* eslint-disable @next/next/no-html-link-for-pages */

import Button from '@/components/buttons/Button/Button';
import { ACCOUNT_LINK, APPLICANT_SIGNUP_LINK, NAV_BAR_TEXT } from '@/lang/en';
import { useAuth0 } from '@auth0/auth0-react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

export interface IMainNavbar extends React.ComponentPropsWithoutRef<'header'> {
  pageName: string;
}

const MainNavbar: React.FC<IMainNavbar> = ({
  pageName,
  className,
  ...headerProps
}) => {
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

  const mobileLinks = [
    {
      text: NAV_BAR_TEXT.HOW_IT_WORKS,
      action: () => {
        scrollToSection('how');
      },
    },
    {
      text: NAV_BAR_TEXT.FAQ,
      action: () => {
        scrollToSection('faq');
      },
    },
    { text: logInOutLabel, action: handleAuthentication },
  ];

  return (
    <nav className="fixed z-30 w-screen bg-white">
      <div className="mx-auto h-auto max-w-[1440px] xs:px-1 sm:px-4 md:px-14 lg:px-20">
        <div className="space-y-50 flex justify-around sm:justify-between">
          <div className="flex flex-row items-center py-4 md:gap-x-6 md:py-6">
            {/* Logo */}
            <Link href="/">
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
                  onClick={(e) => handleAuthentication(e)}
                >
                  {logInOutLabel}
                </div>
                {isAuthenticated ? (
                  <div className="cursor-pointer py-3 text-component-large text-black-text">
                    <Link href={ACCOUNT_LINK}>{NAV_BAR_TEXT.MY_ACCOUNT}</Link>
                  </div>
                ) : (
                  <Button
                    href={APPLICANT_SIGNUP_LINK}
                    className="px-4 py-2 md:px-8 md:py-3"
                    label={NAV_BAR_TEXT.GET_STARTED_CTA}
                  />
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
        </div>
      </div>
      <div className={`md:hidden ${!mobileMenuIsOpen ? 'hidden' : ''}`}>
        {/* Mobile Overlay */}
        <div
          className="fixed bottom-0 left-0 right-0 top-32 z-20 bg-black-text bg-opacity-75"
          onClick={() => hideMobileMenu()}
        ></div>
        {/* Mobile Menu */}
        <div className="relative z-30 bg-white px-6 py-4">
          {mobileLinks.map((link, i) => (
            <div
              onClick={() => link.action()}
              key={i}
              className="px-4 py-3 text-component-large"
            >
              {link.text}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
