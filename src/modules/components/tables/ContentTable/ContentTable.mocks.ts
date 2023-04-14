import { ContentTableData, TablePadding } from '@/lib/types';
import { IContentTable } from './ContentTable';

const basisTableData: ContentTableData = {
  headers: [
    {
      heading: 'Foo',
      subheading: 'Zardos',
    },
  ],
  content: [
    {
      heading: 'Bar',
      bullets: [['Doz'], ['Daz']],
    },
  ],
};

const base: IContentTable = {
  padding: TablePadding.SIX,
  tableData: basisTableData,
};

export const mockProps = {
  base,
};
