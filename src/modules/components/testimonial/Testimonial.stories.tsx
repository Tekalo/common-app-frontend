import Testimonial from '@/components/testimonial/Testimonial';
import { mockTestimonialProps } from '@/components/testimonial/Testimonial.mocks';

export default { component: Testimonial };

export const Default = {
  args: { ...mockTestimonialProps.base },
};
