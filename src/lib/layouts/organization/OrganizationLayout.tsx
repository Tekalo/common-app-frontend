import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import Head from 'next/head';

export type IOrganizationLayout = React.ComponentPropsWithoutRef<'div'>;

const OrganizationLayout: React.FC<IOrganizationLayout> = ({
  children,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>Tekalo | Organizations</title>
      </Head>
      <div {...divProps}>
        <LiteNavbar title={'For organizations'} />
        <main className="flex pt-16 md:pt-20">{children}</main>
        <div className="m-auto" />
        <LiteFooter />
      </div>
    </>
  );
};

export default OrganizationLayout;
