import Layout from '@/lib/templates/layout/Layout';
import { mockLayoutProps } from '@/lib/templates/layout/Layout.mocks';

export default { component: Layout };

export const Default = {
  args: { ...mockLayoutProps.base },
};
