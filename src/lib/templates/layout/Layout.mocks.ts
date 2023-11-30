import { ILayout } from '@/lib/templates/layout/Layout';

const base: ILayout = {
  children: '{{children components}}',
};

export const mockLayoutProps = {
  base,
};
