import { ITextInput } from './TextInput';

const base: ITextInput = {
  name: 'text-input',
  value: 'Text Input',
  setValue: () => {},
  onBlur: () => {},
};

export const mockTextInputProps = {
  base,
};
