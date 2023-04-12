export interface IPrivacyTable {
  // We need to know the padding on the right side
  // of the table so we can make it flush to the screen side
  padding: string;
}

const PrivacyTable: React.FC<IPrivacyTable> = ({ padding }) => {
  const tableData = {
    headers: [
      {
        heading: '',
        subheading: '',
      },
      {
        heading: 'Data Type',
        subheading: 'What info we collect',
      },
      {
        heading: 'Uses',
        subheading: 'How we use the info',
      },
      {
        heading: 'Third Parties',
        subheading: 'Who can see the info',
      },
    ],
    content: [
      {
        heading: 'Info You provide',
        bullets: [
          ['Personal Info', 'Professional Info', 'Communications', 'Surveys'],
          [
            'Identify you and Operate [Name]',
            'Conduct Research and improve [Name]',
          ],
          ['Users', 'Other Matchmakers and Organziations', 'Service Providers'],
        ],
      },
      {
        heading: 'Info we observe',
        bullets: [
          [
            'Technical info (eg; browser device, IP, trackers, server logs)',
            'Usage and outcomes',
          ],
          [
            'Quality of Service',
            'Security',
            'Conduct Research and improve [Name]',
          ],
          ['Service Providers'],
        ],
      },
      {
        heading: 'Other sources',
        bullets: [
          [
            'Programs from Third-Party organizations',
            'Other Schmidt Futures Programs',
          ],
          ['Enable applicants to other programs to utilize [Name]'],
          ['Users', 'Matchmakers', 'Organizations', 'Service Providers'],
        ],
      },
    ],
  };

  return (
    <div
      className={`mt-8 overflow-x-scroll pr-2 md:mt-3 md:overflow-x-hidden`}
      style={{ width: `calc(100% + ${padding})` }}
    >
      <table className="m-auto mb-4 w-[664px] border-separate border-spacing-x-0 border-spacing-y-[1px] rounded-md border-x border-gray-3 bg-gray-3">
        <thead>
          <tr className="bg-gray-4">
            {tableData.headers.map((header, i) => (
              <th key={i} className="py-4 text-left">
                <div className="text-small-caption-mobile uppercase text-gray-1">
                  {header.heading}
                </div>
                <div className="text-component-small">{header.subheading}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.content.map((contentRow, i) => (
            <tr key={i} className="bg-white">
              <td className="px-4 py-3 text-left align-top text-small-caption-mobile uppercase text-gray-1">
                {contentRow.heading}
              </td>
              {contentRow.bullets.map((bulletList, i) => (
                <td
                  key={i}
                  className="px-4 py-3 text-left align-top text-component-extra-small"
                >
                  <ul className="list-disc pl-2 leading-6">
                    {bulletList.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrivacyTable;
