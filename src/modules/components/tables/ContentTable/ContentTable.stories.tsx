import ContentTable from './ContentTable';
import { mockProps } from './ContentTable.mocks';

export default {
  component: ContentTable,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: { ...mockProps.base },
};
