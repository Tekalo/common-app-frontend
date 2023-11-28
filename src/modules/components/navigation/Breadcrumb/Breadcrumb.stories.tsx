import Breadcrumb from '@/components/navigation/Breadcrumb/Breadcrumb';
import { mockBreadcrumbProps } from '@/components/navigation/Breadcrumb/Breadcrumb.mocks';

export default { component: Breadcrumb };

export const Default = {
  args: { ...mockBreadcrumbProps.base },
};
