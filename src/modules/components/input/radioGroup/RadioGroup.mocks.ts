import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  value: 'test',
  setValue: () => null,
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
