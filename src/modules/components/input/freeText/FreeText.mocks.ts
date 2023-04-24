import { IFreeText } from './FreeText';

const base: IFreeText = {
  name: 'text-input',
  value: 'Text Input',
  setValue: () => void {},
  onBlur: () => void {},
};

export const mockFreeTextProps = {
  base,
};
