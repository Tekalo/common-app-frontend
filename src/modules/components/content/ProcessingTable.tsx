const ProcessingTable: React.FC = () => {
  const tableData = {
    headers: ['Data processing activity', 'Lawful Basis'],
    content: [
      {
        activity: 'Identify you and operate [Name]',
        basis: (
          <>
            Contractual necessity
            <br />
            (You agree to our Terms of Service, whereby we collect your info,
            review it, and connect you with the opportunities you&apos;ve
            requested.)
          </>
        ),
      },
      {
        activity: 'Conduct Research and Improve [Name]',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We collect feedback and analyze metrics and outcomes so that we can
            show our impact and improve Name.),
          </>
        ),
      },
      {
        activity: 'Maintain Quality of Service and Security',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We use data to help provide a secure and well-running service.),
          </>
        ),
      },
      {
        activity: 'Target and Measure Ads Promoting [Name]',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We may use data to help target ads promoting Name and to measure
            the effectiveness of those ads.),
          </>
        ),
      },
      {
        activity: 'Send Marketing Emails',
        basis: (
          <>
            Consent
            <br />
            (We&apos;ll only send you emails about other stuff if you opt in.),
          </>
        ),
      },
      {
        activity: 'Share Your Info with Matchmakers and Service Providers',
        basis: (
          <>
            Legitimate Interests
            <br />
            (We share your info with vetted matchmaking organizations and
            vendors, with whom we have appropriate written agreements, to help
            us operate Name.),
          </>
        ),
      },
      {
        activity: 'Share Your Info with Organizations',
        basis: (
          <>
            Consent
            <br />
            (We ask for your permission to share your info with Organizations so
            that you&apos;re only contacted by ones you&apos;re actually
            interested in.),
          </>
        ),
      },
      {
        activity: 'Others',
        basis: (
          <>
            We can&apos;t imagine every possible scenario, so if we need to use
            your data for another purpose, we&apos;ll let you know!
          </>
        ),
      },
    ],
  };

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

export default ProcessingTable;
