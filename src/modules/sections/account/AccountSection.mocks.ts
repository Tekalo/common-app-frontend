import { ICandidateAccountSection } from '@/sections/account/AccountSection';

const base: ICandidateAccountSection = {
  applicationSubmitted: false,
  matchesPaused: false,
};

const submitted: ICandidateAccountSection = {
  applicationSubmitted: true,
  matchesPaused: false,
};

const paused: ICandidateAccountSection = {
  applicationSubmitted: true,
  matchesPaused: true,
};

export const mockAccountSectionProps = {
  base,
  submitted,
  paused,
};
