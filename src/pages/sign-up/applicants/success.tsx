import SuccessSection from '@/components/info/successSection/SuccessSection';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';

const ApplicantSuccess: NextPageWithLayout = () => {
  return (
    <SuccessSection
      title="Your application was submitted!"
      body="You will receive a confirmation email shortly. Your assigned Tekalo recruiting liaison will review your application and contact you via your preferred contact method once matches are available. This process may take up to 6 weeks. Thank you for applying to Tekalo."
      buttonText="Done"
      buttonHandler={() => void {}}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
