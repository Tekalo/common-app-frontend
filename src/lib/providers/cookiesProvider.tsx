import { IProvider } from '@/lib/providers/shared';
import React from 'react';
import Cookies from 'universal-cookie';

interface ICookiesContext {
  get: (cookieName: string) => any;
  remove: (cookieName: string) => void;
  set: (cookieName: string, value: any) => void;
}

export const CookiesContext = React.createContext<ICookiesContext>(
  {} as ICookiesContext
);

const CookiesProvider: React.FC<IProvider> = ({ children }) => {
  const cookieSvc = new Cookies(null, { path: '/' });

  const get = (cookieName: string): any => {
    return cookieSvc.get(cookieName);
  };

  const remove = (cookieName: string): void => {
    cookieSvc.remove(cookieName);
  };

  const set = (cookieName: string, value: any): void => {
    cookieSvc.set(cookieName, value);
  };

  return (
    <CookiesContext.Provider value={{ get, remove, set }}>
      {children}
    </CookiesContext.Provider>
  );
};

export default CookiesProvider;
