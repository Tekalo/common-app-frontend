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
        <title>Primary Layout</title>
      </Head>
      <div {...divProps} className={`flex min-h-screen flex-col ${justify}`}>
        {/* <Header /> */}
        <div>Header</div>
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        {/* <Footer /> */}
        <div>Footer</div>
      </div>
    </>
  );
};

export default HomeLayout;
