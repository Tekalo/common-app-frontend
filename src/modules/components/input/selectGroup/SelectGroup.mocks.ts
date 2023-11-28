import { ISelectGroup } from '@/components/input/selectGroup/SelectGroup';

const base: ISelectGroup = {
  errors: [],
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
