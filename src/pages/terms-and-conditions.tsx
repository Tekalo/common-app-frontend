import { NextPageWithLayout } from '@/lib/types';
import HomeLayout from '@/modules/layouts/home/HomeLayout';
import TermsAndConditions from '@/modules/sections/terms/TermsAndConditions';

const TermsConditionsPage: NextPageWithLayout = () => {
  return <TermsAndConditions />;
};

export default TermsConditionsPage;

TermsConditionsPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
