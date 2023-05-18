import BaseTemplate from './BaseTemplate';
import { mockBaseTemplateProps } from './BaseTemplate.mocks';

export default { component: BaseTemplate };

export const Default = {
  args: { ...mockBaseTemplateProps.base },
};
