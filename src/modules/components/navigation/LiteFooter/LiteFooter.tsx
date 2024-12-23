import Image from 'next/image';
import Link from 'next/link';

export interface ILiteFooter {
  footerText: string;
  links: { text: string; href: string }[];
}

const LiteFooter: React.FC<ILiteFooter> = ({ footerText, links }) => {
  return (
    <footer className="w-full bg-gray-4">
      <div className="px-8 pb-10 pt-14 md:px-20 md:pb-24 md:pt-12 lg:px-0">
        <div className="m-auto flex max-w-content-area flex-col flex-wrap items-start gap-x-14 gap-y-7 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <div className="">
            <Image
              alt="Tekalo Logo"
              className="max-w-[65px] py-1"
              data-name="lite-footer-logo"
              height={60}
              src="/images/logo_lite_footer.png"
              width={129}
            />
          </div>
          {/* Menu Col 1 */}
          <div className="flex flex-col justify-between space-y-4 font-sans text-component-small text-black-text md:flex-row md:space-x-6 md:space-y-0">
            <>
              {links.map((linkData, i) => (
                <div
                  key={i}
                  data-name="lite-footer-link"
                  className="flex-none lg:underline"
                >
                  <Link href={linkData.href}>{linkData.text}</Link>
                </div>
              ))}
              <div className="flex-none" data-name="lite-footer-text">
                {footerText}
              </div>
            </>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LiteFooter;
