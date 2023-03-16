import Testimonial from '@/components/testimonial/Testimonial';

export interface ITestimonials {}

const Testimonials: React.FC<ITestimonials> = () => {
  return (
    <section className="bg-light-organge-bg">
      {/* TITLE */}
      <div className="pt-20 text-center font-display text-desktop-lg-caption uppercase text-gray-1-darkest">
        Tech talent solving impactful problems
      </div>
      {/* STAR ICON */}
      <div className="pt-1 pl-44">
        <img
          src="/images/Star.png"
          alt="Star"
          className="h-[107px] w-[107px] object-cover"
        />
      </div>
      {/* TESTIMONIAL */}
      <div className="h-[337px]">
        <Testimonial />
      </div>
      {/* SWOOP ICON */}
      <div className="pt-1 pl-[605px]">
        <img
          src="/images/Swoop.png"
          alt="Swoop"
          className="h-[30px] w-[30px] object-cover"
        />
      </div>
      {/* TODO: CAROUSEL + SLIDER CONTROL */}
      <div className="pt-16"></div>
    </section>
  );
};

export default Testimonials;
