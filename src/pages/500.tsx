import { ERROR_TEXT } from '@/lang/en/en';
import ApplicationLayout from '@/lib/layouts/forms/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import ErrorPageWrapper from '@/modules/components/pages/wrappers/errorPageWrapper';

const Page500: NextPageWithLayout = () => {
  return (
    <ErrorPageWrapper
      headline={ERROR_TEXT.unhandledCode}
      bodyText={ERROR_TEXT.unhandledText}
    />
  );
};

export default Page500;

Page500.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
