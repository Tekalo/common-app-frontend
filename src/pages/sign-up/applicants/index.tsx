import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

const ApplicantSignup: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello and welcome to the applicant sign up page!</div>
      <Link href="/">Home</Link>
    </>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
