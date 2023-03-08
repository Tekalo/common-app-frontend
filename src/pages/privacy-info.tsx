import HomeLayout from '@/components/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';

const PrivacyInfo: NextPageWithLayout = () => {
  return <div>privacy-info</div>;
};

export default PrivacyInfo;

PrivacyInfo.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
