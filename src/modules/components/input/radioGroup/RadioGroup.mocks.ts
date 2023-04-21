import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  value: 'test',
  onChange: () => {},
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
