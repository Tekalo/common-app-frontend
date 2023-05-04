import { PRIVACY_LINK, TERMS_LINK } from '@/lib/constants/text';
import Link from 'next/link';

export interface ILiteFooter {}

const LiteFooter: React.FC<ILiteFooter> = () => {
  return (
    <section className="w-full bg-gray-4">
      <div className="px-8 pb-10 pt-14 md:px-20 md:pb-24 md:pt-12 lg:px-0">
        <div className="m-auto flex max-w-content-area flex-col flex-wrap items-start gap-x-14 gap-y-7 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <div className="">
            <img
              src="/images/logo_lite_footer.png"
              alt="Tekalo Logo"
              className="max-w-[65px] py-1 md:max-w-[none]"
            />
          </div>
          {/* Menu Col 1 */}
          <div className="flex flex-col justify-between space-y-4 font-sans text-component-small text-black-text md:flex-row md:space-x-6 md:space-y-0">
            <div className="flex-none lg:underline">
              <Link href={PRIVACY_LINK}>Privacy Info</Link>
            </div>
            <div className="flex-none lg:underline">
              <Link href={TERMS_LINK}>Terms of Use</Link>
            </div>
            <div className="flex-none">© All Rights Reserved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiteFooter;
