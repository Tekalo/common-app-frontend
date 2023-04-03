import { IListBox } from './ListBox';

const base: IListBox = {
  name: 'test',
  placeholder: 'test',
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

export const mockListBoxProps = {
  base,
};
