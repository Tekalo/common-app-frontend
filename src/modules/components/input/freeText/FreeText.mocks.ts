import { IFreeText } from './FreeText';

const base: IFreeText = {
  name: 'text-input',
  value: 'Text Input',
  setValue: () => {},
  onBlur: () => {},
};

export const mockFreeTextProps = {
  base,
};
