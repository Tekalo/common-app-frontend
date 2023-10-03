import { Auth0ContextInterface, User } from '@auth0/auth0-react';

// Const
export const mockAuthToken = 'MOCK_AUTH_TOKEN';

// Fns
export const voidFn = () => void {};
export const getMockAuth0Context = (): Auth0ContextInterface<User> =>
  ({
    getAccessTokenSilently: cy
      .stub()
      .callsFake(() => Promise.resolve(mockAuthToken)),
    getAccessTokenWithPopup: voidFn,
    getIdTokenClaims: voidFn,
    handleRedirectCallback: voidFn,
    isAuthenticated: false,
    isLoading: false,
    loginWithPopup: voidFn,
    loginWithRedirect: voidFn,
    logout: cy.stub().callsFake(voidFn),
    user: undefined,
  } as unknown as Auth0ContextInterface<User>);
