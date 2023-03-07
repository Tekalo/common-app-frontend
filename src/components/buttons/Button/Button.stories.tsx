import Button from './Button';
import { mockButtonProps } from './Button.mocks';

// eslint-disable-next-line import/no-anonymous-default-export
export default { component: Button };
export const Primary = { args: { ...mockButtonProps.base } };
export const Disabled = {
  args: { ...mockButtonProps.base, disabled: true },
};
export const Outlined = { args: { ...mockButtonProps.base, outlined: true } };
