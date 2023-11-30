import BasisTable from '@/components/tables/BasisTable/BasisTable';
import { mockProps } from '@/components/tables/BasisTable/BasisTable.mocks';

export default {
  component: BasisTable,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: { ...mockProps.base },
};
