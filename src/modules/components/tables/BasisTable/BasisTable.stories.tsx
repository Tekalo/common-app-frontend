import BasisTable from './BasisTable';
import { mockProps } from './BasisTable.mocks';

export default {
  component: BasisTable,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: { ...mockProps.base },
};
