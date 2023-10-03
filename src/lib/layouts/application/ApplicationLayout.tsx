import LiteFooter from '@/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/components/navigation/LiteNavbar/LiteNavbar';
import { HEAD_TEXT, NAV_BAR_TEXT, NAV_LITE_FOOTER_TEXT } from '@/lang/en';
import Head from 'next/head';

export interface IApplicationLayout
  extends React.ComponentPropsWithoutRef<'div'> {
  isEditing?: boolean;
}

const ApplicationLayout: React.FC<IApplicationLayout> = ({
  children,
  isEditing = false,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>{HEAD_TEXT.candidates}</title>
      </Head>
      <div {...divProps} className="flex h-screen flex-col justify-between">
        <LiteNavbar isEditing={isEditing} title={NAV_BAR_TEXT.FOR_CANDIDATES} />
        <main className="flex pt-16 md:pt-20">{children}</main>
        <LiteFooter
          footerText={NAV_LITE_FOOTER_TEXT.RESERVED_RIGHTS}
          links={NAV_LITE_FOOTER_TEXT.LINK_BLOCKS}
        />
      </div>
    </>
  );
};

export default ApplicationLayout;
