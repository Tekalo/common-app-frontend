import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  value: 'test',
  setValue: () => {},
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
