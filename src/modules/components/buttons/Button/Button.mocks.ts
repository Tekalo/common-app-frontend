import { IButton } from './Button';

const base: IButton = {
  label: 'Placeholder',
  disabled: false,
  onClick: () => void {},
  className: 'px-8 py-3',
};

export const mockButtonProps = {
  base,
};
