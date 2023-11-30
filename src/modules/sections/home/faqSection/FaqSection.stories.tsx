import FaqSection from '@/sections/home/faqSection/FaqSection';
import { mockFaqSectionProps } from '@/sections/home/faqSection/FaqSection.mocks';

export default { component: FaqSection };

export const Default = {
  args: { ...mockFaqSectionProps.base },
};
