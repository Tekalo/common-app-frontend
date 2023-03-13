import Hero from './Hero';
import { mockHeroProps } from './Hero.mocks';

export default { component: Hero };

export const Default = {
  args: { ...mockHeroProps.base },
};
