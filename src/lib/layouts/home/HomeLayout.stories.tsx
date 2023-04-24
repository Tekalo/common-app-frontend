import HomeLayout from './HomeLayout';
import { mockHomeLayoutProps } from './HomeLayout.mocks';

export default { component: HomeLayout };

export const Default = {
  args: { ...mockHomeLayoutProps.base },
};
