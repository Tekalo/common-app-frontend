import OrganizationSection from '@/sections/home/orgSection/OrgSection';
import { mockOrganizationSectionProps } from '@/sections/home/orgSection/OrgSection.mocks';

export default { component: OrganizationSection };

export const Default = {
  args: { ...mockOrganizationSectionProps.base },
};
