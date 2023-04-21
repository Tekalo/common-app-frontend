import ApplicationLayout from '@/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import OrganizationReview from '@/sections/organizations/OrganizationReview';

const OrganizationReviewPage: NextPageWithLayout = () => <OrganizationReview />;

export default OrganizationReviewPage;

OrganizationReviewPage.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
