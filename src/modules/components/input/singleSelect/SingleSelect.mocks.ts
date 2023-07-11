import { ISingleSelect } from './SingleSelect';

const base: ISingleSelect = {
  errors: [],
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
  setValue: () => void {},
};

export const mockSingleSelectProps = {
  base,
};
