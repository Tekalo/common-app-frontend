import SuccessSection from '@/components/info/successSection/SuccessSection';
import { APPLICANT_FORM_TEXT, BASE_LINK } from '@/lang/en';
import ApplicationLayout from '@/lib/layouts/forms/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { useRouter } from 'next/router';

const ApplicantSuccess: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <SuccessSection
      title={APPLICANT_FORM_TEXT.SUCCESS.title}
      body={APPLICANT_FORM_TEXT.SUCCESS.body}
      buttonText={APPLICANT_FORM_TEXT.SUCCESS.cta}
      buttonHandler={() => {
        router.push(BASE_LINK);
      }}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
