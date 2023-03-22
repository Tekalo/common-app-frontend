import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

const OrganizationSignup: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello and welcome to the organizaton sign up page!</div>
      <Link href="/">Home</Link>
    </>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
