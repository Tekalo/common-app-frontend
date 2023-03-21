import Testimonials from './Testimonials';
import { mockTestimonialsProps } from './Testimonials.mocks';

export default { component: Testimonials };

export const Default = {
  args: { ...mockTestimonialsProps.base },
};
