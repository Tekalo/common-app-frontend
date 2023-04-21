import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  value: 'test',
  onChange: () => null,
  listOptions: [
    {
      value: 'test',
      displayText: 'Test',
    },
  ],
};

export const mockRadioGroupProps = {
  base,
};
