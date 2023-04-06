export interface ITestimonialSection {}

const TestimonialSection: React.FC<ITestimonialSection> = () => {
  return (
    <section className="bg-light-orange">
      {/* TITLE */}
      <div className="m-auto max-w-content-area px-7 pb-10 pt-14 md:px-24 md:pb-14 lg:pb-20 lg:pt-40">
        <div className="text-center font-display text-large-caption-desktop uppercase text-gray-1 md:text-large-caption-mobile lg:text-large-caption-desktop">
          Tech talent solving impactful problems lorem ipsum
        </div>

        <div className="relative m-auto mt-10 max-w-[320px] md:max-w-[428px] lg:max-w-[640px]">
          <div className="flex h-0 items-center justify-center bg-gray-2 pt-[67%]"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
