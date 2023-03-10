import { ChevronRightIcon } from '@heroicons/react/24/solid';
import Button from './Button';
import { mockButtonProps } from './Button.mocks';

export default { component: Button, parameters: { layout: 'centered' } };

export const Primary = {
  args: { ...mockButtonProps.base },
};

export const Disabled = {
  args: { ...mockButtonProps.base, disabled: true },
};

export const Outlined = { args: { ...mockButtonProps.base, outlined: true } };

export const WithIcon = {
  args: {
    ...mockButtonProps.base,
    outlined: true,
    icon: (
      <ChevronRightIcon className="h-4 w-4 stroke-2 text-blue-1-primary group-hover:fill-white-text" />
    ),
  },
};

export const Small = {
  args: { ...mockButtonProps.base, className: 'px-6 py-3' },
};
