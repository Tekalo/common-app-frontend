import { ISelectBoolean } from '@/components/input/selectBoolean/SelectBoolean';

const base: ISelectBoolean = {
  errors: [],
  name: 'test',
  placeholder: 'test',
  value: true,
  label: 'Listbox Input',
  listOptions: [
    {
      value: false,
      displayText: 'False',
    },
    {
      value: true,
      displayText: 'True',
    },
  ],
  setValue: () => void {},
};

export const mockSelectBooleanProps = {
  base,
};
