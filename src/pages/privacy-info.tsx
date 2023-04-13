import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';

const PrivacyInfo: NextPageWithLayout = () => <PrivacyInfo />;

export default PrivacyInfo;

PrivacyInfo.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
