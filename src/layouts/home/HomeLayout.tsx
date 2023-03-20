import MainFooter from '@/components/navigation/MainFooter/MainFooter';
import MainNavbar from '@/components/navigation/MainNavbar/MainNavbar';
import Head from 'next/head';

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> {}

const HomeLayout: React.FC<IHomeLayout> = ({ children, ...divProps }) => {
  return (
    <>
      <Head>
        <title>CommonApp</title>
      </Head>
      <div
        {...divProps}
        className={`flex min-h-screen min-w-full max-w-screen-xl flex-col items-stretch`}
      >
        <MainNavbar />
        <main>{children}</main>
        <div className="m-auto" />
        <MainFooter sampleTextProp="FOOTER TODO" />
      </div>
    </>
  );
};

export default HomeLayout;
