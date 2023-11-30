import { IOrganizationLayout } from '@/layouts/forms/organization/OrganizationLayout';

const base: IOrganizationLayout = {
  children: '{{children components}}',
};

export const mockLayoutProps = {
  base,
};
