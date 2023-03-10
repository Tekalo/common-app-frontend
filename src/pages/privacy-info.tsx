import HomeLayout from '@/components/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

const PrivacyInfo: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello and welcome to the privacy info page!</div>
      <Link href="/">
        <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Go Home
        </button>
      </Link>
    </>
  );
};

export default PrivacyInfo;

PrivacyInfo.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
