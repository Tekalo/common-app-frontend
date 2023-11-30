import HomeLayout from '@/layouts/home/HomeLayout';
import { mockHomeLayoutProps } from '@/layouts/home/HomeLayout.mocks';

export default { component: HomeLayout };

export const Default = {
  args: { ...mockHomeLayoutProps.base },
};
