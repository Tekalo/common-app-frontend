import { IBreadcrumb } from '@/components/navigation/Breadcrumb/Breadcrumb';

const base: IBreadcrumb = {
  label: 'Wee',
  items: ['Home', 'About', 'Contact'],
  activeIndex: 1,
  setActive: () => void {},
};

export const mockBreadcrumbProps = {
  base,
};
