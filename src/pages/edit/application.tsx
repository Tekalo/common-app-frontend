import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ApplicantForms from '@/modules/components/pages/ApplicantForms';

const EditApplicationPage: NextPageWithLayout = () => {
  return <ApplicantForms isEditing={true} />;
};

export default EditApplicationPage;

EditApplicationPage.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
