import { ISelectGroup } from './SelectGroup';

const base: ISelectGroup = {
  name: 'test',
  value: ['test'],
  setValue: () => void {},
  listOptions: [
    {
      value: 'test',
      displayText: 'Test',
    },
    {
      value: 'test2',
      displayText: 'Test2',
    },
  ],
};

export const mockSelectGroupProps = {
  base,
};
