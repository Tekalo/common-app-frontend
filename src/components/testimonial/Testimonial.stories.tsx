import Testimonial from './Testimonial';
import { mockTestimonialProps } from './Testimonial.mocks';

export default { component: Testimonial };

export const Default = {
  args: { ...mockTestimonialProps.base },
};
