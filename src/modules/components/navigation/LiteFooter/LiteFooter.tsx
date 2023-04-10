export interface ILiteFooter {}

const LiteFooter: React.FC<ILiteFooter> = () => {
  return (
    <section className="w-full bg-gray-4">
      <div className="px-8 pb-10 pt-8 md:px-20 md:pb-24 md:pt-12 lg:px-0">
        <div className="m-auto flex max-w-content-area flex-row flex-wrap items-start gap-x-14 gap-y-8 md:items-center md:justify-between">
          {/* Logo */}
          <div className="items-center rounded-lg bg-gray-3 px-16 py-3 text-white">
            <div>LOGO</div>
          </div>
          {/* Menu Col 1 */}
          <div className="flex flex-col justify-between space-y-4 font-sans text-component-small text-black-text md:flex-row md:space-x-6 md:space-y-0">
            <div className="flex-none">Privacy Policy</div>
            <div className="flex-none">Terms of Service</div>
            <div className="flex-none">© All Rights Reserved</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiteFooter;
