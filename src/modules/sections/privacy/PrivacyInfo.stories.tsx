import PrivacyInfo from '@/sections/privacy/PrivacyInfo';
import { mockPrivacyInfoProps } from '@/sections/privacy/PrivacyInfo.mocks';

export default { component: PrivacyInfo };

export const Default = {
  args: { ...mockPrivacyInfoProps.base },
};
