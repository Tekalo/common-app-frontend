import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import Head from 'next/head';

export interface ILayout extends React.ComponentPropsWithoutRef<'div'> {}

const Layout: React.FC<ILayout> = ({ children, ...divProps }) => {
  return (
    <>
      <Head>
        <title>Application Layout</title>
      </Head>
      <div
        {...divProps}
        className={`flex min-h-screen min-w-full max-w-screen-xl flex-col items-stretch`}
      >
        {/* TODO: Figure out how to pass the text to the navbar */}
        <LiteNavbar />
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        <LiteFooter />
      </div>
    </>
  );
};

export default Layout;
