import { ACCOUNT_PAGE_TEXT } from '@/lang/en/en';
import { ReactNode } from 'react';

interface IAccountSettingsBox {
  children: ReactNode;
  showContent: boolean;
}

const AccountSettingsBox: React.FC<IAccountSettingsBox> = ({
  children,
  showContent,
}) => {
  return (
    <div className="border border-gray-3 p-10">
      {showContent ? (
        <>
          <div
            data-name="actions-header"
            className="mb-6 font-display text-small-caption-desktop text-gray-1"
          >
            {ACCOUNT_PAGE_TEXT.ACCOUNT}
          </div>

          <div className="space-y-5">{children}</div>
        </>
      ) : (
        <div className="mb-5 grid grid-cols-10 space-y-3">
          <div className="col-span-3 animate-pulse rounded bg-gray-4 py-[9px]" />
          <div className="row-start-2  animate-pulse rounded bg-gray-4 py-[9px]" />
        </div>
      )}
    </div>
  );
};

export default AccountSettingsBox;
