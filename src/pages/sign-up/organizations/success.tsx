import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import SuccessPage from '@/sections/sign-up/successPage/SuccessPage';

const ApplicantSuccess: NextPageWithLayout = () => {
  return (
    <SuccessPage
      title="Your intake form was submitted!"
      body="You will receive a confirmation email shortly. Your assigned Tekalo recruiting liaison will review your application and contact you. This process may take up to 6 weeks. Thank you for applying to Tekalo."
      buttonText="Done"
      buttonHandler={() => void {}}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
