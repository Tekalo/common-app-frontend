import { ACCOUNT_PAGE_TEXT } from '@/lang/en/en';

interface IAccountGreeting {
  accountName: string;
  showContent: boolean;
}

const AccountGreeting: React.FC<IAccountGreeting> = ({
  accountName,
  showContent,
}) => {
  return (
    <>
      {showContent ? (
        <>
          <h3
            data-name="account-greeting"
            className="mb-2 font-display text-h3-desktop text-black-text"
          >
            {`${ACCOUNT_PAGE_TEXT.WELCOME}${
              accountName ? `, ${accountName}` : accountName
            }`}
          </h3>
          <h4
            data-name="account-subhead"
            className="mb-6 font-display text-h4-desktop text-black-text"
          >
            {ACCOUNT_PAGE_TEXT.MANAGE}
          </h4>
        </>
      ) : (
        <div className="mb-5 grid grid-cols-10 space-y-3">
          <div className="col-span-3 animate-pulse rounded bg-gray-4 py-[9px]" />
          <div className="row-start-2  animate-pulse rounded bg-gray-4 py-[9px]" />
        </div>
      )}
    </>
  );
};

export default AccountGreeting;
