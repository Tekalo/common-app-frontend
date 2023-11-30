import { IApplicationLayout } from '@/layouts/forms/application/ApplicationLayout';

const base: IApplicationLayout = {
  children: '{{children components}}',
};

export const mockLayoutProps = {
  base,
};
