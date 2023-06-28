import React, { ReactNode } from 'react';

interface IDebugContext {
  debugIsActive: boolean;
}

interface IDebugProvider {
  children: ReactNode;
}

export const DebugContext = React.createContext<IDebugContext>(
  {} as IDebugContext
);

const DebugProvider: React.FC<IDebugProvider> = ({ children }) => {
  const debugIsActive = false;

  return (
    <DebugContext.Provider
      value={{
        debugIsActive,
      }}
    >
      {children}
    </DebugContext.Provider>
  );
};

export default DebugProvider;
