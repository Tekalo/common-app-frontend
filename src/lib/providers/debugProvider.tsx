import React, { ReactNode, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

interface IDebugContext {
  debugIsActive: boolean;
  debugSecret: string;
}

interface IDebugProvider {
  children: ReactNode;
}

export const DebugContext = React.createContext<IDebugContext>(
  {} as IDebugContext
);

const DebugProvider: React.FC<IDebugProvider> = ({ children }) => {
  const cookieName = 'tekalo-db';
  const tmpCookieValue = 'someValue';
  const cookies = new Cookies();
  const [debugIsActive, setDebugIsActive] = useState<boolean>(false);
  const [debugSecret, setDebugSecret] = useState<string>('');

  // TODO: Obv remove this
  if (!cookies.get(cookieName)) {
    cookies.set(cookieName, tmpCookieValue, { sameSite: 'none' });
  }

  useEffect(() => {
    const cookieValue = cookies.get(cookieName);

    if (cookieValue === tmpCookieValue) {
      setDebugIsActive(true);
      setDebugSecret(cookieValue);
    }
  }, []);

  return (
    <DebugContext.Provider
      value={{
        debugIsActive,
        debugSecret,
      }}
    >
      {children}
    </DebugContext.Provider>
  );
};

export default DebugProvider;
