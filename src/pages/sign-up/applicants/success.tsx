import SuccessSection from '@/components/info/successSection/SuccessSection';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import router from 'next/router';

const ApplicantSuccess: NextPageWithLayout = () => {
  return (
    <SuccessSection
      title="Your application was submitted!"
      body="You will receive a confirmation email shortly. Your assigned Tekalo Talent Connector will review your application and contact you via your preferred contact method once matches are available. Thank you for applying to Tekalo."
      buttonText="Done"
      buttonHandler={() => {
        router.push('/');
      }}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
