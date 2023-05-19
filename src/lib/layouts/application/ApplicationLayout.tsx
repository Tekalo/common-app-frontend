import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import Head from 'next/head';

export type IApplicationLayout = React.ComponentPropsWithoutRef<'div'>;

const ApplicationLayout: React.FC<IApplicationLayout> = ({
  children,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>Tekalo | Candidates</title>
      </Head>
      <div {...divProps} className="flex h-screen flex-col justify-between">
        <LiteNavbar title={'For candidates'} />
        <main className="flex pt-16 md:pt-20">{children}</main>
        <LiteFooter />
      </div>
    </>
  );
};

export default ApplicationLayout;