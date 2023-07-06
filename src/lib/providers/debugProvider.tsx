import React, { ReactNode, useEffect, useState } from 'react';

interface IDebugContext {
  debugIsActive: boolean;
  debugSecret: string;
}

interface IDebugProvider {
  children: ReactNode;
}

export const __DEBUG_ITEM_KEY__ = '__tklo_DEBUG__';

export const DebugContext = React.createContext<IDebugContext>(
  {} as IDebugContext
);

const DebugProvider: React.FC<IDebugProvider> = ({ children }) => {
  const itemName = '__tklo_DEBUG__';
  const [debugIsActive, setDebugIsActive] = useState<boolean>(false);
  const [debugSecret, setDebugSecret] = useState<string>('');

  useEffect(() => {
    const debugValue = localStorage.getItem(itemName);

    if (debugValue) {
      setDebugIsActive(true);
      setDebugSecret(debugValue);
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