import SuccessSection from '@/components/info/successSection/SuccessSection';
import OrganizationLayout from '@/lib/layouts/organization/OrganizationLayout';
import { NextPageWithLayout } from '@/lib/types';

const ApplicantSuccess: NextPageWithLayout = () => {
  return (
    <SuccessSection
      title="Your intake form was submitted!"
      body="You will receive a confirmation email shortly. Your assigned Tekalo recruiting liaison will review your application and contact you. This process may take up to 6 weeks. Thank you for applying to Tekalo."
      buttonText="Done"
      buttonHandler={() => void {}}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <OrganizationLayout>{page}</OrganizationLayout>;
};
