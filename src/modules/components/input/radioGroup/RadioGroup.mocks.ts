import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  value: 'test',
  onChange: () => void {},
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
