import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

const ApplicantSignup: NextPageWithLayout = () => {
  return (
    <div className="grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8 text-center">
      {/* Title */}
      <div className="col-span-6 col-start-4 pt-16 font-display text-h3-desktop text-black-text">
        Join a network with over XX00 organizations to find your match.
      </div>
      {/* Navaway have an account*/}
      <div className="col-span-4 col-start-5">
        Already have an account?{' '}
        <span className="text-blue-1 underline underline-offset-2">
          <Link href="/sign-in">Sign in</Link>
        </span>
      </div>
      {/* TODO: Form */}
      <div className=""></div>
      {/* TODO: Sign-up button */}
      <div className=""></div>
      {/* TODO: Navaway organizations */}
      <div className=""></div>
    </div>
  );
};

export default ApplicantSignup;

ApplicantSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
