import MainFooter from '@/components/navigation/MainFooter/MainFooter';
import MainNavbar from '@/components/navigation/MainNavbar/MainNavbar';
import Head from 'next/head';

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const HomeLayout: React.FC<IHomeLayout> = ({
  children,
  justify = 'items-center',
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>CommonApp</title>
      </Head>
      <div
        {...divProps}
        className={`flex min-h-screen max-w-[1440px] flex-col ${justify}`}
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
