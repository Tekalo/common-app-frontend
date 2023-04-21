import { ISingleSelect } from './SingleSelect';

const base: ISingleSelect = {
  name: 'test',
  placeholder: 'test',
  value: 'test',
  label: 'Listbox Input',
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

export const mockSingleSelectProps = {
  base,
};
