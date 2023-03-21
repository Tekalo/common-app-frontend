import MainNavbar from './MainNavbar';
import { mockMainNavbarProps } from './MainNavbar.mocks';

export default {
  component: MainNavbar,
};

export const Default = {
  args: { ...mockMainNavbarProps.base },
};

export const LoggedIn = {
  title: 'Logged in',
  args: {
    ...mockMainNavbarProps.base,
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
    ...mockMainNavbarProps.base,
  },
  parameters: {
    auth0AddOn: {
      isLoading: true,
    },
  },
};
