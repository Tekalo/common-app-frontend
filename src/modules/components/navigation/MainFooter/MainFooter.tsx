import Link from 'next/link';

export interface IMainFooter {}

const MainFooter: React.FC<IMainFooter> = () => {
  const linkBlocks = [
    {
      header: 'Candidates',
      links: [
        { title: 'Get started', href: '/sign-up/applicants' },
        { title: 'Log in', href: '#' },
      ],
    },
    {
      header: 'Organizations',
      links: [{ title: 'Apply', href: '#' }],
    },
    {
      header: 'About',
      links: [
        { title: 'Contact Us', href: '#' },
        { title: 'Privacy Info', href: '/privacy-info' },
        { title: 'Terms of Use', href: '/terms-and-conditions' },
      ],
    },
  ];

  return (
    <>
      <section className="bg-gray-4 px-6 pt-10 text-center md:px-12 md:pb-32 lg:px-40 lg:py-20">
        <div className="mx-auto flex flex-col md:flex-row md:items-start md:justify-between lg:max-w-content-area lg:justify-between">
          {/* Logo */}
          <div className="mb-14 items-center md:flex md:flex-none">
            <img
              src="/images/logo_footer.png"
              alt="Tekalo Logo"
              className="w-auto"
            />
          </div>
          {/* footer links container  */}
          <div className="flex flex-wrap md:mt-0 md:flex-nowrap">
            {linkBlocks.map((block, i) => {
              return (
                /* footer link block */
                <div
                  key={i}
                  className="mb-6 min-w-[148px] text-left md:mb-0 md:mr-6 md:min-w-[105px]"
                >
                  <div className="mb-4 text-small-caption-mobile uppercase text-gray-1">
                    {block.header}
                  </div>
                  {/* footer link */}
                  <div className="text-component-large text-black-text">
                    {block.links.map((link, j) => {
                      return (
                        <Link key={`${i}${j}`} href={link.href}>
                          <div className="mb-4">{link.title}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col justify-center bg-gray-3 py-4 text-center align-middle text-component-extra-small text-gray-1 md:flex-row md:gap-x-1 md:text-component-small">
        <span>{'© Futures Action Network, LLC'}</span>
        <span>2023. All Rights Reserved.</span>
      </section>
    </>
  );
};

export default MainFooter;
