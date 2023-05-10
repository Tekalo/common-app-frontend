/* eslint-disable @next/next/no-html-link-for-pages */

import { CONTACT_US_EMAIL_LINK } from '@/lib/constants/text';
import { useAuth0 } from '@auth0/auth0-react';
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
      <div className="mx-auto max-w-[1440px] xs:px-1 sm:px-4 md:px-10 lg:px-24">
        <div className="flex items-center justify-around sm:justify-between">
          <div className="flex flex-row items-center justify-center py-5">
            {/* Logo */}
            <Link href="/" className="">
              <img
                src="/images/logo_nav.png"
                alt="Tekalo Logo"
                className="max-w-[96px] py-1 md:max-w-[132px]"
              />
            </Link>
            <div className="ml-4 flex flex-row pt-1 text-p3-mobile md:ml-10 md:pt-2 lg:text-p2-desktop">
              {title}
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-10">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div className="flex flex-auto animate-pulse flex-row space-x-4">
                <div className="hidden rounded bg-gray-1 px-12 py-3 md:block" />
                <div className="flex h-6 w-6 items-center rounded bg-gray-1 md:hidden"></div>
              </div>
            ) : (
              <>
                {/* Contact Us Button */}
                <a
                  className="cursor-pointer text-component-large font-normal text-black-text hover:text-blue-1 active:text-blue-2 md:pt-1 lg:text-component-extra-large"
                  href={CONTACT_US_EMAIL_LINK}
                >
                  Contact us
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LiteNavbar;
