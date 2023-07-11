import { IRadioGroup } from './RadioGroup';

const base: IRadioGroup = {
  name: 'exampleName',
  errors: [],
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
