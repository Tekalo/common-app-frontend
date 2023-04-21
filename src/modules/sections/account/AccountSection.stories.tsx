import AccountSection from '@/sections/account/AccountSection';
import { mockAccountSectionProps } from './AccountSection.mocks';

export default { component: AccountSection };

export const Default = {
  args: { ...mockAccountSectionProps.base },
};

export const ApplicationSubmitted = {
  args: { ...mockAccountSectionProps.submitted },
};

export const MatchesPaused = {
  args: { ...mockAccountSectionProps.paused },
};
