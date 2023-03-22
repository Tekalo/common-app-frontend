import Layout from './ApplicationLayout';
import { mockLayoutProps } from './ApplicationLayout.mocks';

export default { component: Layout };

export const Default = {
  args: { ...mockLayoutProps.base },
};
