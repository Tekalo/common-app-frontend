import Faq from '@/components/faq/Faq';
import { mockFaqProps } from '@/components/faq/Faq.mocks';

export default { component: Faq };

export const Default = {
  args: { ...mockFaqProps.base },
};
