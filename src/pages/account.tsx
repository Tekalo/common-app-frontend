import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import AccountSection from '@/sections/account/AccountSection';

const CandidateAccountPage: NextPageWithLayout = () => (
  <AccountSection applicationSubmitted={false} matchesPaused={false} />
);

export default CandidateAccountPage;

CandidateAccountPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
