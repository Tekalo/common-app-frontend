import { IMultiSelect } from '@/components/input/multiSelect/MultiSelect';

const base: IMultiSelect = {
  errors: [],
  name: 'test',
  label: 'test label',
  placeholder: 'Hello!',
  setValue: () => void {},
  onBlur: () => void {},
  listOptions: [
    { displayText: 'Option 1', value: 'option1' },
    { displayText: 'Option 2', value: 'option2' },
    { displayText: 'Option 3', value: 'option3' },
    { displayText: 'Option 4', value: 'option4' },
    { displayText: 'Option 5', value: 'option5' },
    { displayText: 'Option 6', value: 'option6' },
    { displayText: 'Option 7', value: 'option7' },
  ],
  value: ['option1', 'option2'],
};

export const mockMultiSelectProps = {
  base,
};
