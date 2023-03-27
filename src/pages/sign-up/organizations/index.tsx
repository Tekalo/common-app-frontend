import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';

const OrganizationSignup: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col">
      {/* TODO: Title */}
      <div className=""></div>
      {/* TODO: Navaway have an account*/}
      <div className=""></div>
      {/* TODO: Form */}
      <div className=""></div>
      {/* TODO: Sign-up button */}
      <div className=""></div>
      {/* TODO: Navaway organizations */}
      <div className=""></div>
    </div>
  );
};

export default OrganizationSignup;

OrganizationSignup.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
