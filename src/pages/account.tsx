import HomeLayout from '@/lib/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import AccountSection from '@/sections/account/AccountSection';

const CandidateAccountPage: NextPageWithLayout = () => <AccountSection />;

export default CandidateAccountPage;

CandidateAccountPage.getLayout = (page) => {
  return <HomeLayout pageName="account">{page}</HomeLayout>;
};
