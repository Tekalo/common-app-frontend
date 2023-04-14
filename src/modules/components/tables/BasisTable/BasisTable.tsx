import { BasisTableData } from '@/lib/types';

export interface IBasisTable {
  tableData: BasisTableData;
}

const BasisTable: React.FC<IBasisTable> = ({ tableData }) => {
  return (
    <table className="mb-4 mt-8 w-full max-w-[640px] border-separate border-spacing-x-0 border-spacing-y-[1px] rounded-md border-x border-gray-3 bg-gray-3">
      <thead>
        <tr className="bg-gray-4">
          {tableData.headers.map((header, i) => (
            <th key={i} className="px-2 py-4 pr-8 text-left">
              <div className="text-small-caption-mobile uppercase text-gray-1">
                {header}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.content.map((contentRow, i) => (
          <tr key={i} className="bg-white">
            <td className="px-2 py-4 text-left align-top text-small-caption-mobile uppercase text-gray-1">
              {contentRow.activity}
            </td>
            <td
              key={i}
              className="px-2 py-4 text-left align-top text-component-extra-small"
            >
              <div>{contentRow.basis}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasisTable;
