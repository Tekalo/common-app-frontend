import { IFreeText } from './FreeText';

const base: IFreeText = {
  name: 'text-input',
  value: 'Text Input',
  setValue: () => null,
  onBlur: () => null,
};

export const mockFreeTextProps = {
  base,
};
