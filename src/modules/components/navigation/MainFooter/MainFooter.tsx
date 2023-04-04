import Link from 'next/link';

export interface IMainFooter {}

const MainFooter: React.FC<IMainFooter> = () => {
  const linkSections = [
    {
      header: 'Candidates',
      links: [
        {
          title: 'Get started',
          href: '/sign-up/applicants',
        },
        {
          title: 'Log in',
          href: '#',
        },
      ],
    },
    {
      header: 'Organizations',
      links: [
        {
          title: 'Apply',
          href: '#',
        },
      ],
    },
    {
      header: 'About',
      links: [
        {
          title: 'Contact Us',
          href: '#',
        },
        {
          title: 'Privacy Info',
          href: '#',
        },
        {
          title: 'Terms of Use',
          href: '#',
        },
      ],
    },
  ];
  return (
    <>
      <section className="flex flex-col bg-gray-4 px-6 py-10 text-center md:px-20 lg:flex-row lg:items-start lg:justify-between lg:px-40 lg:py-20">
        {/* Logo */}
        <div className="w-56 items-center rounded-lg bg-gray-3 px-16 py-3 text-white">
          <div>LOGO</div>
        </div>
        <div className="footer-links lg:ml- mt-8 flex flex-wrap lg:mt-0">
          {linkSections.map((block, i) => {
            return (
              <div
                key={i}
                className="footer-link-block mb-12 mr-9 text-left sm:mr-12 md:mr-20"
              >
                <div className="mb-4 text-small-caption-mobile uppercase text-gray-1">
                  {block.header}
                </div>
                <div className="footer-link text-component-large text-black-text">
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
      </section>
      <section className="grid w-full place-items-center justify-center bg-gray-3 py-3 text-center align-middle text-component-small text-gray-1">
        © 2023 All Rights Reserved
      </section>
    </>
  );
};

export default MainFooter;
