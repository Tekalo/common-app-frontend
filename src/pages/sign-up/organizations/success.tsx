import SuccessSection from '@/components/info/successSection/SuccessSection';
import { ORG_FORM_TEXT } from '@/lang/en';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { useRouter } from 'next/router';

const ApplicantSuccess: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <SuccessSection
      title={ORG_FORM_TEXT.SUCCESS.title}
      body={ORG_FORM_TEXT.SUCCESS.body}
      buttonText={ORG_FORM_TEXT.SUCCESS.cta}
      buttonHandler={() => router.push}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
