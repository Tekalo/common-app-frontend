import { IButton } from './Button';

const base: IButton = {
  label: 'Placeholder',
  outlined: false,
  disabled: false,
  onClick: () => {},
  className: 'px-8 py-3',
};

export const mockButtonProps = {
  base,
};
