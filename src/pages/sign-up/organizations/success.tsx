import SuccessSection from '@/components/info/successSection/SuccessSection';
import { BASE_LINK, ORG_FORM_TEXT } from '@/lang/en/en';
import OrganizationLayout from '@/lib/layouts/forms/organization/OrganizationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { useRouter } from 'next/router';

const ApplicantSuccess: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <SuccessSection
      title={ORG_FORM_TEXT.SUCCESS.title}
      body={ORG_FORM_TEXT.SUCCESS.body}
      buttonText={ORG_FORM_TEXT.SUCCESS.cta}
      buttonHandler={() => router.push(BASE_LINK)}
    />
  );
};

export default ApplicantSuccess;

ApplicantSuccess.getLayout = (page) => {
  return <OrganizationLayout>{page}</OrganizationLayout>;
};
