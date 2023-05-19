import MainFooter from '@/components/navigation/MainFooter/MainFooter';
import MainNavbar from '@/components/navigation/MainNavbar/MainNavbar';
import Head from 'next/head';

export type IHomeLayout = React.ComponentPropsWithoutRef<'div'>;

const HomeLayout: React.FC<IHomeLayout> = ({ children, ...divProps }) => {
  return (
    <>
      <Head>
        <title>Tekalo | Do Good</title>
      </Head>
      <div
        {...divProps}
        className={`flex min-h-screen min-w-full flex-col items-stretch`}
      >
        <MainNavbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <MainFooter />
      </div>
    </>
  );
};

export default HomeLayout;
