import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import TermsAndConditions from '@/sections/terms/TermsAndConditions';

const TermsConditionsPage: NextPageWithLayout = () => {
  return <TermsAndConditions />;
};

export default TermsConditionsPage;

TermsConditionsPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
