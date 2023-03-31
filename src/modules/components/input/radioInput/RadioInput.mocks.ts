import { IRadioInput } from './RadioInput';

const base: IRadioInput = {
  value: 'test',
  setValue: () => {},
  radioOptions: [
    {
      value: 'test',
      displayText: 'Test',
    },
  ],
};

export const mockRadioInputProps = {
  base,
};
