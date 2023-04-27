import { ContentTableData } from '@/lib/types';
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
  className: 'w-[calc(100%+24px)]',
  tableData: basisTableData,
};

export const mockProps = {
  base,
};
