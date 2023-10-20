import ApplicationLayout from '@/lib/layouts/forms/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ApplicantForms from '@/modules/components/pages/ApplicantForms';

// Do not change this
const isEditing = true;

const EditApplicationPage: NextPageWithLayout = () => {
  return <ApplicantForms isEditing={isEditing} />;
};

export default EditApplicationPage;

EditApplicationPage.getLayout = (page) => {
  return <ApplicationLayout isEditing={isEditing}>{page}</ApplicationLayout>;
};
