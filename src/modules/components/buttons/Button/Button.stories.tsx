import Button, { ButtonVariant } from '@/components/buttons/Button//Button';
import { mockButtonProps } from '@/components/buttons/Button/Button.mocks';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default { component: Button, parameters: { layout: 'centered' } };

export const Primary = {
  args: { ...mockButtonProps.base },
};

export const Disabled = {
  args: { ...mockButtonProps.base, disabled: true },
};

export const Outlined = {
  args: { ...mockButtonProps.base, variant: ButtonVariant.OUTLINED },
};

export const WithIcon = {
  args: {
    ...mockButtonProps.base,
    variant: ButtonVariant.OUTLINED,
    icon: (
      <ChevronRightIcon className="h-4 w-4 stroke-2 text-blue-1 group-hover:fill-white" />
    ),
  },
};

export const Red = {
  args: {
    ...mockButtonProps.base,
    variant: ButtonVariant.RED,
  },
};

export const Small = {
  args: { ...mockButtonProps.base, className: 'px-6 py-3' },
};
