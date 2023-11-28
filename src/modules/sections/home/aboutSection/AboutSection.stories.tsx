import AboutSection from '@/sections/home/aboutSection/AboutSection';
import { mockAboutSectionProps } from '@/sections/home/aboutSection/AboutSection.mocks';

export default { component: AboutSection };

export const Default = {
  args: { ...mockAboutSectionProps.base },
};
