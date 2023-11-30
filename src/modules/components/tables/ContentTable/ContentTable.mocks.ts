import { IContentTable } from '@/components/tables/ContentTable/ContentTable';
import { ContentTableData } from '@/lib/types';

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
