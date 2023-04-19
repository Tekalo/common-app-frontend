import { IRankChoice } from './RankChoice';

const label =
  'Rank the causes you would be interested in working on with 1 being the highest.';
const name = 'causes';

const base: IRankChoice = {
  label,
  name,
  rankOptions: [
    { text: 'Climate Change', value: 'climate' },
    { text: 'Environment', value: 'environment' },
    { text: 'Human rights & social equality', value: 'humanRights' },
    { text: 'International Development', value: 'intDev' },
  ],
};

const empty: IRankChoice = {
  ...base,
  rankOptions: [],
};

const one: IRankChoice = {
  ...base,
  rankOptions: [{ text: 'Climate Change', value: 'climate' }],
};

const two: IRankChoice = {
  ...base,
  rankOptions: [
    { text: 'Climate Change', value: 'climate' },
    { text: 'Environment', value: 'environment' },
  ],
};

export const mockRankChoiceProps = {
  base,
  empty,
  one,
  two,
};
