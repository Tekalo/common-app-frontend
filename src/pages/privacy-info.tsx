import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

const PrivacyInfo: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello and welcome to the privacy info page!</div>
      <Link href="/">Home</Link>
    </>
  );
};

export default PrivacyInfo;

PrivacyInfo.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
