import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import AccountSection from '@/sections/account/AccountSection';

const CandidateAccountPage: NextPageWithLayout = () => <AccountSection />;

export default CandidateAccountPage;

CandidateAccountPage.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
