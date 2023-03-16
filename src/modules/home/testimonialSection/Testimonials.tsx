export interface ITestimonials {
  sampleTextProp: string;
}

const Testimonials: React.FC<ITestimonials> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default Testimonials;
