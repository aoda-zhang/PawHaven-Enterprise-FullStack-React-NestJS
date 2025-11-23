import React, { createContext, useContext } from 'react';

export function createConfig<T>() {
  const ConfigContext = createContext<T | null>(null);

  type ProviderProps = {
    value: T;
    children: React.ReactNode;
  };

  const ConfigProvider = ({ value, children }: ProviderProps) => (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );

  function useConfig() {
    const context = useContext(ConfigContext);
    if (context === null) {
      throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
  }

  return { ConfigProvider, useConfig };
}
