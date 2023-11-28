import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import { mockLoadingSpinnerProps } from '@/components/loadingSpinner/LoadingSpinner.mocks';

export default { component: LoadingSpinner };

export const Default = {
  args: { ...mockLoadingSpinnerProps.base },
};
