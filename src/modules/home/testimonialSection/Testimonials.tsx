import Testimonial from '@/components/testimonial/Testimonial';

export interface ITestimonials {}

const Testimonials: React.FC<ITestimonials> = () => {
  return (
    <section className="bg-light-orange">
      {/* TITLE */}
      <div className="pt-20 text-center font-display text-desktop-lg-caption uppercase text-gray-1">
        Tech talent solving impactful problems
      </div>
      {/* FIXME: Honestly this approach is bad. I'm going to refactor it.
      
      In short, I want to create a single testimonial object that contains the image, quote, attribution and star/swoop icons. 

      Then I want to create totally separate carousel component that takes in an array of react elements and does the state configuration

      TODO: Carousel component that can carousel different objects
      TODO: Wrap all images (star and swoop icon) in a testimonial 
      TODO: Plug them into this area 

      testimonials = [
        {
          image: "/path/to/src",
          quote: "Some quote thing",
          attribution: "So-and-So"
        }
      ]

      <Carousel ...props>
        { testimonials.map((props, i) => (<Testimonial ...props />))}
      <Carousel />
      ~~~

      */}
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
