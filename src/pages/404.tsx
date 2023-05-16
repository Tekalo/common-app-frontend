import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import ApplicationLayout from '@/lib/layouts/application/ApplicationLayout';
import { NextPageWithLayout } from '@/lib/types';
import { useRouter } from 'next/router';

const Page404: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <div className="m-auto max-w-[390px] px-6 pb-32 pt-20 text-center md:max-w-[224px] md:px-0 md:pt-24 lg:max-w-[544px]">
      <div className="mb-6 font-display text-h2-mobile">404</div>
      <div className="text-p1-mobile">Sorry, we couldn’t find this page.</div>
      <Button
        className="m-auto mt-8 w-full px-7 lg:w-auto"
        variant={ButtonVariant.OUTLINED}
        label="Back to home"
        onClick={() => router.push('/')}
      />
    </div>
  );
};

export default Page404;

Page404.getLayout = (page) => {
  return <ApplicationLayout>{page}</ApplicationLayout>;
};
