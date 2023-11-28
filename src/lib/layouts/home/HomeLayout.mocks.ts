import { IHomeLayout } from '@/layouts/home/HomeLayout';

const base: IHomeLayout = {
  pageName: 'home',
  children: '{{component}}',
};

export const mockHomeLayoutProps = {
  base,
};
