import { IBasisTable } from '@/components/tables/BasisTable/BasisTable';
import { BasisTableData } from '@/lib/types';

const basisTableData: BasisTableData = {
  headers: ['Foo'],
  content: [
    {
      activity: 'Bar',
      basis: 'Doz',
    },
  ],
};

const base: IBasisTable = {
  tableData: basisTableData,
};

export const mockProps = {
  base,
};
