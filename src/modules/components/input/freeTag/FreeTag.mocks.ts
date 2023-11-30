import { IFreeTag } from '@/components/input/freeTag/FreeTag';

const base: IFreeTag = {
  errors: [],
  name: 'text-input',
  value: ['Text Input'],
  setValue: () => void {},
  onBlur: () => void {},
};

export const mockFreeTagProps = {
  base,
};
