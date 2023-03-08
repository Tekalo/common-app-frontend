import { IButton } from './Button';

const base: IButton = {
  label: 'Placeholder',
  outlined: false,
  disabled: false,
  small: false,
  onClick: () => {},
};

export const mockButtonProps = {
  base,
};
