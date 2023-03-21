import LiteNavbar from './LiteNavbar';
import { mockLiteNavbarProps } from './LiteNavbar.mocks';

export default { component: LiteNavbar };

export const Default = {
  args: { title: 'Title', ...mockLiteNavbarProps.base },
};

export const LoggedIn = {
  title: 'Logged in',
  args: {
    title: 'Title',
    ...mockLiteNavbarProps.base,
  },
  parameters: {
    auth0AddOn: {
      isAuthenticated: true,
    },
  },
};

export const Loading = {
  title: 'Loading',
  args: {
    title: 'Title',

    ...mockLiteNavbarProps.base,
  },
  parameters: {
    auth0AddOn: {
      isLoading: true,
    },
  },
};
