import { ILayout } from './ApplicationLayout';

const base: ILayout = {
  children: '{{children components}}',
};

export const mockLayoutProps = {
  base,
};
