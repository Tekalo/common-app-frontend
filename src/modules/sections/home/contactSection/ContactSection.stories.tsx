import ContactSection from '@/sections/home/contactSection/ContactSection';
import { mockContactSectionProps } from '@/sections/home/contactSection/ContactSection.mocks';

export default { component: ContactSection };

export const Default = {
  args: { ...mockContactSectionProps.base },
};
