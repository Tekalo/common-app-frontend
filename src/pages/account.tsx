import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

export interface ICandidateAccount {
  applicationSubmitted: boolean;
}

const CandidateAccount: NextPageWithLayout<ICandidateAccount> = ({
  applicationSubmitted,
}) => {
  // TODO: Undo
  applicationSubmitted = true;

  return (
    <div className="m-auto w-full max-w-[928px] pb-36 pt-24">
      <div className="mb-2 font-display text-h3-desktop text-black-text">
        Welcome Back, [Name]
      </div>
      <div className="mb-6 font-display text-h4-desktop text-black-text">
        Manage your settings
      </div>
      {/* Bordered Settings BOx */}
      <div className="border border-gray-3 p-10">
        <div className="mb-6 font-display text-small-caption-desktop text-gray-1">
          Your Account
        </div>
        {/* Application Status */}
        <div className={`${applicationSubmitted ? '' : 'hidden'} space-y-2`}>
          <div className="text-component-medium text-blue-1">
            <Link href="/sign-up/applicants">
              {'Continue my application >'}
            </Link>
          </div>
          <div className="text-p3-desktop text-gray-1">
            Your application has not been submitted yet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAccount;

CandidateAccount.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
