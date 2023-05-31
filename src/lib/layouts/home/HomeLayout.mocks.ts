import { IHomeLayout } from './HomeLayout';

const base: IHomeLayout = {
  pageName: 'home',
  children: '{{component}}',
};

export const mockHomeLayoutProps = {
  base,
};
