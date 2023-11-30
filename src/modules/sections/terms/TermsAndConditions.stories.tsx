import TermsAndConditions from '@/sections/terms/TermsAndConditions';
import { mockTermsProps } from '@/sections/terms/TermsAndConditions.mocks';

export default { component: TermsAndConditions };

export const Default = {
  args: { ...mockTermsProps.base },
};
