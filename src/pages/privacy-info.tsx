import HomeLayout from '@/lib/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import PrivacyInfo from '@/sections/privacy/PrivacyInfo';

const PrivacyInfoPage: NextPageWithLayout = () => <PrivacyInfo />;

export default PrivacyInfoPage;

PrivacyInfoPage.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
