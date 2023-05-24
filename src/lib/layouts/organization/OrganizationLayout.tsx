import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import { HEAD_TEXT, NAV_BAR_TEXT, NAV_LITE_FOOTER_TEXT } from '@/lang/en';
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
        <LiteNavbar title={NAV_BAR_TEXT.FOR_ORGS} />
        <main className="flex pt-16 md:pt-20">{children}</main>
        <div className="m-auto" />
        <LiteFooter
          footerText={NAV_LITE_FOOTER_TEXT.RESERVED_RIGHTS}
          links={NAV_LITE_FOOTER_TEXT.LINK_BLOCKS}
        />
      </div>
    </>
  );
};

export default OrganizationLayout;
