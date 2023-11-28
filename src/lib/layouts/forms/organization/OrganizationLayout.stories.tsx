import OrganizationLayout from '@/layouts/forms/organization/OrganizationLayout';
import { mockLayoutProps } from '@/layouts/forms/organization/OrganizationLayout.mocks';

export default { component: OrganizationLayout };

export const Default = {
  args: { ...mockLayoutProps.base },
};
