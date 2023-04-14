import { BasisTableData } from '@/lib/types';
import { IBasisTable } from './BasisTable';

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
