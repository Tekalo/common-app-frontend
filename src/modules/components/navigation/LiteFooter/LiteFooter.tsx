export interface ILiteFooter {}

const LiteFooter: React.FC<ILiteFooter> = () => {
  return (
    <section className="w-full bg-gray-4">
      <div className="m-auto grid w-[1120px] max-w-[1120px] grid-flow-col grid-cols-12 justify-center gap-8  pt-20 pb-20 text-center">
        {/* Logo */}
        <div className="col-span-2 col-start-1 items-center rounded-lg bg-gray-3 py-3 px-16 text-white">
          <div>LOGO</div>
        </div>
        {/* Menu Col 1 */}
        <div className="col-span-5 col-start-8 flex flex-row items-center justify-between text-center font-sans text-component-small text-black-text">
          <div className="">Privacy Policy</div>
          <div className="">Terms of Service</div>
          <div className="">© All Rights Reserved</div>
        </div>
      </div>
    </section>
  );
};

export default LiteFooter;
