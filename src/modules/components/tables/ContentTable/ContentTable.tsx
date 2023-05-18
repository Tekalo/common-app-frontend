import { ContentTableData } from '@/lib/types';

export interface IContentTable {
  // We need to know the padding on the right side
  // of the table so we can make it flush to the screen side
  className: string;
  tableData: ContentTableData;
}

const ContentTable: React.FC<IContentTable> = ({
  className: padding,
  tableData,
}) => {
  return (
    <div
      className={`mt-8 overflow-x-scroll ${padding} pr-2 md:mt-3 md:overflow-x-hidden md:pr-0`}
    >
      <table className="m-auto mb-4 w-[664px] border-separate border-spacing-x-0 border-spacing-y-[1px] rounded border-x border-gray-3 bg-gray-3">
        <thead className="rounded-t">
          <tr className="rounded-t bg-gray-4">
            {tableData.headers.map((header, i) => {
              const tlPadding = i === 0 ? 'rounded-tl' : '';
              const trPadding = i === 3 ? 'rounded-tr' : '';

              return (
                <th
                  key={i}
                  className={`py-4 text-left ${tlPadding} ${trPadding}`}
                >
                  <div className="font-display text-small-caption-mobile uppercase text-gray-1">
                    {header.heading}
                  </div>
                  <div className="text-component-small">
                    {header.subheading}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="rounded-b">
          {tableData.content.map((contentRow, rowI) => {
            const blRadius = rowI === 2 ? 'rounded-bl' : '';

            return (
              <tr
                key={rowI}
                className={`bg-white ${rowI === 2 ? 'rounded-b' : ''}`}
              >
                <td
                  className={`max-w-[99px] px-4 py-3 text-left align-top font-display text-small-caption-mobile uppercase text-gray-1 ${blRadius}`}
                >
                  {contentRow.heading}
                </td>
                {contentRow.bullets.map((bulletList, colI) => {
                  const brRadius = rowI === 2 && colI === 2 ? 'rounded-br' : '';

                  return (
                    <td
                      key={colI}
                      className={`max-w-[150px] px-4 py-3 text-left align-top text-p3-mobile ${brRadius}`}
                    >
                      <ul className="list-disc pl-2 leading-6">
                        {bulletList.map((bp, i) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
