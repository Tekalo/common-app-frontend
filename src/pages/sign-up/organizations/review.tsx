import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import OrganizationReview from '@/sections/sign-up/organizations/reviewForm/OrganizationReview';

const OrganizationReviewPage: NextPageWithLayout = () => <OrganizationReview />;

export default OrganizationReviewPage;

OrganizationReviewPage.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
