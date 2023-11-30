import { IFreeText } from '@/components/input/freeText/FreeText';

const base: IFreeText = {
  errors: [],
  name: 'text-input',
  value: 'Text Input',
  setValue: () => void {},
  onBlur: () => void {},
};

export const mockFreeTextProps = {
  base,
};
