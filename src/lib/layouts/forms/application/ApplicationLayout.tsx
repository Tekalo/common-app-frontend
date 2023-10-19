import { HEAD_TEXT, NAV_BAR_TEXT, NAV_LITE_FOOTER_TEXT } from '@/lang/en';
import FormLayout from '../FormLayout';

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
    <FormLayout
      {...divProps}
      footerText={NAV_LITE_FOOTER_TEXT.RESERVED_RIGHTS}
      headerText={HEAD_TEXT.candidates}
      isEditing={isEditing}
      title={NAV_BAR_TEXT.FOR_CANDIDATES}
    >
      {children}
    </FormLayout>
  );
};

export default ApplicationLayout;
