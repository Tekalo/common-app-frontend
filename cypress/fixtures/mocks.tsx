import { GTMContext } from '@/lib/providers/gtmProvider';
import { IProvider } from '@/lib/providers/shared';
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

export const gtag_mockClientId = 'client_id';
export const gtag_mockSessionId = 'session_id';

export const mockGtag = (
  action: 'get',
  target: string,
  valueName: string,
  callback: any
) => {
  if (valueName === 'client_id') {
    callback(gtag_mockClientId);
  } else {
    callback(gtag_mockSessionId);
  }
};

export const mockUtmParams = {
  ga_client_id: gtag_mockClientId,
  ga_session_id: gtag_mockSessionId,
  utm_campaign: '1',
  utm_content: '2',
  utm_id: '3',
  utm_medium: '4',
  utm_source_platform: '5',
  utm_source: '6',
  utm_term: '7',
};

export const MockGTMProvider: React.FC<IProvider> = ({ children }) => {
  const getGtmParams = () => mockUtmParams;

  return (
    <GTMContext.Provider value={{ getGtmParams, paramsSet: true }}>
      {children}
    </GTMContext.Provider>
  );
};
