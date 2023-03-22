export interface ILiteFooter {}

const LiteFooter: React.FC<ILiteFooter> = () => {
  return (
    <section className="grid w-full grid-cols-12 gap-8 bg-gray-4 px-40 pt-20 pb-20 text-center">
      {/* Logo */}
      <div className="col-span-2 row-span-1 flex flex-col items-center rounded-lg bg-gray-3 py-3 px-16 text-white">
        <div>LOGO</div>
      </div>
      {/* Menu Col 1 */}
      <div className="col-span-6 col-start-7 flex flex-row justify-between text-center font-sans text-component-small text-black-text">
        <div className="">Privacy Policy</div>
        <div className="">Terms of Service</div>
        <div className="">© All Rights Reserved</div>
      </div>
    </section>
  );
};

export default LiteFooter;
