import { ICandidateAccountSection } from '@/sections/account/AccountSection';

const base: ICandidateAccountSection = {
  matchesPaused: false,
};

const submitted: ICandidateAccountSection = {
  matchesPaused: false,
};

const paused: ICandidateAccountSection = {
  matchesPaused: true,
};

export const mockAccountSectionProps = {
  base,
  submitted,
  paused,
};
