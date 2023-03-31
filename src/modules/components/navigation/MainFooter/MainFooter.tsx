import Link from 'next/link';

export interface IMainFooter {}

const MainFooter: React.FC<IMainFooter> = () => {
  return (
    <>
      <section className="grid w-full grid-cols-12 gap-8 bg-gray-4 px-40 pt-20 pb-20 text-center">
        {/* Logo */}
        <div className="col-span-2 row-span-1 flex flex-col items-center rounded-lg bg-gray-3 py-3 px-16 text-white">
          <div>LOGO</div>
        </div>
        {/* Menu Col 1 */}
        <div className="col-span-2 col-start-6 row-span-3 flex flex-col  text-left">
          <div className="text-small-caption-desktop uppercase text-gray-1">
            Candidates
          </div>
          <div className="space-y-4 pt-6 text-component-large text-black-text">
            <Link href={'/sign-up/applicants'}>
              <div className="">Get started</div>
            </Link>
            <div className="">Log in</div>
          </div>
        </div>
        {/* Menu Col 2 */}
        <div className="col-span-2 row-span-3 flex flex-col text-left">
          <div className="text-small-caption-desktop uppercase text-gray-1">
            Organizations
          </div>
          <div className="space-y-4 pt-6 text-component-large text-black-text">
            <div className="">Apply</div>
          </div>
        </div>
        {/* Menu Col 3 */}
        <div className="col-span-2 row-span-3 flex flex-col text-left">
          <div className="text-small-caption-desktop uppercase text-gray-1">
            About
          </div>
          <div className="space-y-4 pt-6 text-component-large text-black-text">
            <div className="">Contact Us</div>
            <div className="">Privacy Info</div>
            <div className="">Terms & Conditions</div>
          </div>
        </div>
      </section>
      <section className="grid w-full place-items-center justify-center bg-gray-3 py-3 text-center align-middle text-component-small text-gray-1">
        © 2023 All Rights Reserved
      </section>
    </>
  );
};

export default MainFooter;
