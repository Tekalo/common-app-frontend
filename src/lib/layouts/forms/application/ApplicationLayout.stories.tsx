import ApplicationLayout from '@/layouts/forms/application/ApplicationLayout';
import { mockLayoutProps } from '@/layouts/forms/application/ApplicationLayout.mocks';

export default { component: ApplicationLayout };

export const Default = {
  args: { ...mockLayoutProps.base },
};
