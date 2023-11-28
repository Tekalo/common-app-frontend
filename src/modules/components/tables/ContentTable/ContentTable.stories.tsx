import ContentTable from '@/components/tables/ContentTable/ContentTable';
import { mockProps } from '@/components/tables/ContentTable/ContentTable.mocks';

export default {
  component: ContentTable,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: { ...mockProps.base },
};
