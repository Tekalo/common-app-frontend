/* eslint-disable @next/next/no-html-link-for-pages */

import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import NavBarWrapper from '@/components/pages/wrappers/NavBarWrapper';
import {
  ACCOUNT_LINK,
  CONTACT_US_MAILTO_LINK,
  NAV_BAR_TEXT,
  NAV_LITE_HEADER_TEXT,
} from '@/lang/en/en';
import { IconType } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface ILiteNavbar extends React.ComponentPropsWithoutRef<'header'> {
  isEditing?: boolean;
  title?: string;
}

const LiteNavbar: React.FC<ILiteNavbar> = ({ isEditing, title }) => {
  const { isLoading } = useAuth0();

  return (
    <div className="fixed z-30 w-screen">
      <NavBarWrapper isEditing={isEditing} title={title}>
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
                <Link data-name="lite-navbar-account-link" href={ACCOUNT_LINK}>
                  <Button
                    data-name="lite-navbar-account-btn"
                    variant={ButtonVariant.OUTLINED}
                    label={NAV_BAR_TEXT.MY_ACCOUNT}
                    prefixedIcon={
                      (
                        <UserCircleIcon className="w-6" />
                      ) as unknown as IconType
                    }
                    className="flex cursor-pointer items-center justify-center space-x-1 px-2 py-2 font-sans text-component-large md:px-6 md:py-3"
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
      </NavBarWrapper>
    </div>
  );
};

export default LiteNavbar;
