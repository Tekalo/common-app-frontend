import { ERROR_TEXT } from '@/lang/en/en';
import ApplicationLayout from '@/lib/layouts/forms/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ErrorPageWrapper from '@/modules/components/pages/wrappers/errorPageWrapper';

const Page404: NextPageWithLayout = () => {
  return (
    <ErrorPageWrapper
      headline={ERROR_TEXT.notFoundCode}
      bodyText={ERROR_TEXT.notFoundText}
    />
  );
};

export default Page404;

Page404.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
