import { HEAD_TEXT, NAV_BAR_TEXT, NAV_LITE_FOOTER_TEXT } from '@/lang/en';
import FormLayout from '@/lib/layouts/forms/FormLayout';

export type IOrganizationLayout = React.ComponentPropsWithoutRef<'div'>;

const OrganizationLayout: React.FC<IOrganizationLayout> = ({
  children,
  ...divProps
}) => {
  return (
    <FormLayout
      {...divProps}
      footerText={NAV_LITE_FOOTER_TEXT.RESERVED_RIGHTS}
      headerText={HEAD_TEXT.organizations}
      isEditing={false}
      title={NAV_BAR_TEXT.FOR_ORGS}
    >
      {children}
    </FormLayout>
  );
};

export default OrganizationLayout;
