import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import Head from 'next/head';

export interface IApplicationLayout
  extends React.ComponentPropsWithoutRef<'div'> {}

const ApplicationLayout: React.FC<IApplicationLayout> = ({
  children,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>Application</title>
      </Head>
      <div {...divProps} className="flex min-w-full flex-col items-center">
        {/* TODO: Figure out how to pass the text to the navbar */}
        <LiteNavbar />
        <main className="flex pt-16 md:pt-20">{children}</main>
        <div className="m-auto" />
        <LiteFooter />
      </div>
    </>
  );
};

export default ApplicationLayout;
