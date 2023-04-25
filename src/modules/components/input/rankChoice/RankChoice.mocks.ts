import { IRankChoice } from './RankChoice';

const label =
  'Rank the causes you would be interested in working on with 1 being the highest.';
const name = 'causes';

const base: IRankChoice = {
  label,
  name,
  rankOptions: [
    { displayText: 'Climate Change', value: 'climate' },
    { displayText: 'Environment', value: 'environment' },
    { displayText: 'Human rights & social equality', value: 'humanRights' },
    { displayText: 'International Development', value: 'intDev' },
  ],
  setValue: () => void {},
};

const empty: IRankChoice = {
  ...base,
  rankOptions: [],
};

const one: IRankChoice = {
  ...base,
  rankOptions: [{ displayText: 'Climate Change', value: 'climate' }],
};

const two: IRankChoice = {
  ...base,
  rankOptions: [
    { displayText: 'Climate Change', value: 'climate' },
    { displayText: 'Environment', value: 'environment' },
  ],
};

export const mockRankChoiceProps = {
  base,
  empty,
  one,
  two,
};
