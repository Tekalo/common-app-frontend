import { ILongText } from './LongText';

const base: ILongText = {
  errors: [],
  name: 'long-text-input',
  value:
    'Long Text Input. This is where you can type messages of longer length.',
  setValue: () => void {},
  onBlur: () => void {},
};

export const mockLongTextProps = {
  base,
};
