/* eslint-disable @next/next/no-html-link-for-pages */

import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import {
  ACCOUNT_LINK,
  CONTACT_US_MAILTO_LINK,
  NAV_BAR_TEXT,
  NAV_LITE_HEADER_TEXT,
} from '@/lang/en';
import { IconType } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export interface ILiteNavbar extends React.ComponentPropsWithoutRef<'header'> {
  isEditing?: boolean;
  title?: string;
}

const LiteNavbar: React.FC<ILiteNavbar> = ({
  className,
  isEditing,
  title,
  ...headerProps
}) => {
  const { isLoading } = useAuth0();

  return (
    <nav className="fixed z-30 w-screen bg-white">
      <div className="mx-auto h-auto max-w-[1440px] xs:px-1 sm:px-4 md:px-14 lg:px-20">
        <div className="space-y-50 flex justify-around sm:justify-between">
          <div className="flex flex-row items-center py-4 md:gap-x-6 md:py-6">
            {/* Logo */}
            <Link href="/" data-name="lite-navbar-logo-link">
              <Image
                data-name="lite-navbar-logo"
                src="/images/logo_nav.png"
                alt="Tekalo Logo"
                className="max-w-[96px] py-1 md:max-w-[132px]"
                width={264}
                height={56}
              />
            </Link>
            <div
              className="ml-4 flex flex-row pt-1 text-p3-mobile md:ml-0 md:pt-2 md:text-p2-mobile lg:text-p2-desktop"
              data-name="lite-navbar-title"
            >
              {isEditing ? '' : title}
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-10">
            {isLoading ? (
              // Creates skeleton loader to handle waiting for auth check
              <div
                data-name="lite-navbar-loading-content"
                className="flex flex-auto animate-pulse flex-row space-x-4"
              >
                <div className="hidden rounded bg-gray-1 px-12 py-3 md:block" />
                <div className="flex h-6 w-6 items-center rounded bg-gray-1 md:hidden"></div>
              </div>
            ) : (
              <>
                {/* Account link for editing */}
                {isEditing && (
                  <Link
                    data-name="lite-navbar-account-link"
                    href={ACCOUNT_LINK}
                  >
                    <Button
                      data-name="lite-navbar-account-btn"
                      variant={ButtonVariant.OUTLINED}
                      label={NAV_BAR_TEXT.MY_ACCOUNT}
                      prefixedIcon={
                        (
                          <UserCircleIcon className="w-6" />
                        ) as unknown as IconType
                      }
                      className="flex cursor-pointer items-center justify-center space-x-1 px-1 py-2 font-sans text-component-large md:px-6 md:py-3"
                    >
                      {NAV_BAR_TEXT.MY_ACCOUNT}
                    </Button>
                  </Link>
                )}

                {/* Contact Us Button */}
                <a
                  className="cursor-pointer pt-1 text-component-large font-normal text-black-text hover:text-blue-1 active:text-blue-2 md:pt-1 lg:text-component-extra-large"
                  data-name="lite-navbar-contact-btn"
                  href={CONTACT_US_MAILTO_LINK}
                >
                  {NAV_LITE_HEADER_TEXT.contactUs}
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
