import Contact from './Contact';
import { mockContactProps } from './Contact.mocks';

export default { component: Contact };

export const Default = {
  args: { ...mockContactProps.base },
};
