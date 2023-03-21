import Head from 'next/head';

export interface ILayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const Layout: React.FC<ILayout> = ({
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
        <div>Layout Component</div>
        <main className="px-5">{children}</main>
        <div className="m-auto" />
        {/* <Footer /> */}
        <div>Layout Component</div>
      </div>
    </>
  );
};

export default Layout;
