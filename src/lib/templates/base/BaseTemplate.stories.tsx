import BaseTemplate from '@/lib/templates/base/BaseTemplate';
import { mockBaseTemplateProps } from '@/lib/templates/base/BaseTemplate.mocks';

export default { component: BaseTemplate };

export const Default = {
  args: { ...mockBaseTemplateProps.base },
};
