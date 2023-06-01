import MainFooter from '@/components/navigation/MainFooter/MainFooter';
import MainNavbar from '@/components/navigation/MainNavbar/MainNavbar';
import { HEAD_TEXT } from '@/lang/en';
import Head from 'next/head';

export interface IHomeLayout extends React.ComponentPropsWithoutRef<'div'> {
  pageName: string;
}

const HomeLayout: React.FC<IHomeLayout> = ({
  pageName,
  children,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>{HEAD_TEXT.home}</title>
      </Head>
      <div
        {...divProps}
        className={`flex min-h-screen min-w-full flex-col items-stretch`}
      >
        <MainNavbar pageName={pageName} />
        <main className="pt-16 md:pt-20">{children}</main>
        <MainFooter />
      </div>
    </>
  );
};

export default HomeLayout;
