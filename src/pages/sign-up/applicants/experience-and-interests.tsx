import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ApplicantForms from '@/modules/components/pages/ApplicantForms';

const ExperienceAndInterestPage: NextPageWithLayout = () => {
  return <ApplicantForms isEditing={false} />;
};

export default ExperienceAndInterestPage;

ExperienceAndInterestPage.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
