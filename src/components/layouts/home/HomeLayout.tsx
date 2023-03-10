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
        className={`flex min-h-screen w-screen flex-col ${justify}`}
      >
        <MainNavbar />
        <main>{children}</main>
        <div className="m-auto" />
        {/* <Footer /> */}
        <div>Footer</div>
      </div>
    </>
  );
};

export default HomeLayout;
