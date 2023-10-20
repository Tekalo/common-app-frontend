import { NAV_LITE_FOOTER_TEXT } from '@/lang/en';
import LiteFooter from '@/modules/components/navigation/LiteFooter/LiteFooter';
import LiteNavbar from '@/modules/components/navigation/LiteNavbar/LiteNavbar';
import Head from 'next/head';

interface IFormLayout extends React.ComponentPropsWithoutRef<'div'> {
  isEditing?: boolean;
  title: string;
  headerText: string;
  footerText: string;
}

const FormLayout: React.FC<IFormLayout> = ({
  children,
  isEditing = false,
  title,
  headerText,
  footerText,
  ...divProps
}) => (
  <>
    <Head>
      <title>{headerText}</title>
    </Head>
    <div {...divProps} className="flex h-screen flex-col justify-between">
      <LiteNavbar isEditing={isEditing} title={title} />
      <main className="flex pt-16 md:pt-20">{children}</main>
      <LiteFooter
        footerText={footerText}
        links={NAV_LITE_FOOTER_TEXT.LINK_BLOCKS}
      />
    </div>
  </>
);

export default FormLayout;
