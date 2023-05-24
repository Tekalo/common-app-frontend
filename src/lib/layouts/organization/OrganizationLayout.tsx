import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import { HEAD_TEXT } from '@/lang/en';
import Head from 'next/head';

export type IOrganizationLayout = React.ComponentPropsWithoutRef<'div'>;

const OrganizationLayout: React.FC<IOrganizationLayout> = ({
  children,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>{HEAD_TEXT.organizations}</title>
      </Head>
      <div {...divProps} className="flex h-screen flex-col justify-between">
        <LiteNavbar title={'For organizations'} />
        <main className="flex pt-16 md:pt-20">{children}</main>
        <div className="m-auto" />
        <LiteFooter />
      </div>
    </>
  );
};

export default OrganizationLayout;
