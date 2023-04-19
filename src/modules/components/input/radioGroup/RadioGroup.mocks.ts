import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  value: 'test',
  onChange: () => {},
  radioOptions: [
    {
      value: 'test',
      displayText: 'Test',
    },
  ],
};

export const mockRadioGroupProps = {
  base,
};
