import Head from 'next/head';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  justify = 'items-center',
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>Primary Layout</title>
      </Head>
      <div {...divProps} className={`flex min-h-screen flex-col ${justify}`}>
        {/* <Header /> */}
        <section>Header</section>
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        {/* <Footer /> */}
        <section>Footer</section>
      </div>
    </>
  );
};

export default PrimaryLayout;
