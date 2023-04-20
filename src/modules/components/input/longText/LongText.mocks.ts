import { ILongText } from './LongText';

const base: ILongText = {
  name: 'long-text-input',
  value:
    'Long Text Input. This is where you can type messages of longer length.',
  setValue: () => null,
  onBlur: () => null,
};

export const mockLongTextProps = {
  base,
};
