import { ISelectGroup } from './SelectGroup';

const base: ISelectGroup = {
  name: 'test',
  value: ['test'],
  setValue: () => {},
  selectOptions: [
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
