import HeroSection from '@/sections/home/heroSection/HeroSection';
import { mockHeroSectionProps } from '@/sections/home/heroSection/HeroSection.mocks';

export default { component: HeroSection };

export const Default = {
  args: { ...mockHeroSectionProps.base },
};
