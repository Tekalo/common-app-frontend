import { IListboxInput } from './ListboxInput';

const base: IListboxInput = {
  name: 'test',
  value: 'test',
  labelText: 'Listbox Input',
  listOptions: [
    {
      value: '1',
      displayText: 'Hello',
    },
    {
      value: '2',
      displayText: 'World',
    },
  ],
  setValue: () => {},
};

export const mockListboxInputProps = {
  base,
};
